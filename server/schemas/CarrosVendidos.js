var mongoose = require('mongoose');
const { Schema } = mongoose;

const CarroVendidos = new Schema({
    matricula: { type: String, required: true, unique:true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    ano: { type: Number, required: true },
    preco_compra: { type: Number, required: true },
    preco_venda: { type: Number, required: true },
    lucro: { type: Number, required: true },
    data_venda: { type: Date, default: Date.now },
})


module.exports = mongoose.model("CarrosVendidos", CarroVendidos);