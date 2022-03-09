const mongooose = require("mongoose");
const Joi = require("joi");

const brachSchema = new mongooose.Schema({
  branchName: { type: String, required: true },
  createdBy: {
    type: mongooose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  openingTiming: { type: String },
  closingTiming: {type: String,},
  isActive: {type: Boolean,},
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const validateBranch = Joi.object().keys({
    branchName: Joi.string().required(),
    createdBy: Joi.string().required(),
    openingTiming: Joi.string(),
    closingTiming: Joi.string(),
    isActive: Joi.boolean(),
    updatedBy: Joi.string(),
});

const Branch = mongooose.model("branch", brachSchema);

module.exports = { Branch, validateBranch };
