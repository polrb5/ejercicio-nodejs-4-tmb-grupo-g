// imports

require("dotenv").config();
const fetch = require("node-fetch");
const chalk = require("chalk");
const { preguntasUsuario } = require("./usuario");

// Declaraciones API

const urlLineaMetro = process.env.URL_LINEA_METRO;
const appKey = process.env.APP_KEY;
const appId = process.env.APP_ID;

const urlLineasAPI = `${urlLineaMetro}app_id=${appId}&app_key=${appKey}`;

// He pasado la función dentro de init, porque se necesita arrayLineas dentro de init.
//
// const cargarLinia = async () => {
//   const resp = await fetch(urlLineasAPI);
//   const lineas = await resp.json();
//   const arrayLineas = lineas.features.map(
//     (linea) => linea.properties.NOM_LINIA
//   );
// };

// Función que recibe respuestas del usuario

const init = async () => {
  const respuestas = await preguntasUsuario();

  switch (respuestas.transporte) {
    case "bus":
      console.log(
        chalk.yellow(
          `No tenemos información disponible sobre los buses. La puedes encontrar aquí: ${process.env.URL_BUS_TMB}`
        )
      );
      process.exit(0);
      break;
    case "metro":
      break;
    default:
      break;
  }
  // cargarLinia();

  // Fetch a la url

  const resp = await fetch(urlLineasAPI);
  const lineas = await resp.json();

  // Comprobar si existe la linea

  const arrayLineas = lineas.features.map(
    (linea) => linea.properties.NOM_LINIA
  );
  if (!arrayLineas.includes(respuestas.linea.toUpperCase())) {
    if (respuestas.informeErrores) {
      console.log("La linea indicada no existe");
      process.exit(1);
    } else {
      process.exit(1);
    }
  }
  if (arrayLineas.includes(respuestas.linea.toUpperCase())) {
    // Propiedades de la linea
    const nombreLinea = lineas.features
      .filter(
        (linea) => linea.properties.NOM_LINIA === respuestas.linea.toUpperCase()
      )
      .map((linea) => linea.properties.NOM_LINIA);
    const descripcionLinea = lineas.features
      .filter(
        (linea) => linea.properties.NOM_LINIA === respuestas.linea.toUpperCase()
      )
      .map((linea) => linea.properties.DESC_LINIA);
    const colorLinea = lineas.features
      .filter(
        (linea) => linea.properties.NOM_LINIA === respuestas.linea.toUpperCase()
      )
      .map((linea) => linea.properties.COLOR_LINIA);

    // Mensaje del nombre y descripción
    console.log(
      chalk.hex(`#${colorLinea}`)(
        `Linea: ${nombreLinea}, Descripción: ${descripcionLinea}`
      )
    );
  }
};

init();
