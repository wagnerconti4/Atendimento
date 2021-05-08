const Express = require('express')
const Servidor = Express()

Servidor.get('/',(req,res)=>{
    res.send("Olá")
})

Servidor.listen(8080,(erro)=>{
    if(erro){ 
        throw erro
    }
    console.log("Servidor rodando...")
})