//criando servidor
const express = require("express") //usando o express instalado
const server = express()

//configurar pasta publica
server.use(express.static("public"))

//utilizando tamplete engine

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da minha aplicação
//pagina inicial
//req: requisição
//res: resposta
server.get("/",(req,res)=>{
   return res.render("index.html",{title:"Um titulo"})
})

server.get("/create-point",(req,res)=>{
    return res.render("create-point.html")
})
server.get("/search",(req,res)=>{
    return res.render("search-results.html")
})

//ligar o servidor
server.listen(3000)
