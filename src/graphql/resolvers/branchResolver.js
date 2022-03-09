const { Branch, validateBranch } = require("../../models/branch");
module.exports = {
  Query: {
    getAllBranch: async () => {
      console.log("entered getAllComapny");
      try {
        const result = await Branch.find();
        return result.map((branch) => {
          return { ...branch._doc };
        });
      } catch (error) {
        throw error;
      }
    },
    getBranchById: async (_, args) => {
      console.log("entered getBranchById");
      try {
        const result = await Branch.findById({ _id: args.id });
        return { ...result._doc };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createBranch: async (_, args) => {
      console.log("enter createBranch");

      const { error } = validateBranch.validate(args.input);
      if (error) throw new Error(error.message);
      
      try {

        const newBranch = new Branch({ ...args.input });

        const result = await newBranch.save();

        return { ...result._doc };
      } catch (error) {
        throw error;
      }
    },
    updateBranch: async (_, args) => {
      console.log("enter updateBranch");
      try {
        const result = await Branch.findOneAndUpdate(
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
