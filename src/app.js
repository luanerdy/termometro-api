import express from "express";
import cors from 'cors';
import { getWords } from "./routes/words.js";
import { json } from "express";

const app = express();

app.use(cors());
app.use(json());

getWords(app);

export { app };
