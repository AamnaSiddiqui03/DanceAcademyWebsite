const express = require("express");
const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');
const bodyparser = require("body-parser"); //haven't used this yet
const app = express();
const port = 8000;

// Express static files
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded());

// PUG specific stuff
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/contactDance', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Define mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String,
});
const Contact = mongoose.model('Contact', contactSchema);

// Endpoints
app.get('/', (req, res) => {
  const params = {};
  res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
  const params = {};
  res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save()
      .then(() => {
        res.render('contact.pug', { success: true });
      })
      .catch(() => {
        res.render('contact.pug', { success: false });
      });
  });
  

// app.post('/contact', (req, res) => {
//   var myData = new Contact(req.body);
//   myData.save()
//     .then(() => {
//       res.send("This item has been saved to the database");
//     })
//     .catch(() => {
//       res.status(400).send("Item was not saved to the database");
//     });
// });

// Start the server
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});




// const express= require("express");
// const path = require("path");
// const fs = require("fs");
// const mongoose = require('mongoose');
// const bodyparser= require("body-parser");
// const app= express();
// const port = 8000;

// //Express static files
// //app.use(express.static('static', options));
// app.use('/static', express.static('static')) //For serving static files
// app.use(express.urlencoded())


// //PUG specific stuff
// app.set('view engine', 'pug') //set the template engine as pug
// app.set('views', path.join(__dirname, 'views')) // Set the views directory
 


// //mongoose
// main().catch(err => console.log(err));

// async function main() {// for await keyword we need this async function
//   await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

//   //define mongoose schema

//   const contactSchema = new mongoose.Schema({
//     name: String,
//     phone:String,
//     email:String,
//     address:String,
//     desc:String,
//   });
//   const Contact = mongoose.model('Contact', contactSchema);

// }


// //ENDPOINTS: To be written on your own!
// // ENDPOINTS
// app.get('/', (req, res)=>{
   
//     const params = {}
//     res.status(200).render('home.pug', params);
// })
// app.get('/contact', (req, res)=>{
   
//     const params = {}
//     res.status(200).render('contact.pug', params);
// })


// app.post('/contact', (req, res)=>{
   
//     var myData= new Contact(req.body);
//     myData.save().then(()=>{
//       res.send("This item has been saved to the database ")
//     }).catch(()=>{
//       res.status(400).send("Item was not saved to the database")
//     });
//     //yeh data ko save karne ke saath saath ek promise return karega

//     // res.status(200).render('contact.pug', params);
// })






// // START THE SERVER
// app.listen(port, ()=>{
//     console.log(`The application started successfully on port ${port}`);
// });
