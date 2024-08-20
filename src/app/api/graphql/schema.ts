import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    wishlists: [Wishlist!]!
  }

  type Wishlist {
    id: ID!
    name: String!
    user: User!
    stocks: [Stock!]!
  }

  type Stock {
    id: ID!
    symbol: String!
    name: String!
    wishlists: [Wishlist!]!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    wishlists: [Wishlist!]!
    wishlist(id: ID!): Wishlist
    stocks: [Stock!]!
    stock(id: ID!): Stock
  }

  type Mutation {
    createUser(email: String!, password: String!, name: String): User!
    updateUser(id: ID!, email: String, name: String): User!
    deleteUser(id: ID!): User

    createWishlist(name: String!, userId: ID!): Wishlist!
    updateWishlist(id: ID!, name: String): Wishlist!
    deleteWishlist(id: ID!): Wishlist

    createStock(symbol: String!, name: String!): Stock!
    updateStock(id: ID!, name: String): Stock!
    deleteStock(id: ID!): Stock

    addStockToWishlist(wishlistId: ID!, stockId: ID!): Wishlist!
    removeStockFromWishlist(wishlistId: ID!, stockId: ID!): Wishlist!
  }
`;