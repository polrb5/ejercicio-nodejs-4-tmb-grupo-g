const chalk = require("chalk");

const eligeBus = (respuesta) => {
  if (respuesta === "bus") {
    console.log(
      chalk.yellow(
        `No tenemos información disponible sobre los buses. La puedes encontrar aquí: ${process.env.URL_BUS_TMB}`
      )
    );
    process.exit(0);
  }
};

module.exports = {
  eligeBus,
};
