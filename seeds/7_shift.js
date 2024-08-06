const Shift = require("../models/shift");

exports.seed = async function () {
  const { v4: uuidv4 } = require("uuid");

  try {
    await Shift.create({
      uuid: uuidv4(),
      name: "Red",
      sname: "R",
    });
    await Shift.create({
      uuid: uuidv4(),
      name: "White",
      sname: "W",
    });
  } catch (error) {
    console.log(error);
  }
};
