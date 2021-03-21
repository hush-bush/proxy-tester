let optinons = {
  url: "http://www.google.com",
  proxy: "http://208.207.241.249:65073",
  time: true
};

const request = require('request');
request.get(optinons, (err, res) => {
    console.log(end)
  if (err) {
    console.log('ERROR', err);
  } else {
    console.log('OK', res.statusCode, res.elapsedTime);
  }
});