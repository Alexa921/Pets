document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".add-cart");
  const contador = document.getElementById("contador");
  const listaCarrito = document.getElementById("lista-carrito");
  const subtotalEl = document.getElementById("subtotal");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function formatearPesos(valor) {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0
    }).format(valor);
  }

  // Actualizar contador
  function actualizarContador() {
    if (contador) contador.textContent = carrito.length;
  }

  // Renderizar carrito en carrito.html
  function renderCarrito() {
    if (!listaCarrito || !subtotalEl) return;

    listaCarrito.innerHTML = "";
    let subtotal = 0;

    carrito.forEach((producto, index) => {
      subtotal += producto.precio * producto.cantidad;

      const item = document.createElement("div");
      item.classList.add("producto-carrito");
      item.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="producto-info">
            <h4>${producto.nombre}</h4>
            <p>COLOR: ${producto.color}</p>
        </div>
        <div class="producto-precio">${formatearPesos(producto.precio)}</div>
        <div class="cantidad-box">
            <button data-action="restar">-</button>
            <input type="text" value="${producto.cantidad}" readonly>
            <button data-action="sumar">+</button>
        </div>
        <button class="eliminar" data-index="${index}">🗑</button>
      `;

      listaCarrito.appendChild(item);

      // Botones + y -
      item.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (btn.dataset.action === "sumar") {
            producto.cantidad++;
          } else if (btn.dataset.action === "restar" && producto.cantidad > 1) {
            producto.cantidad--;
          }
          localStorage.setItem("carrito", JSON.stringify(carrito));
          renderCarrito();
        });
      });
    });

    // 👇 Aquí usamos formatearPesos para el subtotal
    subtotalEl.textContent = formatearPesos(subtotal);

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

  // Agregar al carrito
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const producto = {
        nombre: boton.dataset.nombre,
        precio: parseFloat(boton.dataset.precio),
        imagen: boton.dataset.imagen,
        color: boton.dataset.color, 
        cantidad: 1,
      };

      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarContador();
    });
  });
});
