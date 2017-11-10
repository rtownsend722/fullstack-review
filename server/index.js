const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const db = require('../database/index.js');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', (req, res) => {
  getReposByUsername(req.body.username, function(response, err) {
    if (err) {
      res.sendStatus(404);
    }
    response.forEach((item, index) => {
      db.save(item.html_url, item.forks, item.owner.avatar_url, item.name);
    });
    //send back total new records added
    res.status(201).send(JSON.stringify(response.length));
  });
});

app.get('/repos', function (req, res) {
  var reposData = db.search();
  reposData.exec(function(err, repos) {
    if (err) {
      return console.log(err);
    }
    res.status(200).send(repos);
  });
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

