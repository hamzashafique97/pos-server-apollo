const { gql } = require("apollo-server-express");

const schema = gql`
  
  scalar Date

  type User {
    _id: ID!
    userName: String!
    password: String!
    companyId: [String]
    branchId: [String]
    userRole: String!
    indivisualAccess: [String]
    lastLogedIn: Date
    createdBy: String
  }

  input UserInput {
    userName: String!
    password: String!
    companyId: String
    branchId: String
    userRole: String
    indivisualAccess: String
    lastLogedIn: Date
    createdBy: String
  }

  type UserRole {
    _id: ID!
    roleName: String!
    menuAccess: String!
    createdBy: String!
  }

  input UserRoleInput {
    roleName: String!
    menuAccess: String!
    createdBy: String!
  }

  type Company {
    _id: ID!
    companyName: String!
    createdBy: String
    updatedBy: String
    imageurl: String!
    paper: String!
    defaultColor: String!
    light: String!
    main: String!
    dark: String!
    logo: String!
    isActive: Boolean
    isDarkMode: Boolean
  }

  input CompanyInput {
    companyName: String!
    createdBy: String
    updatedBy: String
    imageurl: String!
    paper: String!
    defaultColor: String!
    light: String!
    main: String!
    dark: String!
    logo: String!
    isActive: Boolean
    isDarkMode: Boolean
  }

  type Branch {
    _id: ID!
    branchName: String!
    createdBy: String!
    openingTiming: String
    closingTiming: String
    isActive: Boolean!
    updatedBy: String!
  }

  input BranchInput {
    branchName: String!
    createdBy: String!
    openingTiming: String
    closingTiming: String
    isActive: Boolean!
    updatedBy: String!
  }

  type Product {
    _id: ID!
    barcode: String!
    compId: String!
    productName: String!
    productPrice: Int!
    productType: String!
    createdBy: String!
    updatedBy: String!
  }

  input ProductInput {
    barcode: String!
    compId: String!
    productName: String!
    productPrice: Int!
    productType: String!
    createdBy: String!
    updatedBy: String!
  }

  type Query {
    getAllUser: [User!]!
    login(userName: String!, password: String!): User!

    getUserRole: [UserRole!]!

    getAllCompany: [Company!]!
    getCompanyById(id: ID!): Company!

    getAllBranch: [Branch]!
    getBranchById(id: ID!): Branch!

    getAllProduct: [Product!]!
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User

    createUserRole(input: UserRoleInput): UserRole
    updateUserRole(id: ID!, input: UserRoleInput): UserRole

    createCompany(input: CompanyInput): Company
    updateCompany(id: ID!, input: CompanyInput): Company

    createBranch(input: BranchInput): Branch
    updateBranch(id: ID!, input: BranchInput): Branch

    createProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
  }
`;

module.exports = schema;
