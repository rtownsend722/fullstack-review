const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  repoUrl: {type: String, required: true, unique: true},
  username: {type: String, required: true},
  stars: {type: Number, required: true}
});

let Repo = mongoose.model('Repo', repoSchema);


//save function that creates an instance of our Repo model and saves it to the database
let save = (repoUrl, username, stars) => {
  let repo = new Repo({repoUrl: repoUrl, username: username, stars: stars});
  repo.save((err) => {
    if (err) {
      console.log(err);
    }
  })
}


let search = () => {
  var query = Repo.find({}).
  limit(25).
  sort({stars: 1}).
  select({username: 1, repoUrl: 1});
  return query;
}


module.exports.save = save;
module.exports.search = search;