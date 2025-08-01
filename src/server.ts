import express from "express";
import { routes } from "./routes/index";

const app = express();
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
