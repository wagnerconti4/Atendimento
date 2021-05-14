//Importação dos modulos
    const Express = require('express')

    require('./database/conexaoBancoDados')
    const Servidor = Express()
    const ExpressHadlebars = require('express-handlebars')
    const TabelasBanco = require('./models/tabelaBanco')
    const routes = require('./rotas')
    Servidor.use(Express.json())
    Servidor.use(routes)

//Configuração do Handlebars
    Servidor.engine('handlebars',ExpressHadlebars({defaultLayout: 'main'}))
    Servidor.set('view engine', 'handlebars')

//Configuração do Bory Parser   
    Servidor.use(Express.urlencoded({extended: true}))
    Servidor.use(Express.json())
    

//Rotas

    //Principal

   

    //Rota de cadastro de Atendimento

    Servidor.get('/Cadastro_Atendimento',(req, res)=>{
        TabelasBanco.Funcionario.findAll({
            attributes: ['id']
        }).then((funcionarios)=>{
            res.render('CadastroAtendimento',{funcionarios: funcionarios})
        }).catch((erro)=>{
            console.log('Ocorreu um erro...' + erro)
        })
       
    })

    Servidor.post('/AtendimentoCadastro',(req, res)=>{
        TabelasBanco.Atendimento.create({
            NomeCliente: req.body.NomeCliente,
            NomeEmpresa: req.body.EmpresaCliente,
            TelefoneCliente: req.body.TelefoneCliente,
            ProblemaCliente: req.body.ProblemaCliente,
            EnderecoClienteRua: req.body.EnderecoCliente,
            EnderecoClienteNumero: req.body.NumeroCliente,
            EnderecoClienteComplemento: req.body.ComplementoCliente,
            Funcionario: req.body.Funcionario,
            Status: req.body.Radio
        }).then(()=>{
            res.send("Atendimento cadastrado com sucesso")
        }).catch((erro)=>{
            res.send("Ocorreu um erro durante o cadastro..." + erro)
        })
    })

    //Rota de listagem de atendimento

    Servidor.get('/Lista_Atendimento',(req,res)=>{
            
            TabelasBanco.Atendimento.findAll({
            include:[
               { model: TabelasBanco.Funcionario,
                attributes: ['id', 'NomeFuncionario'],
                through:{ attributes: []}
               }]
 
            }).then((atendimentos)=>{
            res.render('ListaAtendimento',{atendimentos: atendimentos})
           
        }).catch((erro)=>{
            console.log("Houve um erro....................." + erro)
        })
       
    })


    //Rota de cadastro de Empresa

    Servidor.get('/Cadastro_Empresa',(req, res)=>{
        res.render('CadastroEmpresa')
    })

    Servidor.post('/EmpresaCadastro',(req, res)=>{
        TabelasBanco.Empresa.create({
            CNPJ: req.body.CNPJEmpresa,
            NomeEmpresa: req.body.NomeEmpresa,
            EnderecoEmpresaRua: req.body.EnderecoEmpresaRua,
            EnderecoEmpresaNumero: req.body.EnderecoEmpresaNumero,
            EnderecoEmpresaComplemento: req.body.EnderecoEmpresaComplemento,
            TelefoneEmpresa: req.body.TelefoneEmpresa
        }).then(()=>{
            res.send("Empresa cadastrada com sucesso")
        }).catch((erro)=>{
            res.send("Ocorreu um erro durante o cadastro..." + erro)
        })
    })

    //Rota de Listagem de Empresa

    Servidor.get('/Lista_Empresa',(req, res)=>{
        TabelasBanco.Empresa.findAll().then((empresas)=>{
            res.render('ListaEmpresa',{empresas: empresas})
        })
    })
    

    //Rota de cadastro de Funcionário

    Servidor.get('/Cadastro_Funcionario',(req, res)=>{
        res.render('CadastroFuncionario')
    })

    Servidor.post('/FuncionarioCadastro',(req, res)=>{
        TabelasBanco.Funcionario.create({
            NomeFuncionario: req.body.NomeFuncionario
        }).then(()=>{
            res.send("Funcionario cadastro com sucesso")
        }).catch((erro)=>{
            res.send("Ocorreu um erro durante o cadastro..." + erro)
        })
    })

    //Rota de listagem de Funcionário
    Servidor.get('/Lista_Funcionario',(req, res)=>{
        TabelasBanco.Funcionario.findAll().then((funcionarios)=>{
            res.render('ListaFuncionario', {funcionarios: funcionarios})
        })
    })


//Conexão do servidor
    Servidor.listen(8080,(erro)=>{
        if(erro){ 
            throw erro
        }
        console.log("Servidor rodando...")
    })