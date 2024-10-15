"use strict";
const APIurl = "https://webapp-eastus-programacionweb-2024-2-gafjg4acc2csdggn.eastus-01.azurewebsites.net";
const signInForm = document.getElementById("signin-form");
const signUpForm = document.getElementById("signup-form");

function main() {
	if (signInForm != null) {
		signInForm.addEventListener("submit", login);
	}
	if (signUpForm != null) {
	}
}

function showErrorDialog(error) {
	let errorMessageElement = document.getElementById("errorMessage");
	let errorModal = new bootstrap.Modal(document.getElementById("errorModal"), {
		keyboard: false,
	});

	errorMessageElement.textContent = error;
	errorModal.show();
}

async function login(event) {
	event.preventDefault();
	let email = signInForm.querySelector("#input-email").value;
	let password = signInForm.querySelector("#input-password").value;
	let params = new URLSearchParams();

	params.append("username", email);
	params.append("password", password);
	sendAuthenticationRequest(params);
}

async function sendAuthenticationRequest(params) {
	try {
		const response = await fetch(`${APIurl}/auth/sign-in`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: params,
		});
		const result = await response.json();

		if (response.ok) {
			sessionStorage.setItem("access_token", result.access_token);
			location.href = "./perfil.html";
		} else {
			let xError = response.headers.get("x-error");

			if (xError == "UserNotFound") {
				showErrorDialog(
					"El nombre de usuario o la contraseña son incorrectos. Por favor, verifica tus credenciales e intenta nuevamente."
				);
			}
		}
	} catch (error) {
		showErrorDialog("No se pudo conectar con el servidor, por favor intente de nuevo más tarde.");
		console.log(error);
	}
}

main();
