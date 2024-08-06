const Category = require("../models/category");

exports.seed = async function () {
  const { v4: uuidv4 } = require("uuid");

  try {
    await Category.create({
      uuid: uuidv4(),
      name: "Red Tag",
    });
    await Category.create({
      uuid: uuidv4(),
      name: "Quality 80%",
    });
    await Category.create({
      uuid: uuidv4(),
      name: "Temuan Mgt",
    });
    await Category.create({
      uuid: uuidv4(),
      name: "Ergonomic & Difficulty Job",
    });
  } catch (error) {
    console.log(error);
  }
};
