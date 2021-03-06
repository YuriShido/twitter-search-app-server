require('dotenv').config()
const express = require("express");
const app = express()
const cors = require("cors");
var Twit = require('twit');
const { json } = require('express');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.all('/', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", ["http://localhost:3000","https://find-web-job-tweets.netlify.app"]);
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next()
// });

const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCES_TOKEN_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: true,
});

// let tweetData;

const searchEvent = async() => {
  
    return T.get('search/tweets', { q: 'web job' , count: 100, language: 'en'}).then((response) => {
      return response.data
    }).catch((err) => console.log(err))
  // return tweetData
}

let clientSearch = "web job"

const getsearchResult = (input) => {
  
  return T.get('search/tweets', { q: input, count: 100, language: 'en', skip_status: true }).then((response) => {
    // console.log(response.data);
    return response.data
  }).catch((err) => console.error(err))
}


app.get('/', async(req, res) => {
  // console.log("HI: ",  getsearchResult(clientSearch));
  const resultData =  await getsearchResult(clientSearch);
  res.json(resultData)
  
})

app.post('/search', (req, res) => {
  console.log(req.body);
  clientSearch = req.body.inputValue
  console.log(clientSearch)
  getsearchResult(clientSearch)
})

app.get('/update', async(req, res) => {
  const webJpbData = await searchEvent()
  console.log("TEST WEB TWEET:" , webJpbData)
  res.json(webJpbData)
})
const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`The server has  started on port: ${PORT}`))


// const searchUserInput = (input) => {
//   try {
    
//     console.log("check", input);
//     T.get('search/tweets', { q: input, count: 2 }).then(function (data) {
//       console.log(data.data);
//       // resultData = {...data}
//       // tempRes = {...data}
//       // return data
//       // console.log(data);
//       // console.log('result', resultData);
//     }).then(res => console.log("RES", res))
//     // return resData
//   } catch (error) {
//     console.log(error);
//   }
// }
