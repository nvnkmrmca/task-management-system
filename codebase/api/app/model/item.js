const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ItemSchema = mongoose.Schema({
	cookId: { type: Schema.Types.ObjectId, default: null },
	name: String,
	description: String,
	price: Number,
	discount: Number,
	images: [String],
	isActive: Boolean,
	createdBy: { type: Schema.Types.ObjectId, default: null },
	updatedBy: { type: Schema.Types.ObjectId, default: null }
}, {
	timestamps: true
});

module.exports = mongoose.model('Item', ItemSchema);