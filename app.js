//Importação dos modulos
    const bodyParser = require('body-parser')
    const Express = require('express')
    const Servidor = Express()
    const ExpressHadlebars = require('express-handlebars')
    const TabelasBanco = require('./models/tabelaBanco')

//Configuração do Handlebars
    Servidor.engine('handlebars',ExpressHadlebars({defaultLayout: 'main'}))
    Servidor.set('view engine', 'handlebars')

//Configuração do Bory Parser   
    Servidor.use(Express.urlencoded({extended: true}))
    Servidor.use(Express.json())


//Rotas
    Servidor.get('/',(req,res)=>{
        res.send("Olá")
    })


    Servidor.get('/Cadastro_Atendimento',(req,res)=>{
        res.render('CadastroAtendimento')
    })


    Servidor.post('/AtendimentoRealizado',(req,res)=>{
        TabelasBanco.Atendimento.create({
            NomeCliente: req.body.NomeCliente,
            NomeEmpresa: req.body.EmpresaCliente,
            TelefoneCliente: req.body.TelefoneCliente,
            EnderecoClienteRua: req.body.EnderecoCliente,
            EnderecoClienteNumero: req.body.NumeroCliente,
            EnderecoClienteComplemento: req.body.ComplementoCliente
        }).then(()=>{
            res.send("Cadastrado com sucesso")
        }).catch((erro)=>{
            res.send("Ocorreu um erro durante o cadastro..." + erro)
        })
    })

    

//Conexão do servidor
    Servidor.listen(8080,(erro)=>{
        if(erro){ 
            throw erro
        }
        console.log("Servidor rodando...")
    })