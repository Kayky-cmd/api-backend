const router = require('express').Router();
const Celo = require('../models/Celo');

// Criar dados
router.post('/', async (req, res) => {

    // req.body 
    const {name, password, createAt} = req.body
    
    if(!name) {
        res.status(422).json({error: 'Coloque o nome'});
        return
    }
    
    const celo = {
        name,
        password,
        createAt,
    }

    try {

        // Criando dados    
        await Celo.create(celo)

        res.status(201).json({ message: 'Cadastrado com sucesso'})
        
    } catch (error) {
        res.status(500).json({error: error})
        
    }
});

// LEITURA

router.get('/', async (req, res) => {
    try {
        const pessoa = await Celo.find()
        res.status(200).json(pessoa)
    } catch (error) {
        res.status(500).json({ error: error})
    }
});

router.get('/:id', async (req, res) => {
    // console.log(req) Mostrar todos os dados
    // Extrair dados da requisição url = req.params
    const id = req.params.id

    try {
        const celo = await Celo.findOne({ _id:id }) // Procura usuário apenas por um ID
        if(!celo){

            res.status(422).json({ message: 'Usuario nao encontrado!'})
            return
        }
        
       

    } catch (error) {
        res.status(500).json({error: error})
    }

});

// Update - Atualizar Put e Patch
router.patch('/:id', async (req, res) =>{
    const id = req.params.id
    const {name, password, createAt} = req.body

    const celo = {
        name,
        password,
        createAt,
    }
    try {
        
        const updateCelo = await Celo.updateOne({_id: id}, celo)
        if(updateCelo.mathedCount === 0){ // Quando for zero não atualiza 
            res.status(422).json({ message: 'Usuario nao encontrado!'})

        }

        res.status(200).json({celo})
    } catch (error) {
        res.status(500).json({error: error})
    }


})

// Delete - Deletar do Crud
router.delete('/:id', async (req, res) =>{
    const id = req.params.id
    const celo = await Celo.findOne({ _id: id })

   if(!celo) {
    res.status(422).json({ message: 'Usuario nao encontrado!'})
    return
   }

   try {
       await Celo.deleteOne({_id: id})
       res.status(200).json({ message: 'Usuário removido!'})
   } catch (error) {
    
    res.status(500).json({error: error})
       
   }

})



module.exports = router;