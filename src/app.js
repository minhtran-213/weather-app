const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Home',
    name: 'MinhTran',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'MinhTran',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'help me',
    title: 'Help',
    name: 'MinhTran',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a search term',
    });
  } else {
    geocode(req.query.address, (error, data) => {
      if (error) {
        res.send({
          error: error,
        });
        return;
      }

      forecast(data.latitude, data.longtitude, (error, forecastData = {}) => {
        if (error) {
          res.send({
            error: error,
          });
        } else {
          res.send({
            location: data.location,
            forecast: forecastData,
            address: req.query.address,
          });
        }
      });
    });
  }
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'MinhTran',
    errorMessage: 'Help content not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'MinhTran',
    errorMessage: 'Page not found',
  });
});

app.listen(3000, () => {
  console.log('Server starts at port 3000');
});
