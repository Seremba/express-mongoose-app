const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product =  require('./models/product');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/farmStand')
.then(() => {
    console.log('SUCCESSFULLY CONNECTED!!!');
})
.catch ( err => {
    console.log('SORRYYYY!!!');
    console.log(err);
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

app.get('/products', async (req, res) => {
   const products =  await Product.find({})
   console.log(products)
    res.render('products/index', {products})
})

app.get('/products/new', (req, res) => {
    res.render('products/new');
})

app.post('/products', async (req, res) => {
   const newProduct = new Product(req.body)
   await newProduct.save()
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`);
})

app.get('/products/:id', async (req, res) => {
    const{id} = req.params;
    const product = await Product.findById(id);
    console.log(product);
    res.render('products/show', {product})
})


app.get('/products/:id/edit', async (req, res) => {
    const{id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product});
})

app.put('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    console.log(product);
    res.redirect(`/products/${product._id}`);
})


const port = 3000;
app.listen(port, () => {
    console.log(`SERVER IS LISTENING TO ${port}`);
});
