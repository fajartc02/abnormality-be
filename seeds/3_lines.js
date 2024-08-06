const Line = require("../models/line");

exports.seed = async function () {
  const { v4: uuidv4 } = require("uuid");

  try {
    await Line.create({
      uuid: uuidv4(),
      shop_id: 1,
      name: "HPDC",
      description: "DC Engine Karawang",
      sname: "HPDC",
    });
    await Line.create({
      uuid: uuidv4(),
      shop_id: 1,
      name: "LPDC",
      description: "LP Engine Karawang",
      sname: "LPDC",
    });
    await Line.create({
      uuid: uuidv4(),
      shop_id: 2,
      name: "Crank Shaft",
      description: "CR Engine Karawang",
      sname: "CR",
    });
    await Line.create({
      uuid: uuidv4(),
      shop_id: 2,
      name: "Cam Shaft",
      description: "CAM Engine Karawang",
      sname: "CAM",
    });
    await Line.create({
      uuid: uuidv4(),
      shop_id: 2,
      name: "Cylinder Block",
      description: "CB Engine Karawang",
      sname: "CB",
    });
    await Line.create({
      uuid: uuidv4(),
      shop_id: 2,
      name: "Cylinder Head",
      description: "CH Engine Karawang",
      sname: "CH",
    });
  } catch (error) {
    console.log(error);
  }
};
