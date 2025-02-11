import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
export const UserProfile = () => {

	const [file, setFile] = useState(null);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [userType, setUserType] = useState("");
	const [societyRole, setSocietyRole] = useState("");
	const [graduationMonth, setGraduationMonth] = useState("");
	const [graduationYear, setGraduationYear] = useState("");
	const [bio, setBio] = useState("");
	const [campus, setCampus] = useState("");
	const [location, setLocation] = useState("");
	const [phone, setPhone] = useState("");
	const [preview, setPreview] = useState("");


	return (
		<div className="flex flex-col">
				<section className="px-8 py-10 container mx-auto">
					<div className="flex justify-between">
						<div className="">
							<h5 className="text-15xl">
								Update Profile
							</h5>
							<p className="block antialiased font-sans text-md leading-normal text-inherit text-gray-600 font-normal mt-1">
								Update your profile information below.
							</p>
						</div>
						<div>
							<button
								//onClick={handleSubmit}
								className="mt-4 bg-indigo-600 text-white py-2 px-5 rounded"
							>
								Save
							</button>
						</div>
					</div>
					<div className="flex flex-col mt-6">
						<div className="my-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
							<div className="col-span-full">
								<p className="block antialiased font-sans text-md leading-normal text-slate-700 mb-4 font-medium">
									Photo
								</p>
								<div className="mt-2 flex items-center">
									<img
										alt="Circle Image"
										className="rounded-full"
										src={preview}
										style={{ width: "100px", height: "100px" }}
									/>
									<div className="flex flex-col">
										<input
											accept="image/*"
											className="sr-only"
											id="photo"
											name="photo"
											type="file"
											multiple={false}
											// onChange={(e) => {
											// 	if (e.target.files && e.target.files.length > 0) {
											// 		handleFileChange(e.target.files[0]);
											// 	}
						//					}
						//				}
										/>
										<label
											className="rounded-md bg-white mx-5 px-3 py-1.5 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 cursor-pointer hover:bg-gray-50"
											htmlFor="photo"
										>
											Change
										</label>
									</div>
								</div>
							</div>
						</div>

						<div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
							<div className="w-full">
								<p className="block antialiased font-sans text-md leading-normal text-slate-700 mb-2 font-medium">
									First Name
								</p>

								<div className="relative w-full min-w-[200px] h-11">
									<input
										className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  border focus:border-2 placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-600 w-full placeholder:opacity-100"
										name="name"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										placeholder="First Name"
									/>
								</div>
							</div>
							<div className="w-full">
								<p className="block antialiased font-sans text-md leading-normal text-slate-700 mb-2 font-medium">
									Last Name
								</p>
								<div className="relative w-full min-w-[200px] h-11">
									<input
										className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  border focus:border-2 placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-600 w-full placeholder:opacity-100"
										name="lastname"
										placeholder="Last Name"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="mb-6 flex flex-col gap-4 md:flex-row">
							 
							<div className="w-full">
								<p className="block antialiased font-sans text-md leading-normal text-slate-700 mb-2 font-medium">
									Role
								</p>
								<div className="relative h-10 min-w-full w-full">
									<select
										value={societyRole}
										onChange={(e) => setSocietyRole(e.target.value)}
										className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 transition-all border text-sm px-2 py-2 rounded-[7px] border-blue-gray-200  "
									>
										<option value="Blog Editor">Blog Editor</option>
										<option
											value="Club Member"
											// selected={
											// 	!user.society_role ||
											// 	user.society_role === "Club Member"
											// }
										>
											Club Member
										</option>
										<option value="Content Creator">Content Creator</option>
										<option value="Event Coordinator">Event Coordinator</option>
										<option value="Membership Coordinator">
											Membership Coordinator
										</option>
										<option value="President">President</option>
										<option value="Secretary">Secretary</option>
										<option value="Social Media Manager">
											Social Media Manager
										</option>
										<option value="Treasurer">Treasurer</option>
										<option value="Vice President">Vice President</option>
										<option value="Volunteer Coordinator">
											Volunteer Coordinator
										</option>
									</select>
								</div>
							</div>
							 

							 
						</div>

						<div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
							<div className="w-full">
								<p className="block antialiased font-sans text-md leading-normal text-slate-700 mb-2 font-medium">
									Bio
								</p>

								<textarea
									value={bio}
									onChange={(e) => setBio(e.target.value)}
									className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  border focus:border-2 placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-600 w-full placeholder:opacity-100"
									id="Bio"
									name="Bio"
									placeholder="Write about yourself"
									rows={4}
								></textarea>
							</div>
						</div>
						<div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
							<div className="w-full">
								<p className="block antialiased font-sans text-md leading-normal text-slate-700 mb-2 font-medium">
									Email
								</p>
								<div className="relative w-full min-w-[200px] h-11">
									<input
										// value={user.email}
										className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:cursor-not-allowed disabled:bg-slate-100 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  border focus:border-2 placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-600 w-full placeholder:opacity-100"
										id="email"
										name="email"
										placeholder="Email"
										disabled={true}
									/>
								</div>
							</div>
							 
						</div>
						<div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
						 
							<div className="w-full">
								<p className="block antialiased font-sans text-md leading-normal text-slate-700 mb-2 font-medium">
									Phone Number
								</p>
								<div className="relative w-full min-w-[200px] h-11">
									<input
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  border focus:border-2 placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-600 w-full placeholder:opacity-100"
										id="phone"
										name="phone"
										placeholder="+123 0123 456 789"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
		</div>
	);
};
