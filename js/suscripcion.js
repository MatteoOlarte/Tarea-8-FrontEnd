"use strict";
import { APIurl } from "../utils/urls.js";

function main() {
	console.log("sexo");
	const token = sessionStorage.getItem("access_token");

	if (!token) {
		location.href = "./login.html";
		return;
	}

	// Evento para suscribirse
	document.getElementById("btnSuscribirse").addEventListener("click", () => {
		suscribirse(token);
	});

	// Evento para gestionar la suscripción (terminar la suscripción)
	document.getElementById("btnGestionarSuscripcion").addEventListener("click", () => {
		gestionarSuscripcion(token);
	});
}

async function suscribirse(token) {
	let params = new URLSearchParams();
	params.append("subscription", true);

	try {
		let response = await fetch(`${APIurl}/auth?${params}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			let data = await response.json();

			// Mostrar el recibo generado
			document.querySelector("#recibo-texto").classList.remove("d-none");
			document.querySelector(
				"#recibo-texto"
			).innerText = `Gracias por suscribirte al plan mensual. Tu recibo ha sido generado con el número de factura: ${data.email}`;
		} else {
			if (response.status == 401) {
				location.href = "./login.html";
				return;
			}
		}
	} catch (error) {
		location.href = "./login.html";
		return;
	}
}

async function gestionarSuscripcion(token) {
	let params = new URLSearchParams();
	params.append("subscription", false);

	try {
		let response = await fetch(`${APIurl}/auth?${params}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			let data = await response.json();
			//hacer algo cuando se ponga inactiva
		} else {
			if (response.status == 401) {
				location.href = "./login.html";
				return;
			}
		}
	} catch (error) {
		location.href = "./login.html";
		return;
	}
}

main();
