const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ItemSchema = mongoose.Schema({
	itemId: Schema.Types.ObjectId,
	count: Number
});

const CartSchema = mongoose.Schema({
	userId: Schema.Types.ObjectId,
	cookId: Schema.Types.ObjectId,
	items: [ItemSchema],
	description: String,
	createdBy: { type: Schema.Types.ObjectId, default: null },
	updatedBy: { type: Schema.Types.ObjectId, default: null }
}, {
	timestamps: true
});

module.exports = mongoose.model('Cart', CartSchema);