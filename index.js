require("dotenv").config();
const chalk = require("chalk");

async () => {
  const respuestas = await preguntasUsuario();
  switch (respuestas.transporte) {
    case "bus":
      console.log(
        chalk.yellow(
          `No tenemos información disponible sobre los buses. La puedes encontrar aquí: ${process.env.URL_BUS_TMB}`
        )
      );
      process.exit(0);
  }
};
