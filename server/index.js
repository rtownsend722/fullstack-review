const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const db = require('../database/index.js');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', (req, res) => {
  getReposByUsername(req.body.username, function(res, err) {
    if (err) {
      res.sendStatus(404);
    }
    res.forEach((item) => {
      db.save(item.html_url, item.forks, item.owner.avatar_url, item.name);
    });
  });
  res.sendStatus(201);
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

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

