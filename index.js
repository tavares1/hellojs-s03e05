// index.js
const knex = require("./db").knex
const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
app.use(express.static("public"))

app.get("/list", (req, res) => 
  knex("contato").select().then(ret => res.send(ret)))
app.post("/save", (req, res) => {
  console.log(req.body)
  knex("contato").insert(req.body, "idcontato").then(ret => res.send("OK-" + ret))})
app.put("/save", (req, res) => 
  knex("contato").update(req.body)
  .where("idcontato", req.body.idcontato).then(ret => res.send("OK-" + ret)))
app.delete("/delete",(req,res) => {
  console.log(req.body)
  knex("contato").where("idcontato",req.body.idcontato).del()
})

knex.migrate.latest().then(_ => app.listen(4000))

console.log("ctrl+c to quit")