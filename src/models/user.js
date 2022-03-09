const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    companyId: [{ type: mongoose.Schema.Types.ObjectId, ref: "company" }],
    branchId: [{ type: mongoose.Schema.Types.ObjectId, ref: "branch" }],
    userRole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userRole",
    },
    indivisualAccess: [{ type: String }],
    lastLogedIn: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const validateUser = Joi.object().keys({
  userName: Joi.string().required(),
  password: Joi.string().required(),
  companyId: Joi.array(),
  branchId: Joi.array(),
  userRole: Joi.string(),
  indivisualAccess: Joi.array(),
  lastLogedIn: Joi.date(),
  createdBy: Joi.string(),
});

const User = mongoose.model("user", userSchema);

module.exports = { User, validateUser };
