const IMG_BASE64 = require("../constants/IMG_BASE64");
const Status = require("../models/status");

exports.seed = async function () {
  const { v4: uuidv4 } = require("uuid");

  try {
    await Status.create({
      uuid: uuidv4(),
      name: "Tanoko 1",
      img: IMG_BASE64.tanoko1.base64,
    });
    await Status.create({
      uuid: uuidv4(),
      name: "Tanoko 2",
      img: IMG_BASE64.tanoko2.base64,
    });
    await Status.create({
      uuid: uuidv4(),
      name: "Tanoko 3",
      img: IMG_BASE64.tanoko3.base64,
    });
    await Status.create({
      uuid: uuidv4(),
      name: "Tanoko 4",
      img: IMG_BASE64.tanoko4.base64,
    });
  } catch (error) {
    console.log(error);
  }
};
