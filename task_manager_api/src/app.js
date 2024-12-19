import express from "express";
import Routes from "./routes.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 3001;
const corsOptions = {
    origin: 'http://localhost:3000', // specify the allowed origin (e.g., if your frontend is running here)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // allowed headers
    credentials: true, // if you need to allow cookies or credentials
  };
app.use(cors(corsOptions));
app.use( bodyParser.json( { limit : "50mb" } ) );
app.use( "/api", Routes );
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})