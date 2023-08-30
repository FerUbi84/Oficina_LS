var mongoose = require('mongoose');
const { Schema } = mongoose;

const CarroStock = new Schema({
    matricula: { type: String, required: true, unique:true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    ano: { type: Number, required: true },
    preco_compra: { type: Number, required: true },
    preco_venda: { type: Number, required: true },
    data_insercao: { type: Date, default: Date.now }
})


module.exports = mongoose.model("CarroStock", CarroStock);