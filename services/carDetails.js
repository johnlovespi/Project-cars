const fetch = require('node-fetch');
const CARS_URL = 'https://api.edmunds.com/api/vehicle/v2/makes?';

function cars (req,res,next ) {
  fetch(`${CARS_URL}year=${req.body.year}&state=${req.body.state || 'new', 'used'}`)//query parameters
  .then((apiResponse) => {
    return apiResponse.json();
  }).then((json) => {
    console.log(json.results);
    res.results = json.results;
    next();
  });
}
module.exports = { cars };

