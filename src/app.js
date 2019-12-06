const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const requiredLocations = require('./utils/pharmacyLocations')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Pharmacy locator',
        name: 'Charan Ravela'
    })
})

app.get("/search", (req, res)=>{
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
       requiredLocations(
        latitude,
        longitude,
        (error, { results, name, rating, vicinity }) => {
          if (error) {
            return res.send({ error });
          }
          const fResults = results.map(x => {
              return {name:x.name, rating:x.rating,vicinity: x.vicinity}
          })
          res.render('view.hbs',{data:JSON.parse(JSON.stringify(fResults))});

        }
      );
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',	
        name: 'charan',
        errorMessage:'Page not found.'
    })
})

app.listen(port, () =>{
  console.log('Server is up on port '+ port)
})