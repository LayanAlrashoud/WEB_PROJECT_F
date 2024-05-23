const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to the database'))
  .catch((error) => console.error('Error connecting to the database', error));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to the database'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(express.static('uploads'));
app.set('view engine', 'ejs');

// تعيين الصفحة الرئيسية
app.get('/', (req, res) => {
    res.render('index');
});

// استخدام التوجيهات الإدارية تحت /admin
app.use('/admin', require('./routes/admin'));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});