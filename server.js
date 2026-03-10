require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/booking', (req, res) => {
  res.sendFile(path.join(__dirname, 'booking.html'));
});

app.get('/landscaping', (req, res) => {
  res.render('landscaping', { services: landscapingServices });
});

const landscapingServices = [];

app.post('/api/landscaping', (req, res) => {
  const { serviceType, date, notes } = req.body;
  const newService = { serviceType, date, notes };
  landscapingServices.push(newService);
  res.status(201).json(newService);
});

app.get('/api/landscaping', (req, res) => {
  res.json(landscapingServices);
});

app.get('/api/landscaping/search', (req, res) => {
  const { serviceType, date } = req.query;
  let filteredServices = landscapingServices;

  if (serviceType) {
    filteredServices = filteredServices.filter(service => service.serviceType === serviceType);
  }

  if (date) {
    filteredServices = filteredServices.filter(service => service.date === date);
  }

  res.json(filteredServices);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
