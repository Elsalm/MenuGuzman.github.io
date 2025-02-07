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
console.log(cargarDatos());
const contenedor = document.querySelector(".container");
