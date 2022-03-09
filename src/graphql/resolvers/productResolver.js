const { Product, validateProdct } = require("../../models/product");
module.exports = {
  Query: {
    getAllProduct: async () => {
      console.log("entered getAllProduct");
      try {
        const result = await Product.find();
        return result.map((product) => {
          return { ...product._doc };
        });
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createProduct: async (_, args) => {
      console.log("enter createBranch");

      const { error } = validateBranch.validate(args.input);
      if (error) throw new Error(error.message);

      try {
        const productName = await Product.exists({
            productName: args.input.productName,
        }).exec();
        if (productName) throw new Error("product name already exists");

        const newProduct = new Branch({ ...args.input });

        const result = await newProduct.save();

        return { ...result._doc };
      } catch (error) {
        throw error;
      }
    },
    updateProduct: async (_, args) => {
      console.log("enter updateProduct");
      try {
        const result = await Product.findOneAndUpdate(
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
