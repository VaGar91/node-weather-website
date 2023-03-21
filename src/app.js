const path = require('path');

const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geoCode = require('./utils/geocode');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Víctor García'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Víctor García'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me',
        name: 'Víctor García'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }

    const location = req.query.address;

    geoCode(location, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({
                error: error
            });
        }
            forecast(latitude, longitude, (error, dataForecast) => {
                if(error){
                    return res.send({
                        error: error
                    });
                }

                res.send({
                    forecast: dataForecast,
                    location,
                    address: req.query.address
                });
            });
    });

    
});

app.get('/help/*',(req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404 page',
        name: 'Víctor García'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404 page',
        name: 'Víctor García'
    })
})

app.listen(3000, () => {
    console.log('Server up successfully');
});
