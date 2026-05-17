export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message;

  if (err.message === "ZodError") {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join("");
  }
  res.staus(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
