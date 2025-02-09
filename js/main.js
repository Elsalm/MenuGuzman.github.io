async function cargarDatos() {
  try {
    const datos = await fetch("js/datos.json").then((response) =>
      response.json(),
    );
    return datos;
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}

const contenedorBocadillos = document.querySelector(".bocadilloDown");
const contenedorBebidas = document.querySelector(".bebidasDown");
const dropdown = document.querySelectorAll(".btnDrop");
const lista = document.querySelectorAll(".lista");

async function mostrarBocadillos() {
  const datos = await cargarDatos();
  datos.Bocadillos.forEach((b) => {
    const bocadillo = document.createElement("div");
    const nombre = document.createElement("h4");
    const precio = document.createElement("div");
    const pequeño = document.createElement("p");
    const mediano = document.createElement("p");
    const grande = document.createElement("p");

    nombre.innerText = b.nombre;
    pequeño.innerHTML = `Pitufo: <span>${b.precio[0]}€</span>`;
    mediano.innerHTML = `3/4: <span>${b.precio[1]}€</span>`;
    grande.innerHTML = `Barrita: <span>${b.precio[2]}€</span>`;

    precio.appendChild(pequeño);
    precio.appendChild(mediano);
    precio.appendChild(grande);
    nombre.classList = "title";
    bocadillo.appendChild(nombre);

    if (b.ingredientes) {
      const ingredientes = document.createElement("p");
      bocadillo.appendChild(ingredientes);
      ingredientes.innerHTML = `Ingredientes: <span>${b.ingredientes}</span>`;
    }

    bocadillo.appendChild(precio);
    bocadillo.classList = "bocadillo";
    contenedorBocadillos.appendChild(bocadillo);
  });
}

async function mostrarBebidas() {
  const datos = await cargarDatos();

  for (let a in datos.Bebidas) {
    const tipo = document.createElement("h2");
    tipo.innerText = a;
    tipo.classList = "title";
    contenedorBebidas.appendChild(tipo);
    datos.Bebidas[a].forEach((b) => {
      const bebida = document.createElement("div");
      const nombre = document.createElement("h4");
      const precio = document.createElement("p");

      nombre.innerText = b.nombre;
      if (Array.isArray(b.precio)) {
        precio.innerHTML = `Precio: <span>${b.precio.join("€, ")}€</span>`;
      } else {
        precio.innerHTML = `Precio: <span>${b.precio}€</span>`;
      }
      nombre.classList = "title";
      bebida.appendChild(nombre);
      bebida.appendChild(precio);
      bebida.classList = "bebida";
      contenedorBebidas.appendChild(bebida);
    });
  }
}

mostrarBebidas();
mostrarBocadillos();

let last = undefined;
dropdown.forEach((button) => {
  button.addEventListener(`click`, (e) => {
    let current = e.target.nextElementSibling;
    current.classList.toggle("show");
    if (last !== current) {
      if (typeof last == "undefined") {
        last = current;
      } else {
        last.classList.remove("show");
        last = current;
      }
    }
  });
});

window.onclick = function (event) {
  if (!event.target.matches(".btnDrop")) {
    lista.forEach((close) => close.classList.remove("show"));
  }
};
