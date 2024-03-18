const express = require('express');
const path = require('path');
const app = express();
const port = 80;
const bodyparser=require('body-parser');

//Mongoose specific stuff
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
const contact = mongoose.model('contact', contactSchema);


//Express Specific Stuff
app.use('/static',express.static('static'))
app.use(express.urlencoded())

// Pug Specific Stuff
app.set('view engine', 'pug')
app.set('views',path.join(__dirname, 'views'))

// EndPoints
app.get('/',(req,res)=>{
    const params = {};
    res.status(200).render('home.pug',params);
});

app.get('/contact',(req,res)=>{
    const params = {};
    res.status(200).render('contact.pug',params);
});

app.post('/contact',(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database");
    });
});

app.post('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug',params);
});

// Start The Server
app.listen(port,()=>{
    console.log(`This app started successfully on port ${port}`);
})