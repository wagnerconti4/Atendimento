//Importação dos modulos
    const Express = require('express')
    require('./database/conexaoBancoDados')
    const Servidor = Express()
    const ExpressHadlebars = require('express-handlebars')
    const Atendimento = require('./models/Atendimento')
    const Funcionario = require('./models/Funcionario')
    const Atendimento_Funcionario = require('./models/Atendimento_Funcionario')

//Configuração do Handlebars
    Servidor.engine('handlebars',ExpressHadlebars({defaultLayout: 'main'}))
    Servidor.set('view engine', 'handlebars')

//Configuração do Bory Parser   
    Servidor.use(Express.urlencoded({extended: true}))
    Servidor.use(Express.json())

    //Configuração CSS
    Servidor.use('/css',Express.static('css'))
    

//Rotas

    //Rota Menu
        Servidor.get('/',(req, res)=>{
            res.render('Menu')
        })

    //Rotas Atendimentos
        
    
        //Rota de listagem 
            Servidor.all('/Listagem_Atendimento',(req, res)=>{
                
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
            Servidor.get('/Cadastro_Atendimento',(req, res)=>{
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
                res.redirect("/")
                await funcionario.addAtendimento(atendimento) 
                
            })

           
            
           //Rota de atualização de Atendimento
        
           Servidor.get('/Atualiza_Atendimento/:atendimento_id', (req, res)=>{
                    const {atendimento_id} = req.params
                   Atendimento.findAll({where:{id: atendimento_id},include:{association: 'funcionarios'}
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
               
                 atendimento = await Atendimento.update({nome_cliente: nome_cliente, nome_empresa:nome_empresa, telefone_cliente:telefone_cliente, problema_cliente:problema_cliente, endereco_cliente_rua: endereco_cliente_rua,endereco_cliente_numero:endereco_cliente_numero, endereco_cliente_complemento: endereco_cliente_complemento,status:status},{where:{id:id}}).catch((erro)=>{
                    if(erro){
                        console.log("Erro durante a atualização de atendimento..." + erro)
                    }
                })
                const nome_funcionario = req.body.funcionarios
                 const funcionario = await Funcionario.findOne({attributes:['id'],where:{nome_funcionario: nome_funcionario}         
                }).catch((erro)=>{
                        console.log("Ocorreu um erro durante de funcionário no atendimento " + erro)
                    })
                    await Atendimento_Funcionario.update({funcionario_id: funcionario.id},{where:{ atendimento_id: id}}).catch((error)=>{
                        console.log("Houve um erro....." + error)
                    })
                    res.redirect('/')
                    
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
                        res.redirect("/")
                    }).catch((erro)=>{
                        if(erro){
                            console.log("Erro no cadastro de funcionario..." + erro)
                            res.send("Houve um erro...desculpe :(")
                        }  
                    })
                })
        
        //Rota de atualização
                Servidor.get('/Atualiza_Funcionario/:id',(req, res)=>{
                    const {id} = req.params
                    Funcionario.findAll({where:{id : id}}).then((funcionario)=>{
                        res.render('AtualizaFuncionario',{funcionario: funcionario})
                    })
                })

                Servidor.post('/atualiza_funcionario', (req, res)=>{
                    
                    const {id, nome_funcionario, telefone_funcionario, email_funcionario} = req.body

                    Funcionario.update({nome_funcionario : nome_funcionario, telefone_funcionario : telefone_funcionario, email_funcionario : email_funcionario},{where:{id : id}}).catch((error)=>{
                        if(error){
                            console.log("Houve um erro durante a atualização do funcionario....."+ error)
                        }
                    })
                    res.redirect('/')
                })


//Conexão do servidor
    Servidor.listen(8000,(erro)=>{
        if(erro){ 
            throw erro
        }
        console.log("Servidor rodando...")
    })