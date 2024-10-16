document.addEventListener("DOMContentLoaded", () => {
	const cart = JSON.parse(localStorage.getItem("carrito")) || [];
  
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
  
	function formatPrice(price) {
		return price.toLocaleString('en-US', { minimumFractionDigits: 0 });
	}
  
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
						<p>Precio: $${formatPrice(item.price)}</p>
						<p>Cantidad: ${item.quantity}</p>
					</div>
					<span>Total: $${formatPrice(itemTotal)}</span>
				</li>
			`;
		});
  
		cartTotalContainer.textContent = `${formatPrice(total)} COP`;
	}
  
	function updateCartCount() {
		const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
		document.getElementById("cart-count").textContent = cartCount;
	}
  
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
  
	if (document.getElementById("cart-items")) {
		displayCart();
	}
  
	if (document.getElementById("checkout")) {
		document.getElementById("checkout").addEventListener("click", () => {
			alert("Compra finalizada");
			localStorage.removeItem("carrito");
			window.location.href = "index.html";
		});
	}

	if (document.getElementById("empty-cart")) {
		document.getElementById("empty-cart").addEventListener("click", () => {
			if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
				localStorage.removeItem("carrito");
				window.location.reload();
			}
		});
	}
  
	const generoMap = {
		'Black Myth: Wukong': 'accion',
		'Celeste': 'aventura',
		'Cuphead': 'accion',
		'Detroit: Become Human': 'aventura',
		'ELDEN RING': 'accion',
		'FINAL FANTASY XVI': 'accion',
		'Grand Theft Auto V': 'accion',
		'Hogwarts Legacy': 'aventura',
		'Horizon Forbidden West': 'accion',
		'Mario Kart 8 Deluxe': 'deportes',
		'Minecraft': 'simulacion',
		'Red Dead Redemption 2': 'aventura',
		'Resident Evil 4': 'accion',
		'Silent Hill 2': 'aventura',
		'Need for Speed Unbound': 'deportes'
	};
  
	const productos = document.querySelectorAll('.product');
	const generoSelect = document.getElementById('filtro-genero');
	const precioSelect = document.getElementById('filtro-precio');
	const popularidadSelect = document.getElementById('filtro-popularidad');
	const applyFiltersButton = document.querySelector('.btn.btn-success');
  
	const popularidadMap = {
		'nuevos-lanzamientos': ['Horizon Forbidden West', 'SILENT HILL 2', 'Black Myth: Wukong', 'FINAL FANTASY XVI'],
		'mas-vendidos': ['Grand Theft Auto V', 'Mario Kart 8 Deluxe', 'Minecraft', 'Red Dead Redemption 2'],
		'promocion': ['Detroit: Become Human', 'The Last of Us Part I', 'Hogwarts Legacy', 'Resident Evil 4']
	};
  
	function filtrarPorGenero(productosFiltrados) {
		const genero = generoSelect.value;
		return productosFiltrados.filter(producto => {
			const nombreJuego = producto.getAttribute('data-name');
			const generoJuego = generoMap[nombreJuego] || '';
			return genero === 'Elige un género...' || generoJuego === genero;
		});
	}
  
	function filtrarPorPrecio(productosFiltrados) {
		const precio = precioSelect.value;
		return productosFiltrados.filter(producto => {
			const precioJuego = parseInt(producto.getAttribute('data-price'));
			if (precio === 'menos-50000' && precioJuego < 50000) return true;
			if (precio === '50k-100k' && precioJuego >= 50000 && precioJuego <= 100000) return true;
			if (precio === '100k-150k' && precioJuego >= 100000 && precioJuego <= 150000) return true;
			if (precio === 'mas-150k' && precioJuego > 150000) return true;
			if (precio === 'Elige un rango de precios...') return true;
			return false;
		});
	}
  
	function filtrarPorPopularidad(productosFiltrados) {
		const popularidad = popularidadSelect.value;
		return productosFiltrados.filter(producto => {
			const nombreJuego = producto.getAttribute('data-name');
			return popularidad === 'Elige una opción...' || popularidadMap[popularidad]?.includes(nombreJuego);
		});
	}
  
	function ordenarProductos(productosFiltrados) {
		return productosFiltrados.sort((a, b) => {
			const precioA = parseFloat(a.getAttribute('data-price'));
			const precioB = parseFloat(b.getAttribute('data-price'));
			return precioA - precioB;
		});
	}
  
	function mostrarProductos(productosFiltrados) {
		productos.forEach(producto => producto.style.display = 'none');
		productosFiltrados.forEach(producto => producto.style.display = 'block');
	}
  
	applyFiltersButton.addEventListener('click', (event) => {
		event.preventDefault();
  
		let productosFiltrados = Array.from(productos);
  
		productosFiltrados = filtrarPorGenero(productosFiltrados);
		productosFiltrados = filtrarPorPrecio(productosFiltrados);
		productosFiltrados = filtrarPorPopularidad(productosFiltrados);
		productosFiltrados = ordenarProductos(productosFiltrados);
  
		mostrarProductos(productosFiltrados);
	});
  
	updateCartCount();
});
