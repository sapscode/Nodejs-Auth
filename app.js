const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());

// middleware
app.use(express.static('public'));
// view engine
app.set('view engine', 'ejs');

// cookie parser
app.use(cookieParser());

// database connection
const dbURI = 'mongodb+srv://saps_db:test1234@cluster0.tw24n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true 
})
  .then(() => app.listen(3000, () => console.log(`connected to port 3000`)))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);