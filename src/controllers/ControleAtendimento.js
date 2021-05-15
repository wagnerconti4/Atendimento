const Atendimento = require('../models/Atendimento')
const Funcionario = require('../models/Funcionario')

module.exports = {
    async listaAtendimento(req, res){

        const atendimento = await Atendimento.findAll({
            include: {association: "funcionarios"}
        })
       
        return res.json(atendimento)
    },

        cadastroAtendimento(req,res){
        
        const {funcionario_id} = req.body.funcionario
        
        const funcionario =  Funcionario.findOne({where:{ nome_funcionario: funcionario_id}}).catch((error)=>{
            if(error){
                console.log("Houve um erro durante o cadastro de Atendimento" + erro)
            }
        })

        if(!funcionario){
            return res.status(400).json({erro: 'Funcionario não encontrado'})
        }

        const atendimento = Atendimento.create({
            status: req.body.status,
            nome_cliente: req.body.nome_cliente,
            nome_empresa: req.body.nome_empresa,
            telefone_cliente: req.body.telefone_cliente,
            problema_cliente: req.body.problema_cliente,
            endereco_cliente_rua: req.body.endereco_cliente_rua,
            endereco_cliente_numero: req.body.endereco_cliente_numero,
            endereco_cliente_complemento: req.body.endereco_cliente_complemento
        }).catch((erro)=>{
            if(erro){
                console.log("Erro no cadastro de atendimento..." + erro)
            }
        })
         funcionario.addAtendimento(atendimento)

        return res.render('cadastroAtendimento')
    }
}