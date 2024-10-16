"use strict";
import { APIurl } from "../utils/urls.js";
const signInForm = document.getElementById("signin-form");
const signUpForm = document.getElementById("signup-form");

function main() {
	if (signInForm != null) {
		signInForm.addEventListener("submit", signIn);
	}
	if (signUpForm != null) {
		signUpForm.addEventListener("submit", signUp);
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

async function signIn(event) {
	event.preventDefault();
	let email = signInForm.querySelector("#input-email").value;
	let password = signInForm.querySelector("#input-password").value;
	let params = new URLSearchParams();

	params.append("username", email);
	params.append("password", password);
	sendAuthenticationRequest(params);
}

async function signUp(event) {
	event.preventDefault();
	const user = {
		fname: signUpForm.querySelector("#input-fname").value,
		lname: signUpForm.querySelector("#input-lname").value,
		email: signUpForm.querySelector("#input-email").value,
		cc: signUpForm.querySelector("#input-cc").value,
		password: "",
	};
	let password1 = signUpForm.querySelector("#input-password").value;
	let password2 = signUpForm.querySelector("#input-password-confirm").value;

	if (password1 != password2) {
    showErrorDialog("Las contraseñas que ingresaste no coinciden. Asegúrate de que ambas contraseñas sean idénticas y vuelve a intentarlo.");
		return;
	}

	try {
		user.password = password1;
		const response = await fetch(`${APIurl}/auth/sign-up`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		if (response.ok) {
			let params = new URLSearchParams();

			params.append("username", user.email);
			params.append("password", user.password);
			sendAuthenticationRequest(params);
		} else {
			let xError = response.headers.get("x-error");

			if (xError == "UserEmailAlreadyExists") {
				showErrorDialog("El correo electrónico que ingresaste ya está registrado. Si ya tienes una cuenta, intenta iniciar sesión o utiliza la opción de recuperación de contraseña.");
				return;
			}
			if (xError == "UserCCAlreadyExists") {
				showErrorDialog("El número de cédula que ingresaste ya está asociado a una cuenta existente. Verifica los datos ingresados o intenta recuperar tu cuenta si olvidaste la información.");
				return;
			}
			showErrorDialog(response.text);
		}
	} catch (error) {
		showErrorDialog("No se pudo conectar con el servidor, por favor intente de nuevo más tarde.");
		console.log(error);
	}
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
