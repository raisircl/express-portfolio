const path = require('path');
const express = require('express');
//const morgan = require('morgan');
//const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// Security & logs
//app.use(helmet());
//app.use(morgan('dev'));

// Parsers
app.use(express.urlencoded({ extended: true })); // form posts
app.use(express.json()); // json

// Static
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
const siteRoutes = require('./routes/site.routes');
app.use('/', siteRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('pages/404', { title: '404', page: '404', error: 'Page not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).render('pages/404', { title: 'Error', page: 'error', error: 'Something went wrong' });
});

const PORT = process.env.PORT || 3600;
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
