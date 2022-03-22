const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const mongoose = require('mongoose')
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { getMaxListeners } = require('process');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('623a04b8d6327533e8a4a069')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err)); 
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://ayush:aZNSrLNh6ZqR8Vbb@cluster0.clqvv.mongodb.net/shop?retryWrites=true&w=majority')
.then((result)=>{
  User.findOne().then((user)=>{
    if(!user){
      const user = new User({
        name:'Ayush',
        email:'asharma619@gmail.com',
        cart:{
          items:[]
        }
      })
      user.save()
    }
    
  })
  
  app.listen(3000)
}).catch((err)=>{
  console.log(err)
})
