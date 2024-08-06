const Department = require("../models/department");

exports.seed = async function () {
  const { v4: uuidv4 } = require("uuid");

  try {
    await Department.create({
      uuid: uuidv4(),
      name: "Engineering",
      sname: "E/S",
      color: "#2F6EBA",
    });
    await Department.create({
      uuid: uuidv4(),
      name: "Maintenance",
      sname: "MT",
      color: "#DE8344",
    });
    await Department.create({
      uuid: uuidv4(),
      name: "Quality Control",
      sname: "QC",
      color: "#FFFF54",
    });
    await Department.create({
      uuid: uuidv4(),
      name: "Plant Administration Department",
      sname: "PAD",
      color: "#7F7F7F",
    });
  } catch (error) {
    console.log(error);
  }
};
