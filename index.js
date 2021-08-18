const Twitter = require('twitter');
require('dotenv').config()
const express = require("express");
const app = express()
const needle = require('needle');
const cors = require("cors");
var Twit = require('twit');
const { json } = require('express');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCES_TOKEN_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: true,
});

let tweetData;
// 変更前
// const searchEvent = () => {
  
//   T.get('search/tweets', { q: ['web', 'job'], count: 5, language: 'en'}, function (err, data, response) {
//     tweetData = data;
//     // console.log(tweetData)
//     console.log("test", data.statuses[0].created_at);
//   })
// }
const searchEvent = async() => {
  
  T.get('search/tweets', { q: ['web', 'job'], count: 5, language: 'en'}, await function (err, data, response) {
    tweetData = data;
    // console.log(tweetData)
    // console.log("test", data.statuses[0].created_at);
  })
  return tweetData
}

let clientSearch = ["web", "job"]

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

let searchData = {}
const getsearchResult = (input) => {
  T.get('search/tweets', { q: input, count: 2 },function(err, data, response) {
    searchData = data;
  })
  return searchData
}



app.get('/', async(req, res) => {
  console.log("HI: ",  getsearchResult(clientSearch));
  const resultData =  await getsearchResult(clientSearch);
  // resultData()
  // res.json(tweetData)
  console.log("resultData: ", resultData);
  res.json(resultData)
  // console.log(tweetData)
})

app.post('/search', (req, res) => {
  console.log(req.body);
  clientSearch = req.body.input
  console.log(clientSearch)
  getsearchResult(clientSearch)
})

// app.get('/update', async(req, res) => {
//   await searchEvent()
//   console.log("TEST WEB TWEET:" , tweetData)
//   res.json(tweetData)
// })

app.get('/update', async(req, res) => {
  const webJpbData = await searchEvent()
  console.log("TEST WEB TWEET:" , webJpbData)
  res.json(webJpbData)
})
const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`The server has  started on port: ${PORT}`))

// const client = new Twitter({
  //     consumer_key: process.env.TWITTER_API_KEY,
  //     consumer_secret: process.env.API_SECRET_KEY,
  //     access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  //     access_token_secret: process.env.TWITTER_ACCES_TOKEN_SECRET,
  //     bearer_token: process.env.BEARER_TOKEN
  //   });
  
  
  //   client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
    //     stream.on('data', function(event) {
      //       console.log(event && event.text);
      //     });
      
      //     stream.on('error', function(error) {
        //       throw error;
        //     });
        //   });
        
        //   client.stream('statuses/filter', {track: 'code'},  function(stream) {
          //     stream.on('data', function(tweet) {
            //       console.log(tweet.text);
            //     });
            
            //     stream.on('error', function(error) {
              //       console.log(error);
              //     });
              //   });
              
              //   client.get('search/tweets', {q: 'olympic'}, function(error, tweets, response) {
                //     console.log(tweets);
                //     // console.log(response);
                //  });
                
                //  client.stream('statuses/filter', {track: 'olympic'},  function(stream) {
                  //     stream.on('data', function(tweet) {
                    //       console.log(tweet.text);
                    //     });
                    
                    //     stream.on('error', function(error) {
                      //       console.log(error);
                      //     });
                      //   });

                      // var stream = T.stream('statuses/filter', { track: ['#vancouver', '#event'], language: 'en'})
                      
                      // stream.on('tweet', function (tweet) {
                        //   // tweetData = tweet; 
                        //   // console.log(tweetData)
                        //   console.log('stream', tweet);
                        // })