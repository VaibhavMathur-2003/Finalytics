'use client'

import { useState } from 'react'
import { useMutation, useQuery, gql } from '@apollo/client'

const CREATE_WISHLIST = gql`
  mutation CreateWishlist($name: String!, $userId: ID!) {
    createWishlist(name: $name, userId: $userId) {
      id
      name
    }
  }
`

const ADD_STOCK_TO_WISHLIST = gql`
  mutation AddStockToWishlist($wishlistId: ID!, $stockId: ID!) {
    addStockToWishlist(wishlistId: $wishlistId, stockId: $stockId) {
      id
      name
      stocks {
        id
        symbol
        name
      }
    }
  }
`

const GET_USER_WISHLISTS = gql`
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
        }
      }
    }
  }
`

const GET_STOCKS = gql`
  query GetStocks {
    stocks {
      id
      symbol
      name
    }
  }
`

export default function WishlistManager({ userId }: { userId: string }) {
  const [wishlistName, setWishlistName] = useState('')
  const [selectedWishlist, setSelectedWishlist] = useState('')
  const [selectedStock, setSelectedStock] = useState('')

  const { data: userData, refetch: refetchWishlists } = useQuery(GET_USER_WISHLISTS, {
    variables: { userId },
  })

  const { data: stocksData } = useQuery(GET_STOCKS)

  const [createWishlist] = useMutation(CREATE_WISHLIST, {
    onCompleted: () => {
      refetchWishlists()
      setWishlistName('')
    },
  })

  const [addStockToWishlist] = useMutation(ADD_STOCK_TO_WISHLIST, {
    onCompleted: () => {
      refetchWishlists()
      setSelectedStock('')
    },
  })

  const handleCreateWishlist = (e: React.FormEvent) => {
    e.preventDefault()
    if (wishlistName) {
      createWishlist({ variables: { name: wishlistName, userId } })
    }
  }

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedWishlist && selectedStock) {
      addStockToWishlist({
        variables: { wishlistId: selectedWishlist, stockId: selectedStock },
      })
    }
  }

  return (
    <div>
      <h2>Create Wishlist</h2>
      <form onSubmit={handleCreateWishlist}>
        <input
          value={wishlistName}
          onChange={(e) => setWishlistName(e.target.value)}
          placeholder="Wishlist Name"
          required
        />
        <button type="submit">Create Wishlist</button>
      </form>

      <h2>Add Stock to Wishlist</h2>
      <form onSubmit={handleAddStock}>
        <select
          value={selectedWishlist}
          onChange={(e) => setSelectedWishlist(e.target.value)}
          required
        >
          <option value="">Select a Wishlist</option>
          {userData?.user?.wishlists.map((wishlist: { id: string; name: string }) => (
            <option key={wishlist.id} value={wishlist.id}>
              {wishlist.name}
            </option>
          ))}
        </select>
        <select
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
          required
        >
          <option value="">Select a Stock</option>
          {stocksData?.stocks.map((stock: { id: string; symbol: string; name: string }) => (
            <option key={stock.id} value={stock.id}>
              {stock.symbol} - {stock.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Stock to Wishlist</button>
      </form>

      <h2>Your Wishlists</h2>
      {userData?.user?.wishlists.map((wishlist: { id: string; name: string; stocks: Array<{ id: string; symbol: string; name: string }> }) => (
        <div key={wishlist.id}>
          <h3>{wishlist.name}</h3>
          <ul>
            {wishlist.stocks.map((stock) => (
              <li key={stock.id}>{stock.symbol} - {stock.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}