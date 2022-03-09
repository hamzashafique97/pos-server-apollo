const { User, validateUser } = require("../../models/user");
const bcrypt = require("bcrypt");
const JwtService = require("../../services/jwtService");
module.exports = {
  Query: {
    getAllUser: async () => {
      try {
        const result = await User.find();
        return result.map((user) => {
          return { ...user._doc };
        });
      } catch (error) {
        throw error;
      }
    },
    login: async (_, args, { res }) => {
      console.log("enter login");
      // Validation
      // const authSchema = validateUser.fork(["name", "userType"], (schema) =>
      //   schema.optional()
      // );
      // const { error } = authSchema.validate(args.input);
      // if (error) throw new Error(error.message);

  
      try {
        const user = await User.findOne({ userName: args.userName });
        if (!user) throw new Error("User not found");
  
        const isMatch = await bcrypt.compare(args.password, user.password);
        if (!isMatch) throw new Error("Password is incorrect");
        
        const access_token = JwtService.sign({
          userId: user._id,
        });
        console.log(access_token);
        res.cookie("jwt", access_token, { httpOnly: true });
        return { ...user._doc };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      console.log("enter createUser");

      const { error } = validateUser.validate(args.input);
      if (error) throw new Error(error.message);

      try {
        const username = await User.exists({
          userName: args.input.userName,
        }).exec();
        if (username) throw new Error("username already exists");

        args.input.password = await bcrypt.hash(args.input.password, 10);

        const newUser = new User({ ...args.input });

        const result = await newUser.save();

        return { ...result._doc };
      } catch (error) {
        throw error;
      }
    },
    updateUser: async (_, args) => {
      console.log("enter updateUser");
      try {
        args.input.password = await bcrypt.hash(args.input.password, 10);

        const result = await User.findOneAndUpdate(
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
