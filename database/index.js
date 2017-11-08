const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  //url - we don't want dups
  repoUrl: {type: String, required: true, unique: true},
  // username
  username: {type: String, required: true},
  //stars
  stars: {type: Number, required: true}
});

let Repo = connection.model('Repo', repoSchema);


//save function that creates an insance of our Repo model and saves it to the database
let save = (repoUrl, username, stars) => {
  let repo = new Repo({repoUrl: repoUrl, username: username, stars: stars});
  repo.save((err) => {
    if (err) {
      console.log(`error saving record: ${repoUrl}, ${username}, ${stars}`)
    }
  })
}

module.exports.save = save;