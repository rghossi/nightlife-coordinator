import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';
import User from '../src/models/user';

chai.use(chaiHttp);
const should = chai.should();

describe('routes : users', () => {

  beforeEach((done) => {
    User.remove({}, function(err) { 
    	if (err) throw err;
		done();
	});
  });

  describe('GET /api/users/:id', () => {
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
		    	console.log(typeof res.body._id, typeof user._id);
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
				res.body._id.should.equal(user._id.toString());
				done();
		    });
	  	})
	  });

	  it('should return 404 for inexistent id', (done) => {
	  	chai.request(server)
	    .get('/api/users/539e1188acf9bd185dac729c')
	    .end((err, res) => {
	    	res.should.have.status(404);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.have.property('message');
			done();
	    });
	  });

	  it('should return 400 for invalid id', (done) => {
	  	chai.request(server)
	    .get('/api/users/invalidId')
	    .end((err, res) => {
	    	res.should.have.status(400);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.have.property('message');
			done();
	    });
	  });
  });

  describe('PUT /api/users/:userId', () => {
	  it('should replace going array in single user', (done) => {
	  	let newUser = new User({
	  		name: "Dummy User",
	  		facebookId: "dummyid10191",
	  		email: "dummy@dummy.com",
	  		facebookToken: "473814728023-d32d1",
	  		going: ["209eh10hd239-dj293j"]
	  	});
	  	newUser.save((err, user) => {
	  		if (err) throw err;
  			let places = user.going;
  			places.push("HAEUHAUHEUAHUEHAUAE");
  			chai.request(server)
		    .put('/api/users/' + user._id)
		    .send({going: places})
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
				res.body.going.should.equal(places);
				res.body._id.should.equal(user._id);
				done();
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

	  it('should return 400 for wrong going field type', (done) => {
	  	let newUser = new User({
	  		name: "Dummy User",
	  		facebookId: "dummyid10191",
	  		email: "dummy@dummy.com",
	  		facebookToken: "473814728023-d32d1"
	  	});
	  	newUser.save((err, user) => {
	  		chai.request(server)
		    .put('/api/users/' + user._id)
		    .send({going: 12422})
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