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
          name: "fechaInauguracion",
          value: "fechaInauguracion",
        },
      ],
    },
  ]);
};

preguntasUsuario();
