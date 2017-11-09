const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  repoUrl: {type: String, required: true, unique: true},
  username: {type: String},
  forks: {type: Number, required: true},
  avatar: {type: String, required: true},
  name: {type: String, required: true}
});

let Repo = mongoose.model('Repo', repoSchema);


//save function that creates an instance of our Repo model and saves it to the database
let save = (repoUrl, forks, avatar, name) => {
  let repo = new Repo({repoUrl: repoUrl, forks: forks, avatar: avatar, name: name});
  repo.save((err) => {
    if (err) {
      console.log(err);
    }
  })
}


let search = () => {
  var query = Repo.find({}).
  limit(25).
  sort({forks: -1}).
  select({name: 1, repoUrl: 1, avatar: 1, forks: 1});
  return query;
}


module.exports.save = save;
module.exports.search = search;