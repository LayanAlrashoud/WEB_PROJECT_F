
require('dotenv').config();
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
console.log('GOOGLE_CALLBACK_URL:', process.env.GOOGLE_CALLBACK_URL);

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const authRoutes = require('./auth');
const adminRoutes = require('./routes/admin');
const isAdmin = require('./middleware/isAdmin');
const noraRoutes = require('./routes/nora');
const imamRoutes = require('./routes/imam');
const saudRoutes = require('./routes/saud');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to the database'))
  .catch((error) => console.error('Error connecting to the database', error));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to the database'));

// Middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.DB_URI })
}));
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use('/nora', noraRoutes);
app.use('/imam', imamRoutes);
app.use('/saud', saudRoutes);
// Static files
app.use(express.static('uploads'));
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.use('/admin', isAdmin, adminRoutes);
app.use(authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



