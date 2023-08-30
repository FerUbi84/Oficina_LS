const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());


const PORT = 5000 || process.env.PORT;

require("dotenv").config();

app.listen(PORT, () => {
    console.log(`Serviço a correr na porta  ${PORT}`)
})

app.use('/carros', require('./routes/Carros'))