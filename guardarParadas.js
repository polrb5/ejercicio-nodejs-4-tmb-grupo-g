const fs = require("fs");
const chalk = require("chalk");

const guardarParadas = (paradas) => {
  fs.writeFile("infoParadas/paradas.txt", JSON.stringify(paradas), (err) => {
    if (err) {
      console.log(chalk.bold.red("¡Algo ha salido mal!"));
    }
    process.exit(1);
  });
};

module.exports = {
  guardarParadas,
};
