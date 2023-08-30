const mongoose = require('mongoose');
const CarrosVendidos = require('./schemas/CarrosVendidos');
const { Schema } = mongoose;

const MONGO_PATH = "mongodb+srv://lingSoft:vamoslapa@oficina.65g8o.mongodb.net/oficina?retryWrites=true&w=majority";

mongoose.connect(MONGO_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection
    .once("open", () => { console.log("Connected") })
    .on("error", error => { console.error(error) })


//SCHEMAS
const CarroStock = new Schema({
    matricula: { type: String, required: true, unique: true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    ano: { type: Number, required: true },
    preco_compra: { type: Number, required: true },
    preco_venda: { type: Number, required: true },
    data_insercao: { type: Date, default: Date.now }
})

CarroStock.methods.removerStock = async function (matricula_carro) {
    await CarroStock.deleteOne({matricula: matricula_carro});
}

const Vendas = new Schema({
    matricula: { type: String, required: true, unique: true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    ano: { type: Number, required: true },
    preco_compra: { type: Number, required: true },
    preco_venda: { type: Number, required: true },
    lucro: { type: Number, required: true },
    data_venda: { type: Date, default: Date.now }
})

Vendas.methods.vender = async function(preco_compra, preco_venda) {
     this.lucro = await preco_venda - preco_compra;
    return this.lucro;
  };
 
 
const Carros = mongoose.model("CarroStock", CarroStock);
const Venda = mongoose.model("Vendas", Vendas);

module.exports = { Carros, Venda }
