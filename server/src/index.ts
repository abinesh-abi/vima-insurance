import express from "express";
import cors from "cors";
import path from "path";
import CONFIG from "./config/index";
import insuranceRoute from "./routes/insuranceRoutes";
import { getInsurances } from "./controller/insuranceController";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(path.dirname + "/public"));
app.use(express.json());

//routes
app.use("/policies", insuranceRoute);

app
  .listen(CONFIG.PORT, () => {
    console.log(`listening to port ${CONFIG.PORT}`);
  })
  .on("error", (err) => {
    console.log(err);
    process.exit();
  });
