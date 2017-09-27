// index.js
const knex = require("./db").knex
const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
app.use(express.static("public"))

app.get("/list", (req, res) => {
  console.log(req.body)
  knex("contato").select().then(ret => res.send(ret))})
app.post("/save", (req, res) => {
  console.log(req.body)
  knex("contato").insert(req.body, "idcontato").then(ret => res.send("OK-" + ret))})
app.put("/save", (req, res) => 
  knex("contato").update(req.body)
  .where("idcontato", req.body.idcontato).then(ret => res.send("OK-" + ret)))
app.delete("/delete",(req,res) => {
  knex("contato").where("idcontato",req.body.idcontato).del().then(ret => res.send("EXCLUIDO")).catch((err)=>console.log(err))
})

knex.migrate.latest().then(_ => app.listen(3000))

console.log("ctrl+c to quit")