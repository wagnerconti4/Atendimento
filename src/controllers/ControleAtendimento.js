const Atendimento = require('../models/Atendimento')

module.exports = {
    async cadastro(req,res){
        const { status, nome_cliente, nome_empresa, telefone_cliente, problema_cliente, endereco_cliente_rua,endereco_cliente_numero, endereco_cliente_complemento } = req.body
        
        const atendimento = await Atendimento.create({status, nome_cliente, nome_empresa, telefone_cliente, problema_cliente, endereco_cliente_rua,endereco_cliente_numero, endereco_cliente_complemento }).catch((erro)=>{
            if(erro){
                console.log("Erro no cadastro de atendimento..." + erro)
            }
        })

        return res.json(atendimento)
    }
}