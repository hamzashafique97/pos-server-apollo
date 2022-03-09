const { Company, validateCompany } = require("../../models/company");
module.exports = {
  Query: {
    getAllCompany: async () => {
      console.log("enter getAllCompany");
      try {
        const result = await Company.find();
        return result.map((company) => {
          return { ...company._doc };
        });
      } catch (error) {
        throw error;
      }
    },
    getCompanyById: async (_, args) => {
      console.log("enter getComapnyById");
      try {
        const result = await Company.findById({ _id: args.id });
        return { ...result._doc };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createCompany: async (_, args) => {
      console.log("enter createComapny");

      const { error } = validateCompany.validate(args.input);
      if (error) throw new Error(error.message);
      try {
        const companyName = await Company.exists({
          companyName: args.input.companyName,
        }).exec();
        if (companyName) throw new Error("company name already exists");

        const newCompany = new Company({ ...args.input });

        const result = await newCompany.save();

        return { ...result._doc };
      } catch (error) {
        throw error;
      }
    },
    updateCompany: async (_, args) => {
      console.log("enter updateCompany");
      try {
        const result = await Company.findOneAndUpdate(
          { _id: args.id },
          { ...args.input },
          { new: true }
        );
        return { ...result._doc };
      } catch (error) {
        throw error;
      }
    },
  },
};
