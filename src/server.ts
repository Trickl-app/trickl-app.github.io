import express from "express";

const app=express();
const PORT = 4567

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send()
})

app.get("/health", (req, res) => {
  res.json({ status: "Healthy" })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})