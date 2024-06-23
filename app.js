const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Initialize products array
let products = [
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Smartphone', price: 499.99 },
    { id: 3, name: 'Headphones', price: 99.99 }
];

app.get('/', (req, res) => {
    res.render('index', { products });
});

app.post('/add-product', (req, res) => {
    const { name, price } = req.body;
    
    // Basic validation
    if (!name || !price || isNaN(price)) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const newProduct = {
        id: products.length + 1,
        name,
        price: parseFloat(price)
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// 404 Error handler
app.use((req, res) => {
    res.status(404).render('error');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});