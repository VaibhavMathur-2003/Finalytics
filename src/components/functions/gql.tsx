import { gql } from "@apollo/client";

export const CREATE_WISHLIST = gql`
  mutation CreateWishlist($name: String!, $userId: ID!) {
    createWishlist(name: $name, userId: $userId) {
      id
      name
    }
  }
`;

export const CREATE_STOCK = gql`
  mutation CreateStock($symbol: String!, $name: String!, $quantity: Float!) {
    createStock(symbol: $symbol, name: $name, quantity: $quantity) {
      id
    }
  }
`;

export const ADD_STOCK_TO_WISHLIST = gql`
  mutation AddStockToWishlist($wishlistId: ID!, $stockId: ID!) {
    addStockToWishlist(wishlistId: $wishlistId, stockId: $stockId) {
      id
      name
      stocks {
        id
        symbol
        name
        quantity
      }
    }
  }
`;

export const GET_USER_WISHLISTS = gql`
  query GetUserWishlists($userId: ID!) {
    user(id: $userId) {
      id
      wishlists {
        id
        name
        stocks {
          id
          symbol
          name
          quantity
        }
      }
    }
  }
`;
export const DELETE_WISHLIST = gql`
  mutation DeleteWishlist($id: ID!) {
    deleteWishlist(id: $id) {
      id
    }
  }
`;

export const REMOVE_STOCK_FROM_WISHLIST = gql`
  mutation RemoveStockFromWishlist($wishlistId: ID!, $stockId: ID!) {
    removeStockFromWishlist(wishlistId: $wishlistId, stockId: $stockId) {
      id
      stocks {
        id
        symbol
        name
        quantity
      }
    }
  }
`;

export const GET_WISHLIST = gql`
  query GetWishlist($id: ID!) {
    wishlist(id: $id) {
      id
      name
      stocks {
        id
        symbol
        name
        quantity
      }
    }
  }
`;