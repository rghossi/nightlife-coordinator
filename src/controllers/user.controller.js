import User from '../models/user';

export function getUser(req, res) {
    User.findById(req.params.id, (err, user) => {
        if (err && err.name === 'CastError'){
            res.status(400).send({message: "Invalid user id!"});
        } else if (err){
            throw err;
        } else {
            if (!user) res.status(404).send({message: "User not found"});
            else res.json(user);
        }
    })
}

export function logout(req, res) {
	req.logout();
	res.redirect('/');
}

export function facebookCallback(accessToken, refreshToken, profile, cb) {
	User.findOne({ facebookId: profile.id }, function (err, user) {
		if (err)
            return cb(err);
        if (user) {
            return cb(null, user);
        } else {
            var newUser = new User();
            newUser.facebookId = profile.id;                
            newUser.facebookToken = profile.token;
            newUser.name = profile.displayName;
            newUser.email = profile.emails[0].value;

            newUser.save(function(err) {
                if (err)
                    throw err;
                return cb(null, newUser);
            });
        }
	});
}

export function serialize(user, cb){
    cb(null, user.id);
}

export function deserialize(id, cb){
    User.findById(id, function(err, user) {
        cb(err, user);
    })
}