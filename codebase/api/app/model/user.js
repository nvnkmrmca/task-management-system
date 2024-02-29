const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
	number: String,
	name: String,
	age: Number,
	gender: String,
	mobileNo: String,
	emailId: String,
	password: String,
	role: String,
	cookId: { type: Schema.Types.ObjectId, default: null },
	image: String,
	isActive: Boolean,
	createdBy: { type: Schema.Types.ObjectId, default: null },
	updatedBy: { type: Schema.Types.ObjectId, default: null }
}, {
	timestamps: true
});

module.exports = mongoose.model('User', UserSchema);