document.addEventListener("DOMContentLoaded", () => {
	const cart = JSON.parse(localStorage.getItem("carrito")) || [];

	// Función para agregar un producto al carrito
	function addToCart(product) {
		const existingProduct = cart.find((item) => item.id === product.id);
		if (existingProduct) {
			existingProduct.quantity += 1;
		} else {
			cart.push({ ...product, quantity: 1 });
		}
		localStorage.setItem("carrito", JSON.stringify(cart));
		updateCartCount();
		alert(`${product.name} agregado al carrito`);
	}

	// Función para mostrar los productos en el carrito
	function displayCart() {
		const cartItemsContainer = document.getElementById("cart-items");
		const cartTotalContainer = document.getElementById("cart-total");
		cartItemsContainer.innerHTML = "";
		let total = 0;

		cart.forEach((item) => {
			const itemTotal = item.price * item.quantity;
			total += itemTotal;
			cartItemsContainer.innerHTML += `
              <li class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                      <h5>${item.name}</h5>
                      <p>Precio: $${item.price}</p>
                      <p>Cantidad: ${item.quantity}</p>
                  </div>
                  <span>Total: $${itemTotal}</span>
              </li>
          `;
		});

		cartTotalContainer.textContent = `${total} COP`;
	}

	// Función para actualizar el contador del carrito
	function updateCartCount() {
		const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
		document.getElementById("cart-count").textContent = cartCount;
	}

	// Evento para agregar productos al carrito en la página de la tienda
	if (document.querySelector(".products")) {
		document.querySelectorAll(".add-to-cart").forEach((button) => {
			button.addEventListener("click", (event) => {
				const productElement = event.target.closest(".product");
				const product = {
					id: productElement.getAttribute("data-id"),
					name: productElement.getAttribute("data-name"),
					price: parseFloat(productElement.getAttribute("data-price")),
				};
				addToCart(product);
			});
		});
		updateCartCount();
	}

	// Mostrar el carrito en la página del carrito
	if (document.getElementById("cart-items")) {
		displayCart();
	}

	// Evento para finalizar la compra
	if (document.getElementById("checkout")) {
		document.getElementById("checkout").addEventListener("click", () => {
			alert("Compra finalizada");
			localStorage.removeItem("carrito");
			window.location.href = "index.html";
		});
	}
});
