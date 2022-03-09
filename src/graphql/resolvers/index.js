const userResolver = require("./userResolver");
const companyResolver = require("./companyResolver");

const rootResolver = {
  ...userResolver,
  ...companyResolver,
};

module.exports = rootResolver;
