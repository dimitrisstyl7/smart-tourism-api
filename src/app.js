import morgan from "morgan";
import express from "express";
import countryRouter from "./routers/country.router.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/country", countryRouter);

export default app;