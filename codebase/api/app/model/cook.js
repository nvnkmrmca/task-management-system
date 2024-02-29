const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CookSchema = mongoose.Schema({
	name: String,
	address: String,
	mobileNo: String,
	emailId: String,
	isVeg: Boolean,
	images: [String],
	items: [Schema.Types.ObjectId],
	isActive: Boolean,
	createdBy: { type: Schema.Types.ObjectId, default: null },
	updatedBy: { type: Schema.Types.ObjectId, default: null }
}, {
	timestamps: true
});

module.exports = mongoose.model('Cook', CookSchema);