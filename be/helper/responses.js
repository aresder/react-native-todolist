export function responseError(expressResponse, code = 400, errors = {}) {
  return expressResponse.status(code).json({
    status: "error",
    errors,
  });
}

export function responseSuccess(
  expressResponse,
  code = 200,
  message = "success"
) {
  return expressResponse.status(code).json({
    status: "success",
    message,
  });
}

export function responseData(expressResponse, code = 200, data = []) {
  return expressResponse.status(code).json({
    status: "success",
    data,
  });
}
