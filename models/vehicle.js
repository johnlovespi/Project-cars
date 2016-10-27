const fetch = require('node-fetch');
const CARS_URL = 'https://api.edmunds.com/api/vehicle/v2/'
const API_KEY = process.env.API_KEY;

function searchByName (req,res,next) {
  // console.log('body is' + req.query.carModel);
  fetch(`${CARS_URL}/${req.query.carModel}/?fmt=json&api_key=${API_KEY}`)
  // fetch(`${CARS_URL}/Aston+Martin/models?fmt=json&api_key=${API_KEY}`)//query parameters
// fetch(||`https://api.edmunds.com/api/vehicle/v2/||honda||/models?fmt=json&api_key=||xchu66cd5mehujzhruwasf66`)
  .then(r => r.json())
  .then((results) => {
   console.log(results);
    res.results = results;
    next();

  })
 .catch((err) => {
    console.log(err);
    res.err = err;
    next();
})
}

// function filterByColor(req, res, next) {
//   const unfiltered = res.results;
// //might need another url key for colors


// }

module.exports = {
  searchByName
  // filterByColor,
};


