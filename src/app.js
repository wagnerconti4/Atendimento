//Importação dos modulos
    const Express = require('express')
    require('./database/conexaoBancoDados')
    const Servidor = Express()
    const ExpressHadlebars = require('express-handlebars')
    const Atendimento = require('./models/Atendimento')
    const Funcionario = require('./models/Funcionario')
    
//Configuração do Handlebars
    Servidor.engine('handlebars',ExpressHadlebars({defaultLayout: 'main'}))
    Servidor.set('view engine', 'handlebars')

//Configuração do Bory Parser   
    Servidor.use(Express.urlencoded({extended: true}))
    Servidor.use(Express.json())
    

//Rotas

    //Rota Menu
        Servidor.get('/Menu',(req, res)=>{
            res.render('Menu')
        })

    //Rotas Atendimentos
        
    
        //Rota de listagem 
            Servidor.get('/Listagem_Atendimento',(req, res)=>{
                Atendimento.findAll({
                    include:{model: Funcionario, 
                        as:'funcionarios',
                        attributes:['nome_funcionario']
                    }
                    

                }).then((atendimentos)=>{
                    res.render('ListaAtendimento', {atendimentos: atendimentos})
                })
                
            })



        //Rota de cadastro
            Servidor.get('/Cadastro_Atendimento', (req, res)=>{
                Funcionario.findAll().then((funcionarios)=>{
                    res.render('cadastroAtendimento',{funcionarios: funcionarios})
                })
                
            })
            Servidor.post('/cadastro_atendimento',async(req, res)=>{
                
                const status = req.body.Radio

                const {nome_cliente, nome_empresa, telefone_cliente, problema_cliente, endereco_cliente_rua,endereco_cliente_numero, endereco_cliente_complemento } = req.body

                const atendimento = await Atendimento.create({nome_cliente, nome_empresa, telefone_cliente, problema_cliente, endereco_cliente_rua,endereco_cliente_numero, endereco_cliente_complemento,status }).catch((erro)=>{
                    if(erro){
                        console.log("Erro no cadastro de atendimento..." + erro)
                    }
                })
                const nome_funcionario = req.body.funcionarios
                const funcionario = await Funcionario.findOne({where:{ nome_funcionario: nome_funcionario }}).catch((error)=>{
                    if(error){
                        console.log("Houve um erro durante o cadastro de Atendimento" + error)
                    }
                })
                
                res.send("Atendimento cadastrado com sucesso =D")
                await funcionario.addAtendimento(atendimento) 
            })
            
           //Rota de atualização de Atendimento
           Servidor.get('/Atualizando_Atendimento',(req, res)=>{
               res.render('CadastroAtendimento')
           })


    //Rotas Funcionários 

        //Rota de listagem

                Servidor.get('/Listagem_Funcionario',(req, res)=>{
                    Funcionario.findAll().then((funcionarios)=>{
                        res.render('ListaFuncionario', {funcionarios: funcionarios})
                    }).catch((erro)=>{
                        if(erro){
                            console.log("Houve um erro na listagem de funcionário" + erro)
                        }
                    })
                })

        //Rota de cadastro
                Servidor.get('/Cadastro_Funcionario',(req, res)=>{
                    res.render('cadastroFuncionario')
                })

                Servidor.post('/cadastro_funcionario',(req, res)=>{

                    Funcionario.create({
                        nome_funcionario: req.body.nome_funcionario,
                        telefone_funcionario: req.body.telefone_funcionario,
                        email_funcionario: req.body.email_funcionario
                    }).then(()=>{
                        res.send("Funcionario cadastrado com sucesso =D")
                    }).catch((erro)=>{
                        if(erro){
                            console.log("Erro no cadastro de funcionario..." + erro)
                            res.send("Houve um erro...desculpe :(")
                        }  
                    })
                })


//Conexão do servidor
    Servidor.listen(8080,(erro)=>{
        if(erro){ 
            throw erro
        }
        console.log("Servidor rodando...")
    })