// config inicial
const express = require('express');
const app = express();
const mongoose = require('mongoose');


// Ler JSON
app.use(
   express.urlencoded({
    extend: true

   })
);

app.use(express.json());


// Rotas da API
const celoControllers = require('./controllers/celoControllers');

app.use('/celo', celoControllers);

// rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({ message: "Funcionando!"})
});


const DB_USER = '<senha>'
const DB_PASSWORD = encodeURIComponent('<password>!')


mongoose
.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.rmzai.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
.then( () => {
    console.log("Conectado")
    // Porta para acesso
    app.listen(3000);

})
.catch((err) => console.log(err) )






