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
        Servidor.get('/',(req, res)=>{
            res.render('Menu')
        })

    //Rotas Atendimentos
        
    
        //Rota de listagem 
            Servidor.all('/Listagem_Atendimento',(req, res)=>{
                Atendimento.findAll({include:{model:Funcionario,as:'funcionario', attributes:['nome_funcionario']}}).then((atendimentos)=>{ 
                    res.render('ListaAtendimento',{atendimentos: atendimentos}) 
                }).catch((erro)=>{
                    if(erro){
                        console.log("Ocorreu um erro durante a listagem de atendimento" + erro)
                    }
                })
                
            })



        //Rota de cadastro
            Servidor.get('/Cadastro_Atendimento',(req, res)=>{
                Funcionario.findAll({include:{
                    model: Atendimento, 
                    as: 'atendimento'
                }}).then((funcionarios)=>{
                    res.render('CadastroAtendimento',{funcionarios:funcionarios})
                }).catch((error)=>{
                    if(error){
                        console.log('Ocorreu um erro...'+ error)
                    }
                })
                
            })
            Servidor.post('/cadastro_atendimento',async(req, res)=>{
                const status = req.body.Radio
                const nome_funcionario = req.body.nome_funcionario
                console.log(nome_funcionario)
                const funcionario = await Funcionario.findOne({where:{nome_funcionario: nome_funcionario},attributes:['id']})
                console.log(funcionario)
                const {nome_cliente, nome_empresa, telefone_cliente, problema_cliente, endereco_cliente_rua,endereco_cliente_numero, endereco_cliente_complemento} = req.body
                
                
                const atendimento = await Atendimento.create({nome_cliente, nome_empresa, telefone_cliente, problema_cliente, endereco_cliente_rua,endereco_cliente_numero, endereco_cliente_complemento,status,funcionario_id:funcionario.id}).catch((erro)=>{
                    if(erro){
                        console.log("Erro no cadastro de atendimento..." + erro)
                    }
                })
                console.log(atendimento)
                res.send("Atendimento cadastrado com sucesso =D")
            })
            
           //Rota de atualização de Atendimento
        
           Servidor.get('/Atualiza_Atendimento/:atendimento_id', (req, res)=>{
                    const {atendimento_id} = req.params
                   Atendimento.findAll({include:{model: Funcionario, 
                        as:'funcionarios',
                        attributes:['id','nome_funcionario']}, where:{id: atendimento_id}
                    }).then((atendimentos)=>{
                        Funcionario.findAll({attributes:['id','nome_funcionario']}).then((funcionarios)=>{
                            res.format({
                                'text/html': function(){
                                    res.render('AtualizaAtendimento',{atendimentos: atendimentos, funcionarios: funcionarios})
                                }
                            })
                        }).catch((erro)=>{
                            if(erro){
                                console.log("Ouve um erro durante a exibição do atendimento..." + erro)
                            }
                        })
                    })

               })

               Servidor.post('/atualiza_atendimento',async(req, res)=>{
                
                const status = req.body.Radio
                
                const {id,nome_cliente, nome_empresa, telefone_cliente, problema_cliente, endereco_cliente_rua,endereco_cliente_numero, endereco_cliente_complemento } = req.body
               
                   const atendimento = await Atendimento.update({nome_cliente: nome_cliente, nome_empresa:nome_empresa, telefone_cliente:telefone_cliente, problema_cliente:problema_cliente, endereco_cliente_rua: endereco_cliente_rua,endereco_cliente_numero:endereco_cliente_numero, endereco_cliente_complemento: endereco_cliente_complemento,status:status}, {where:{id:id}}).catch((erro)=>{
                    if(erro){
                        console.log("Erro durante a atualização de atendimento..." + erro)
                    }
                })
                const nome_funcionario = req.body.funcionarios
                   const funcionario = await Funcionario.findAll({nome_funcionario : nome_funcionario},{where:{id: id}}).catch((erro)=>{
                        console.log("Ocorreu um erro durante de funcionário no atendimento ")
                    })
                    res.send('Atendimento atualizado com sucesso')
                    await funcionario.addAtendimento(atendimento)
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