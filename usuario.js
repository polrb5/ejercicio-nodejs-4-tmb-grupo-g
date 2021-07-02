const inquirer = require("inquirer");

const preguntasUsuario = () => {
  const respuestas = inquirer.prompt([
    {
      name: "transporte",
      type: "list",
      message: "¿Qué tipo de transporte quiere consultar?",
      choices: [
        {
          name: "bus",
          value: "bus",
        },
        {
          name: "metro",
          value: "metro",
        },
      ],
    },
    {
      name: "informacion",
      type: "checkbox",
      message: "¿Qué información extra quiere obtener de cada parada?",
      when: (preguntasAnteriores) => preguntasAnteriores.transporte === "metro",
      choices: [
        {
          name: "coordenadas",
          value: "coordenadas",
        },
        {
          name: "fecha de inauguracion",
          value: "fechaInauguracion",
        },
      ],
    },
    {
      name: "informeErrores",
      type: "confirm",
      message: "¿Quiere que le informemos de los errores?",
      when: (preguntasAnteriores) => preguntasAnteriores.transporte === "metro",
    },
    {
      name: "linea",
      type: "input",
      message: "¿Qué línea quiere consultar?",
      when: (preguntasAnteriores) => preguntasAnteriores.transporte === "metro",
    },
  ]);
  return respuestas;
};

module.exports = {
  preguntasUsuario,
};
