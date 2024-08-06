module.exports = {
  common: (res, data) => {
    return res.status(200).json({
      success: "success",
      data,
    });
  },
  success: (res, data = null) => {
    return res.status(201).json({
      success: "success",
      data,
    });
  },
  error: (res, error) => {
    return res.status(400).json({
      success: "error",
      error,
    });
  },
  notFound: (res) => {
    return res.status(404).json({
      success: "error",
      error: "not found",
    });
  },
  notAllowed: (res) => {
    return res.status(405).json({
      success: "error",
      error: "not allowed",
    });
  },
  serverError: (res, error) => {
    return res.status(500).json({
      success: "error",
      error,
    });
  },
  unAuthorized: (res) => {
    return res.status(401).json({
      success: "error",
      error: "unauthorized",
    });
  },
};
