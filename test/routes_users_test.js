import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';
import User from '../src/models/user';

chai.use(chaiHttp);
process.env.NODE_ENV = 'test';
const should = chai.should();

describe('routes : users', () => {

  beforeEach((done) => {
    User.remove({}, function(err) { 
    	if (err) throw err;
		done();
	});
  });

  describe('GET /api/users/:userId', () => {
	  it('should GET a single user', (done) => {
	  	var newUser = new User({
	  		name: "Dummy User",
	  		facebookId: "dummyid10191",
	  		email: "dummy@dummy.com",
	  		facebookToken: "473814728023-d32d1"
	  	});
	  	newUser.save((err, user) => {
	  		if (err) throw err;
	  		chai.request(server)
		    .get('/api/users/' + user._id)
		    .end((err, res) => {
		    	if (err) throw err;
		    	res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('_id');
				res.body.should.have.property('name');
				res.body.should.have.property('email');
				res.body.should.have.property('facebookId');
				res.body.should.have.property('going');
				res.body.name.should.equal('Dummy User');
				res.body.email.should.equal('dummy@dummy.com');
				res.body._id.should.equal(user._id);
				done();
		    });
	  	})
	  });

	  it('should return 404 for invalid id', (done) => {
	  	chai.request(server)
	    .get('/api/users/invalidId')
	    .end((err, res) => {
	    	if (err) throw err;
	    	res.should.have.status(404);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.have.property('message');
			done();
	    });
	  });
  });

  describe('PUT /api/users/:userId', () => {
	  it('should put a new place id in single user', (done) => {
	  	let newUser = new User({
	  		name: "Dummy User",
	  		facebookId: "dummyid10191",
	  		email: "dummy@dummy.com",
	  		facebookToken: "473814728023-d32d1"
	  	});
	  	let placeId = "209eh10hd239-dj293j";
	  	newUser.save((err, user) => {
	  		if (err) throw err;
	  		User.findById(user._id, (err, user) => {
	  			if (err) throw err;
	  			let places = user.going || [];
	  			places.push(placeId);
	  			user.set('going', places);
	  			user.save((err, user) => {
	  				if (err) throw err;
			  		chai.request(server)
				    .put('/api/users/' + user._id)
				    .send({placeId})
				    .end((err, res) => {
				    	if (err) throw err;
				    	res.should.have.status(200);
						res.should.be.json;
						res.body.should.be.a('object');
						res.body.should.have.property('_id');
						res.body.should.have.property('name');
						res.body.should.have.property('email');
						res.body.should.have.property('facebookId');
						res.body.should.have.property('going');
						res.body.going.should.be.a('array');
						res.body.going.should.equal([placeId]);
						res.body._id.should.equal(user._id);
						done();
				    });
	  			})
	  		});
	  	})
	  });

	  it('should return 404 for invalid user', (done) => {
	  	chai.request(server)
	    .put('/api/users/invalidId')
	    .end((err, res) => {
	    	if (err) throw err;
	    	res.should.have.status(404);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.have.property('message');
			done();
	    });
	  });

	  it('should return 400 for wrong placeId type', (done) => {
	  	let newUser = new User({
	  		name: "Dummy User",
	  		facebookId: "dummyid10191",
	  		email: "dummy@dummy.com",
	  		facebookToken: "473814728023-d32d1"
	  	});
	  	newUser.save((err, user) => {
	  		chai.request(server)
		    .put('/api/users/' + user._id)
		    .send({placeId: 12422})
		    .end((err, res) => {
		    	if (err) throw err;
		    	res.should.have.status(400);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('message');
				done();
		    });
	  	});
	  });
  });

});