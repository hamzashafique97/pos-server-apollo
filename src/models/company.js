const mongooose = require("mongoose");
const Joi = require("joi");

const companySchema = new mongooose.Schema(
  {
    companyName: { type: String, required: true },
    createdBy: {
      type: mongooose.Schema.Types.ObjectId,
      ref: "user",
    },
    updatedBy: {
      type: mongooose.Schema.Types.ObjectId,
      ref: "user",
    },
    imageurl: { type: String, required: true },
    paper: { type: String, required: true },
    defaultColor: { type: String, required: true },
    light: { type: String, required: true },
    main: { type: String, required: true },
    dark: { type: String, required: true },
    logo: { type: String, required: true },
    isActive: { type: Boolean },
    isDarkMode: { type: Boolean },
  },
  { timestamps: true }
);

const validateCompany = Joi.object().keys({
  companyName: Joi.string().required(),
  createdBy: Joi.string(),
  updatedBy: Joi.string(),
  imageurl: Joi.string().required(),
  paper: Joi.string().required(),
  defaultColor: Joi.string().required(),
  light: Joi.string().required(),
  main: Joi.string().required(),
  dark: Joi.string().required(),
  logo: Joi.string().required(),
  isActive: Joi.boolean(),
  isDarkMode: Joi.boolean(),
});

const Company = mongooose.model("company", companySchema);

module.exports = { Company, validateCompany };
