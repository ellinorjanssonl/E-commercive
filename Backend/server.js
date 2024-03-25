const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Importera cors

const app = express();
const PORT = 5000;

app.use(cors()); // Använd cors som middleware i Express
app.use('/bilder', express.static('bilder'));

app.get('/', (req, res) => {
    res.send('Servern körs');
});

app.use(express.json());

app.get('/api/products', (req, res) => {
    const productsPath = path.join(__dirname, 'api', 'products.json');
    fs.readFile(productsPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Kunde inte läsa produkterna');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.get('/api/products/:id', (req, res) => {
    console.log(`Request for product with ID: ${req.params.id}`);
    const id = req.params.id;
    console.log(`Requested product ID: ${id}`); // Loggar det begärda ID:et

    const productsPath = path.join(__dirname, 'api', 'products.json');
    fs.readFile(productsPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Kunde inte läsa produkterna');
            return;
        }
        const products = JSON.parse(data);
        const product = products.find(product => product.id === parseInt(id));
        if (!product) {
            res.status(404).send('Produkten hittades inte');
            return;
        }
        res.json(product);
    });
});

app.listen(PORT, () => {
    console.log(`Servern körs på port ${PORT}`);
});

