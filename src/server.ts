import express from "express";
import path from "path";

const app = express();
const PORT = 4567;

const clientPath = path.resolve(process.cwd(), "client", "dist");

app.use(express.static(clientPath));
app.use(express.json());

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

app.get("/health", (req, res) => {
  res.json({ status: "Healthy" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});