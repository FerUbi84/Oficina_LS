const express = require('express');
const router = express.Router();
const { Carros, Venda } = require('../connect');

router.get('/', (req, res) => {
    res.send("rota inserir carro")
})

router.post('/compra', async (req, res) => {

    const newCarro = new Carros(req.body)
    console.log(req.body)

    newCarro.save()
        .then(() => res.status(200).send("Carro inserido no stock"))
        .catch(err => {
            console.error(err.message)
        })
})

router.get('/selecionar_todos', async (req, res) => {
    await Carros.find({})
        .then(carro => {
            console.log("Carros verificados:", carro.length)

            res.status(200).send({ carros: carro })
            console.log("existe")

        }).catch(err => {
            res.status(400).send({ message: "Sem dados" });
            console.error(err.message);

        })
})

router.get('/num_comprados', async (req, res) => {

    let contador = 0;
    await Carros.find({})
        .then(carro => {
            carro.forEach(c => {
                console.log(c.matricula);
                contador++;
            });
            console.log(`${contador}`)
            res.status(200).send(`Existem ${contador} carros em stock`);
        }).catch(err => {
            res.status(400).send("Não existe em stock");
            console.error(err.message);
        })
})

router.get('/num_vendidos', async (req, res) => {

    let contador = 0;
    await Venda.find({})
        .then(carro => {
            carro.forEach(c => {
                console.log(c.matricula);
                contador++;
            });
            console.log(`${contador}`)
            res.status(200).send({ contador: contador });
        }).catch(err => {
            res.status(400).send("Sem dados");
            console.error(err.message);
        })
})


router.get('/selecionar_vendidos', async (req, res) => {

    await Venda.find({})
        .then(venda => {
            res.status(200).send({ venda: venda });
        }).catch(err => {
            res.status(400).send("Sem dados");
            console.error(err.message);
        })
})

router.get('/total_lucro', async (req, res) => {

    let lucro = 0;
    await Venda.find({})
        .then(venda => {
            venda.forEach(v => {
                lucro+=v.lucro
            });
            res.status(200).send({ lucro: lucro });
        }).catch(err => {
            res.status(400).send("Sem dados");
            console.error(err.message);
        })
})

router.get('/selecionar_um/:matricula', async (req, res) => {

    let matricula_carro = req.params.matricula;

    await Carros.findOne({ matricula: matricula_carro })
        .then(carro => {
            res.status(200).send(carro)
            console.log(carro.matricula)
        }).catch(err => {
            res.status(400).send("Erro na pesquisa");
            console.error(err.message);
        })
})
router.post('/vender/:matricula', async (req, res) => {

    let matricula_carro = req.params.matricula;
    console.log(matricula_carro)

    await Carros.findOne({ matricula: matricula_carro })
        .then(carro => {
            const lucro_carro = carro.preco_venda - carro.preco_compra
            const newVenda = new Venda({
                matricula: carro.matricula,
                marca: carro.marca, modelo: carro.modelo,
                ano: carro.ano,
                preco_compra: carro.preco_compra,
                preco_venda: carro.preco_venda,
                lucro: lucro_carro
            })
            Carros.deleteOne({ matricula: matricula_carro }).then(() => { console.log("carro apagado") });
            console.log("Carro apagado")
            newVenda.save()
                .then(() => res.status(200).send("Carro Vendido"))
            console.log("Carro criado")
        }).catch(err => {
            res.status(400).send("Erro na compra");
            console.error(err.message);
        })
})

router.put('/aumentar_preco/:matricula', async (req, res) => {

    let matricula_carro = req.params.matricula;
    let preco_novo = req.body.preco_venda;
    console.log("Preço novo: ", preco_novo);
    await Carros.findOneAndUpdate({ matricula: matricula_carro }, { preco_venda: preco_novo }, { new: true })
        .then(() => {
            console.log("chegou aqui")
            res.status(200).send(`O carro com a matricula ${matricula_carro} foi actualizado com o preço de ${preco_novo}`)
            console.log("aqui também")
        })
        .catch((err) => {
            res.status(400).send("Preço não actualizado");
            console.error(err.message);
        })
})

module.exports = router;