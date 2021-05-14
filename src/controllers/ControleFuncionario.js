const Funcionario = require('../models/Funcionario')


module.exports = {

    async listaFuncionario(req, res){
        const funcionario = await Funcionario.findAll()

        return res.json(funcionario)
    },


    async cadastroFuncionario(req, res){

        const {nome_funcionario, telefone_funcionario, email_funcionario} = req.body

        const funcionario = await Funcionario.create({nome_funcionario, telefone_funcionario, email_funcionario}).catch((erro)=>{
            if(erro){
                console.log('Erro durante o cadastro de funcionario...' + erro)
            }
        })
        return res.json(funcionario)
    }
}