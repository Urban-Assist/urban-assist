import React, { useState, useRef, useEffect } from "react";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();

const servers = {
  iceServers: [{ urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"] }],
  iceCandidatePoolSize: 10,
};

const VideoCallApp = () => {
  const [callId, setCallId] = useState("");
  const [status, setStatus] = useState("");
  const webcamVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pc = useRef(new RTCPeerConnection(servers));
  const localStream = useRef(null);
  const remoteStream = useRef(new MediaStream());

  useEffect(() => {
    // Check camera permissions on load
    const checkPermissions = async () => {
      const permissionStatus = await navigator.permissions.query({ name: "camera" });
      if (permissionStatus.state === "granted") {
        startWebcam();
      } else {
        setStatus("Camera permission required.");
      }
    };

    checkPermissions();

    pc.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.current.addTrack(track);
      });
    };
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream.current;
    }
  }, []);

  const startWebcam = async () => {
    try {
      localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStream.current.getTracks().forEach((track) => pc.current.addTrack(track, localStream.current));
      webcamVideoRef.current.srcObject = localStream.current;
      setStatus("Webcam started successfully");
    } catch (error) {
      setStatus("Error accessing webcam. Please check permissions.");
      console.error("Error accessing webcam: ", error);
    }
  };

  const startCall = async () => {
    const callDoc = firestore.collection("calls").doc();
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");
    setCallId(callDoc.id);

    pc.current.onicecandidate = (event) => {
      if (event.candidate) {
        offerCandidates.add(event.candidate.toJSON());
      }
    };

    const offerDescription = await pc.current.createOffer();
    await pc.current.setLocalDescription(offerDescription);

    await callDoc.set({ offer: { type: offerDescription.type, sdp: offerDescription.sdp } });
    setStatus("Call started. Share Call ID.");

    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (data?.answer) {
        pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    });

    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current.addIceCandidate(candidate);
        }
      });
    });
  };

  const answerCall = async () => {
    if (!callId) {
      setStatus("Please enter a Call ID");
      return;
    }

    const callDoc = firestore.collection("calls").doc(callId);
    const answerCandidates = callDoc.collection("answerCandidates");
    const offerCandidates = callDoc.collection("offerCandidates");

    pc.current.onicecandidate = (event) => {
      if (event.candidate) {
        answerCandidates.add(event.candidate.toJSON());
      }
    };

    const callData = (await callDoc.get()).data();
    if (!callData) {
      setStatus("Call not found");
      return;
    }

    await pc.current.setRemoteDescription(new RTCSessionDescription(callData.offer));
    const answerDescription = await pc.current.createAnswer();
    await pc.current.setLocalDescription(answerDescription);

    await callDoc.update({ answer: { type: answerDescription.type, sdp: answerDescription.sdp } });
    setStatus("Connected to call");

    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current.addIceCandidate(candidate);
        }
      });
    });
  };

  const hangUp = () => {
    pc.current.close();
    pc.current = new RTCPeerConnection(servers); // Reset the connection

    localStream.current?.getTracks().forEach((track) => track.stop());
    localStream.current = null;
    remoteStream.current = new MediaStream();

    if (webcamVideoRef.current) webcamVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    setStatus("Call ended. Restart webcam to begin again.");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", backgroundColor: "#f0f2f5" }}>
      <h1>Video Call App</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div>
          <h3>Your Video</h3>
          <video ref={webcamVideoRef} autoPlay playsInline style={{ width: "100%", borderRadius: "8px" }}></video>
        </div>
        <div>
          <h3>Remote Video</h3>
          <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "100%", borderRadius: "8px" }}></video>
        </div>
      </div>
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button onClick={startWebcam}>Start Webcam</button>
        <button onClick={startCall}>Start Call</button>
        <button onClick={answerCall}>Answer Call</button>
        <button onClick={hangUp}>Hang Up</button>
      </div>
      <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "white", borderRadius: "8px" }}>
        <h3>Call ID</h3>
        <input value={callId} onChange={(e) => setCallId(e.target.value)} placeholder="Enter Call ID" />
        <p>{status}</p>
      </div>
    </div>
  );
};

export default VideoCallApp;
