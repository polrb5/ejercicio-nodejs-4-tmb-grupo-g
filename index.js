// imports
require("dotenv").config();
const fetch = require("node-fetch");
const chalk = require("chalk");
const { program } = require("commander");
const { preguntasUsuario } = require("./usuario");
const { enviarCorreo } = require("./email");
const { guardarParadas } = require("./guardarParadas");
const { eligeBus } = require("./opcionBus");

// Declaraciones API

const urlLineaMetro = process.env.URL_LINEA_METRO;
const appKey = process.env.APP_KEY;
const appId = process.env.APP_ID;

const urlLineasAPI = `${urlLineaMetro}app_id=${appId}&app_key=${appKey}`;

// Función que recibe respuestas del usuario

const init = async () => {
  const respuestas = await preguntasUsuario();
  eligeBus(respuestas.transporte);

  // Fetch a la url
  const resp = await fetch(urlLineasAPI);
  const lineas = await resp.json();

  // Comprobar si existe la linea

  const arrayLineas = lineas.features.map(
    (linea) => linea.properties.NOM_LINIA
  );
  if (!arrayLineas.includes(respuestas.linea.toUpperCase())) {
    if (respuestas.informeErrores) {
      console.log(chalk.red.bold("La linea indicada no existe"));
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
    const codigoLinea = lineas.features
      .filter(
        (linea) => linea.properties.NOM_LINIA === respuestas.linea.toUpperCase()
      )
      .map((linea) => linea.properties.CODI_LINIA);

    // Mensaje del nombre y descripción
    console.log(
      chalk.hex(`#${colorLinea}`)(
        `Linea: ${nombreLinea}, Descripción: ${descripcionLinea}`
      )
    );

    // URL paradas de la linea indicada + llamada a la API
    const urlParadasAPI = `${process.env.URL_PARADAS_METRO}${codigoLinea}/estacions?app_id=${appId}&app_key=${appKey}`;

    const getParadas = await fetch(urlParadasAPI);
    const paradasMetro = await getParadas.json();

    const nombreParada = paradasMetro.features
      .filter((linea) => linea.properties.NOM_ESTACIO)
      .map((linea) => linea.properties.NOM_ESTACIO);
    guardarParadas(nombreParada);

    // Mensaje de las paradas

    // Mensaje si quiere informacion sobre coordenadas y fecha de inauguración
    if (
      respuestas.informacion.includes("coordenadas") &&
      respuestas.informacion.includes("fechaInauguracion")
    ) {
      for (const parada of paradasMetro.features) {
        const coordenadasParada = parada.geometry.coordinates;
        const fechaInauguracionParada = parada.properties.DATA_INAUGURACIO;
        console.log(
          chalk.hex(`#${colorLinea}`)(
            `Parada: ${parada.properties.NOM_ESTACIO}, Coordenadas: ${coordenadasParada}, Fecha de inauguración: ${fechaInauguracionParada}`
          )
        );
      }
    }
    // Mensaje si solo quiere informacion sobre coordenadas
    else if (
      respuestas.informacion.includes("coordenadas") &&
      !respuestas.informacion.includes("fechaInauguracion")
    ) {
      for (const parada of paradasMetro.features) {
        const coordenadasParada = parada.geometry.coordinates;
        console.log(
          chalk.hex(`#${colorLinea}`)(
            `Parada: ${parada.properties.NOM_ESTACIO}, Coordenadas: ${coordenadasParada}`
          )
        );
      }
    }

    // Mensaje si solo quiere informacion fecha de inauguración
    else if (
      !respuestas.informacion.includes("coordenadas") &&
      respuestas.informacion.includes("fechaInauguracion")
    ) {
      for (const parada of paradasMetro.features) {
        const fechaInauguracionParada = parada.properties.DATA_INAUGURACIO;
        console.log(
          chalk.hex(`#${colorLinea}`)(
            `Parada: ${parada.properties.NOM_ESTACIO}, Fecha de inauguración: ${fechaInauguracionParada}`
          )
        );
      }
    }
  }
  if (respuestas.email && respuestas.emailUsuario) {
    const respuestasUsuario = { respuestas };
    enviarCorreo(respuestas.emailUsuario, "Resultados", respuestasUsuario);
    console.log(respuestasUsuario);
  }
};

init();
