//Importação dos modulos
    const Express = require('express')
    require('./database/conexaoBancoDados')
    const Servidor = Express()
    const ExpressHadlebars = require('express-handlebars')
    const routes = require('./rotas')

// Configuração para se usar json
    Servidor.use(Express.json())
    Servidor.use(routes)

//Configuração do Handlebars
    Servidor.engine('handlebars',ExpressHadlebars({defaultLayout: 'main'}))
    Servidor.set('view engine', 'handlebars')

//Configuração do Bory Parser   
    Servidor.use(Express.urlencoded({extended: true}))
    Servidor.use(Express.json())
    

//Conexão do servidor
    Servidor.listen(8080,(erro)=>{
        if(erro){ 
            throw erro
        }
        console.log("Servidor rodando...")
    })