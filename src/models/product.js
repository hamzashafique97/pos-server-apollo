const mongooose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongooose.Schema({
  barcode: { type: String, required: true },
  compId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "company",
  },
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productType: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "user" },
  updatedBy: { type: Schema.Types.ObjectId, ref: "user" },
});

const validateProdct = Joi.object().keys({
    barcode: Joi.string().required(),
    compId: Joi.string().required(),
    productName: Joi.string().required(),
    productPrice: Joi.number().required(),
    productType: Joi.string().required(),
    createdBy: Joi.string().required(),
    updatedBy: Joi.string().required(),
});

const Product = mongooose.model("product", productSchema);

module.exports = { Product, validateProdct };
