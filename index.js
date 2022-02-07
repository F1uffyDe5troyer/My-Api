const express = require('express');
const app = express();

app.use(express.json());

let products = [{
    id: 1,
    name:"Banana",
    category:"vegetable",
    price:"R6.99",
    img:"https://i.ndtvimg.com/mt/cooks/2014-11/carrots.jpg"
  },
  {
    id: 2,
    name:"Dragon Fruit",
    category:"fruit",
    price:"R3.99",
    img:"https://media.istockphoto.com/photos/red-apple-picture-id184276818?k=20&m=184276818&s=612x612&w=0&h=QxOcueqAUVTdiJ7DVoCu-BkNCIuwliPEgtAQhgvBA_g="
  },
  {
    id: 3,
    name:"Lettuce",
    category:"vegatable",
    price:"4.99",
    img:"https://5.imimg.com/data5/CI/VG/MY-59453495/yellow-banana-500x500.jpg"
  },
  {
    id: 4,
    name:"Raddish",
    category:"vegetable",
    price:"R3.50",
    img:"https://www.localcrop.com.au/330-thickbox_default/potatoes-washed-1kg.jpg"
  },
];

function fixProductIDs(products) {
    products.forEach((product, idx) => {
        product.id = idx+1
    })
}

app.get('/', (req, res) => {
    res.send("BIIING BOONG!!" );
});

app.get('/products', (req, res) => {
    res.send(products);
});

app.post('/products', (req, res) => {
    if (!req.body.name || req.body.name < 3) {
        res.status(400).send('Name is required and should be a minimum 3 characters.');
        return;
    }
    const product = {
        id: products.length + 1,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        img: req.body.img,
    };
    products.push(product);
    res.send(product);
});

app.get('/products/:id', (req, res) => {
    const product = products.find((c) => c.id === parseInt(req.params.id));
    if (!product) res.status(404).send('The product with the given ID was not found.');
    res.send(product);
});

app.delete('/products/:id', (req, res) => {
    products = products.filter((product) => product.id != req.params.id);
    fixProductIDs(products);
    res.send('Item Deleted');
});

app.patch('/products/:id', (req, res) => {
    products.forEach((product) => {
        if (product.id == req.params.id) {
            (product.name = req.body.name),
            (product.category = req.body.category),
            (product.price = req.body.price),
            (product.img = req.body.img);
        }
    });
    res.send('Product updated');
});

const port = process.env.PORT || 5200;
app.listen(port, () => console.log(`Listening on port ${port}...`)); 
