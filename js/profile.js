"use strict";
import { APIurl } from "../utils/urls.js";
let fullNameLabel = document.getElementById("fullName");
let emailLabel = document.getElementById("email");
let usernameLabel = document.getElementById("username");
let usernameLabel2 = document.getElementById("username_main"); 
let phoneNumberLabel = document.getElementById("phonenumber");
let userProfilePhoto = document.getElementById("profile-picture");
let userCCMain = document.getElementById("cc_main");


function main() {
	const token = sessionStorage.getItem("access_token");

	if (!token) {
		location.href = "./login.html";
		return;
	}
	fetchUserProfile(token);
  document.getElementById("btn-logout").addEventListener("click", {
		handleEvent: () => {
			sessionStorage.removeItem("access_token");
			location.href = "./login.html";
		},
	});
}

async function fetchUserProfile(token) {
	try {
		let response;
		response = await fetch(`${APIurl}/auth`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.ok) {
			let userData = await response.json();
			let photoURL = userData.photo_url ?? "https://via.placeholder.com/150";

			document.querySelector("#profile-name-info").classList.remove("d-none")
			document.querySelector("#profile-name-spiner").classList.add("d-none")
			fullNameLabel.textContent = `${userData.fname} ${userData.lname}`;
      emailLabel.textContent = userData.email;
      usernameLabel.textContent = `@${userData.fname}${userData.lname}`;
      phoneNumberLabel.textContent = userData.phone_number ?? "...";
      usernameLabel2.textContent = `@${userData.fname}${userData.lname}`;
      userCCMain.textContent = userData.cc;
      userProfilePhoto.setAttribute("src", photoURL);

			if (userData.has_subscription) {
				document.querySelector("#subscription-badage").classList.add("text-bg-success")
				document.querySelector("#subscription-badage").textContent = "Estado de suscripcion: Activa"
			} else {
				document.querySelector("#subscription-badage").classList.add("text-bg-danger")
				document.querySelector("#subscription-badage").textContent = "Estado de suscripcion: Inactiva"
			}
		} else {
			if (response.status == 401) {
				location.href = "./login.html";
			}
		}
	} catch (error) {
    //location.href = "./login.html";
		console.log(error);
	}
}

main();
