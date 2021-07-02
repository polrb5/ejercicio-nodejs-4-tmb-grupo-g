require("dotenv").config();
const fetch = require("node-fetch");
const chalk = require("chalk");
const { preguntasUsuario } = require("./usuario");

const urlLineaMetro = process.env.URL_LINEA_METRO;
const appKey = process.env.APP_KEY;
const appId = process.env.APP_ID;

const urlLiniasAPI = `${urlLineaMetro}app_id=${appId}&app_key=${appKey}`;

const cargarLinia = async () => {
  const resp = await fetch(urlLiniasAPI);
  const linias = await resp.json();
  console.log(linias);
};

cargarLinia();

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
};

init();
