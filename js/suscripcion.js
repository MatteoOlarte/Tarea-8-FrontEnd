// Función para simular la suscripción
function suscribirse() {
	alert("Te has suscrito al plan mensual de eShop.");
	document.getElementById("recibo-texto").classList.remove("d-none");
	actualizarPerfil();
}

// Función para gestionar la suscripción
function gestionarSuscripcion() {
	alert("Redirigiendo a la página de gestión de suscripción.");
}

// Función para ver el historial de pagos
function verHistorialPagos() {
	alert("Redirigiendo al historial de pagos.");
}

// Función para actualizar el perfil del usuario
function actualizarPerfil() {
	// Aquí se actualizaría el estado del perfil del usuario para reflejar la suscripción activa.
	console.log("Perfil actualizado: Suscripción activa.");
}

// Eventos para los botones de la página
document.getElementById("btnSuscribirse").addEventListener("click", suscribirse);
document.getElementById("btnGestionarSuscripcion").addEventListener("click", gestionarSuscripcion);
document.getElementById("btnVerHistorialPagos").addEventListener("click", verHistorialPagos);
