const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ItemSchema = mongoose.Schema({
	itemId: Schema.Types.ObjectId,
	count: Number
});

const PaymentSchema = mongoose.Schema({
	type: String,
	amount: Number,
	discount: Number,
	isPaid: Boolean,
	createdBy: { type: Schema.Types.ObjectId, default: null },
	updatedBy: { type: Schema.Types.ObjectId, default: null }
}, {
	timestamps: true
});

const feedbackSchema = mongoose.Schema({
	stars: Number,
	description: Number
});

const OrderSchema = mongoose.Schema({
	_userId: Schema.Types.ObjectId,
	_cookId: Schema.Types.ObjectId,
	_deliveryBoyId: { type: Schema.Types.ObjectId, default: null },
	number: String,
	address: String,
	status: String,
	isDelivered: Boolean,
	expectedDeliveryAt: Date,
	DeliveredAt: Date,
	items: [ItemSchema],
	payment: PaymentSchema,
	feedback: feedbackSchema,
	createdBy: { type: Schema.Types.ObjectId, default: null },
	updatedBy: { type: Schema.Types.ObjectId, default: null }
}, {
	timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);