// const fetch = require('node-fetch');
// const BG_KEY = process.env.APP_KEY;
// const API_URL = `https://api.unsplash.com/photos/random/?client_id=${BG_KEY}`
// // const APP_SECRET =  process.env.MOMENTUM_APP_SECRET;
// //app_key from env

// function getRandomImage(req, res, next) {
//   console.log('LINKED');
//   fetch(`${API_URL}`)
//   .then(r => r.json())
//   .then(result => {
//     res.image = result;
//     next();
//   })
//   .catch(err => {
//     console.log('Error ', err);
//     next();
//   })
// }

// module.exports = { getRandomImage };
