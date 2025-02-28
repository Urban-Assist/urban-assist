import axios from 'axios';
import express from 'express';
import cors from 'cors';

let publicKey = null;
  // Fetch the public key once on startup
  async function fetchPublicKey() {
    try {
        const response = await axios.get('http://localhost:8080/auth/public-key');
        // Format the public key with proper PEM format
        const rawKey = response.data;
        publicKey = `-----BEGIN PUBLIC KEY-----\n${
            rawKey
                .replace('-----BEGIN PUBLIC KEY-----', '')
                .replace('-----END PUBLIC KEY-----', '')
                .replace(/\s/g, '')
                .match(/.{1,64}/g)
                .join('\n')
        }\n-----END PUBLIC KEY-----`;
        
        console.log('Formatted Public Key:');
        console.log(publicKey);
        console.log('Public key fetched and formatted successfully');
    } catch (error) {
        console.error('Error fetching public key:', error);
        throw error; // Propagate the error
    }
}

export { publicKey, fetchPublicKey };