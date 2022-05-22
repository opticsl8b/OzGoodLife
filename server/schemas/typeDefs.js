const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    orders: [Order]
  }

  type Product {
    _id: ID!
    title: String!
    description: String
    image: String
    quantity: Int
    price: Int
    category: String
  }

  type Order {
    _id: ID!
    purchaseDate: String
    products: [Product]
  }

  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    
    products(category: ID!, title: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    
    addUser(
      username: String!
      email: String!
      password: String!
    ): Auth
    
    addOrder(products: [ID]!): Order
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    updateProduct(_id: ID!, quantity: Int!): Product
  }
`;

module.exports = typeDefs;
