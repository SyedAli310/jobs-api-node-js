require("dotenv").config();
require("express-async-errors");

//extra security packages(middlewares)
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();
//conenctDB
const connectDB = require("./db/connect");
//routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const exploreJobsRouter = require("./routes/allJobs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authenticateUser = require("./middleware/authentication");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
// extra packages
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.get('/', (req,res)=>{
  res.status(200).send(`<h1 style='text-align:center; color:limegreen;'>Store API</h1>`)
})
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/explore", exploreJobsRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
