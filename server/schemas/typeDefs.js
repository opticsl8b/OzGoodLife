const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    orders: [Order]
  }

  type Category {
    _id: ID
    name: String
    image: String
  }

  type Product {
    _id: ID!
    title: String!
    description: String
    image: String
    quantity: Int
    price: Int
    category: Category
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
    categories: [Category]
    products(category: ID!, title: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth

    addOrder(products: [ID]!): Order

    updateUser(
      username: String
      email: String
      password: String
    ): User

    updateProduct(_id: ID!, quantity: Int!): Product
  }
`;

module.exports = typeDefs;
