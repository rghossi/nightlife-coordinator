import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const UserSchema = new Schema({
	name: { type: String, trim: true },
	facebookId: { type: String, unique: true },
	createdAt: { type: Date, default: Date.now },
	email: String,
	facebookToken: String
});

export default Mongoose.model('User', UserSchema);