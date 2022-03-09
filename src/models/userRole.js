const mongooose = require("mongoose");
const Joi = require("joi");

const userRoleSchema = new mongooose.Schema({
  roleName: { type: String, required: true },
  menuAccess: { type: String, required: true },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

const validateUserRole = Joi.object().keys({
    roleName: Joi.string().required(),
    menuAccess: Joi.string().required(),
    createdBy: Joi.string(),
});

const UserRole = mongooose.model("userrole", userRoleSchema);

module.exports = { UserRole, validateUserRole };
