const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Importera cors
const app = express();
const PORT = 5000;

app.use(cors()); // Använd cors som middleware i Express
app.use('/bilder', express.static('bilder'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servern körs');
});

app.post('/api/register', (req, res) => {
    const { username, password } = req.body; 
    const usersPath = path.join(__dirname, 'api', 'users.json');
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    
    // Kontrollera om användaren redan finns
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      return res.status(400).json({ message: 'Användaren finns redan' });
    }
    // Lägg till den nya användaren
    users.push({ id: users.length + 1, username, password }); // Notera: Du bör hasha lösenord i en verklig applikation!
  
    // Spara den uppdaterade användarlistan
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    res.json({ message: 'Användaren har registrerats' });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const usersPath = path.join(__dirname, 'api', 'users.json');
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
      return res.status(401).send('Fel användarnamn eller lösenord');
    }
  
    res.json({ message: 'Inloggningen lyckades', user });
  });

  
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

