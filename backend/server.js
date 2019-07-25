const express = require('express');
const app = express();
const PORT = 4000;
const bodyParser = require('body-parser');
const userRoutes = express.Router();
const mongoose = require('mongoose');
const User = require('./user.model');
const session = require('express-session');
const passport = require('passport');

app.listen(PORT, function(){
  console.log('SERVER IS RUNNING ON PORT: ' + PORT);
})

app.use(bodyParser.json())

app.use('/users', userRoutes);

app.use(
session({
  secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
  resave: false, //required
  saveUninitialized: false //required
})
)


mongoose.connect('mongodb://127.0.0.1:27017/users', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
  console.log('OMG A DATABASE')
})

userRoutes.route('/add').post(function(req, res) {
  console.log(req);
  let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});


passport.serializeUser((user, done) => {
	console.log('*** serializeUser called, user: ')
	console.log(user) // the whole raw user object!
	console.log('---------')
	done(null, { _id: user._id })
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
	console.log('DeserializeUser called')
	User.findOne(
		{ _id: id },
		'username',
		(err, user) => {
			console.log('*** Deserialize user, user:')
			console.log(user)
			console.log('--------------')
			done(null, user)
		}
	)
})
