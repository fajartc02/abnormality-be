const Shop = require("../models/shop");

exports.seed = async function () {
  const { v4: uuidv4 } = require("uuid");

  try {
    await Shop.create({
      uuid: uuidv4(),
      name: "Casting",
      description: "Casting Engine Karawang",
      sname: "C",
      color: "#F19EF9",
    });
    await Shop.create({
      uuid: uuidv4(),
      name: "Machining",
      description: "Machining Engine Karawang",
      sname: "M",
      color: "#926821",
    });
    await Shop.create({
      uuid: uuidv4(),
      name: "Assembly",
      description: "Assembly Engine Karawang",
      sname: "K",
      color: "#8D3AF6",
    });
  } catch (error) {
    console.log(error);
  }
};
