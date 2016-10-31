const fetch = require('node-fetch');
const CARS_URL = 'https://api.edmunds.com/api/vehicle/v2/'
const MEDIA_CAR = 'https://media.ed.edmunds-media.com'
// const CAR_PHOTO = 'https://api.edmunds.com/api/media/v2/photoset?'
const API_KEY = process.env.API_KEY;

//grabbing objects from databass
const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');

const { getDB } = require('../lib/dbConnect');


function searchByName (req,res,next) {
  // console.log('body is' + req.query.carModel);
  fetch(`${CARS_URL}/${req.query.carModel}/${req.query.carMake}/2015?fmt=json&api_key=${API_KEY}`)
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


//save function cars
function saveFavorite(req, res, next) {
  console.log('here');
  const insertObj = {};
  for(key in req.body) {
    insertObj[key] = req.body[key];
  }
insertObj.favorites = req.session;
    getDB().then((db) => {
      db.collection('favorites')
      .insert(insertObj.favorites, (insertErr, result) => {
         if (insertErr) return next(insertErr);
      res.favorites = result;
      db.close();
      next();

    })
    return false;
  });
  return false;
}

//button to get cars
function getFavorites(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);
  db.collection('favorites')
      .find({})
      .toArray((arrayError, data) => {
        if (arrayError) return next(arrayError);

        // return the data
        res.favorites = data;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}



//deleting from favortite function
function deleteFavorite(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

    db.collection('favorites')
      .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, doc) => {
        if (removeErr) return next(removeErr);

        // return the data
        res.removed = doc;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}


// function filterByimage (req, res, next) {
// fetch(`${MEDIA_CAR}/${req.query.carModel}&/${req.query.carModel}?api_key=${API_KEY}`)
//  .then(r => r.json())
//   .then((car_photo) => {
//    console.log(car_photo);
//     res.car_photo = car_photo;
//     next();
// })
//  .catch((err) => {
//     console.log(err);
//     res.err = err;
//     next();
// })
// }

module.exports = {
  searchByName,
  // filterByimage,
  getFavorites,
  saveFavorite,
  deleteFavorite,
};


