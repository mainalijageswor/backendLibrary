require('dotenv').config();
const IndexRouter = require("./Routes/index");
const express = require('express');
const app = express();
const cors = require("cors");

const PORT: any = 8085;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
app.use(cors());
app.use(express.json());
// app.use(urlencoded({ extended: true }));
app.use("/api/v1", IndexRouter);
app.use((req: any, res: any, next: any) => {
  const error: Error & { status?: number } & { message: String } = new Error();
  error.status = 404;
  error.message = "Page Not Found";
  next(error);
});

//Error handler middleware
app.use((error: any, req: any, res: any, next: any) => {
  res.status(error.status || 500).json({
    status: false,
    message: error.message,
  });
});
