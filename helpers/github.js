const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username) => {

  let options = {
    url: 'https://api.github.com/users/' + username,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get(options, (err, res, body) => {
    if (err) {
      console.log('encountered error ', err);
    }
    //return data??
    console.log(res);
  });

}

module.exports.getReposByUsername = getReposByUsername;