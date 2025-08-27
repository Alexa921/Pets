document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".add-cart");
  const contador = document.getElementById("contador");
  const listaCarrito = document.getElementById("lista-carrito");
  const subtotalEl = document.getElementById("subtotal");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Actualizar contador
  function actualizarContador() {
    if (contador) contador.textContent = carrito.length;
  }

  // Mostrar productos en carrito.html
  function renderCarrito() {
    if (!listaCarrito || !subtotalEl) return; // si no estamos en carrito.html, salimos

    listaCarrito.innerHTML = "";
    let subtotal = 0;

    carrito.forEach((producto, index) => {
      subtotal += producto.precio * producto.cantidad;

      const item = document.createElement("div");
      item.classList.add("item-carrito");
      item.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="producto-info">
            <h4>${producto.nombre}</h4>
            <p>COLOR: Sand</p>
        </div>
        <p class="producto-precio">$${producto.precio}</p>
        <div class="cantidad-box">
            <button>-</button>
            <input type="text" value="${producto.cantidad}">
            <button>+</button>
        </div>
        <button class="eliminar" data-index="${index}">🗑</button>
        `;

      listaCarrito.appendChild(item);
    });

    subtotalEl.textContent = subtotal.toFixed(2);

    // Botones eliminar
    document.querySelectorAll(".eliminar").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarContador();
        renderCarrito();
      });
    });
  }

  // Inicializar
  actualizarContador();
  renderCarrito();

  // Agregar al carrito (en páginas de productos)
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const producto = {
        nombre: boton.dataset.nombre,
        precio: parseFloat(boton.dataset.precio),
        imagen: boton.dataset.imagen,
        cantidad: 1,
      };

      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarContador();

      alert(`${producto.nombre} fue agregado al carrito 🐾`);
    });
  });
});
