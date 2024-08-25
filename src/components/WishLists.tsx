"use client";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"


import { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import stocksData from "../../public/assets/stocks.json";

const CREATE_WISHLIST = gql`
  mutation CreateWishlist($name: String!, $userId: ID!) {
    createWishlist(name: $name, userId: $userId) {
      id
      name
    }
  }
`;

const CREATE_STOCK = gql`
  mutation CreateStock($symbol: String!, $name: String!) {
    createStock(symbol: $symbol, name: $name) {
      id
    }
  }
`;

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
`;

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
`;

export default function WishlistManager({ userId }: { userId: string }) {
  const [wishlistName, setWishlistName] = useState("");
  const [selectedWishlist, setSelectedWishlist] = useState("");
  const [selectedStock, setSelectedStock] = useState("");

  const { data: userData, refetch: refetchWishlists } = useQuery(
    GET_USER_WISHLISTS,
    {
      variables: { userId },
    }
  );

  const [createWishlist] = useMutation(CREATE_WISHLIST, {
    onCompleted: () => {
      refetchWishlists();
      setWishlistName("");
    },
  });

  const [createStock] = useMutation(CREATE_STOCK);
  const [addStockToWishlist] = useMutation(ADD_STOCK_TO_WISHLIST);

  const handleCreateWishlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (wishlistName) {
      createWishlist({ variables: { name: wishlistName, userId } });
    }
  };

  const handleAddStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedWishlist && selectedStock) {
      const stock = stocksData.find((s) => s.id === selectedStock);
      if (stock) {
        const { data } = await createStock({
          variables: {
            symbol: stock.symbol,
            name: stock.name,
          },
        });

        if (data?.createStock?.id) {
          await addStockToWishlist({
            variables: {
              wishlistId: selectedWishlist,
              stockId: data.createStock.id,
            },
          });
        }
        refetchWishlists();
        setSelectedStock("");
      }
    }
  };

  return (
    <div className="text-white bg-black sm:rounded-t-[50px] max-w-7xl font-semibold mx-auto mt-20 flex flex-col items-center">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 my-10">
      <Card className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Save for Vacation</h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <PencilIcon className="w-4 h-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <TrashIcon className="w-4 h-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Save $5,000 for a summer vacation</p>
            <Checkbox defaultChecked={false} />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">Progress: 40%</div>
            <div className="text-sm font-medium text-muted-foreground">$2,000 / $5,000</div>
          </div>
          
        </CardContent>
      </Card>
      <Card className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Pay Off Debt</h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <PencilIcon className="w-4 h-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <TrashIcon className="w-4 h-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Pay off $15,000 in credit card debt</p>
            <Checkbox defaultChecked={false} />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">Progress: 60%</div>
            <div className="text-sm font-medium text-muted-foreground">$9,000 / $15,000</div>
          </div>
        </CardContent>
      </Card>
      <Card className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Build Emergency Fund</h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <PencilIcon className="w-4 h-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <TrashIcon className="w-4 h-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Save $10,000 for emergency expenses</p>
            <Checkbox defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">Progress: 100%</div>
            <div className="text-sm font-medium text-muted-foreground">$10,000 / $10,000</div>
          </div>
        </CardContent>
      </Card>
      <Card className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Invest in Stocks</h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <PencilIcon className="w-4 h-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <TrashIcon className="w-4 h-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Invest $20,000 in a diversified stock portfolio</p>
            <Checkbox defaultChecked={false} />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">Progress: 25%</div>
            <div className="text-sm font-medium text-muted-foreground">$5,000 / $20,000</div>
          </div>
        </CardContent>
      </Card>
      <Card className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Save for Down Payment</h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <PencilIcon className="w-4 h-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <TrashIcon className="w-4 h-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Save $50,000 for a down payment on a house</p>
            <Checkbox defaultChecked={false} />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">Progress: 15%</div>
            <div className="text-sm font-medium text-muted-foreground">$7,500 / $50,000</div>
          </div>
        </CardContent>
      </Card>
      <Card className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Retirement Savings</h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <PencilIcon className="w-4 h-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <TrashIcon className="w-4 h-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Contribute $500 per month to retirement account</p>
            <Checkbox defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">Progress: 80%</div>
            <div className="text-sm font-medium text-muted-foreground">$40,000 / $50,000</div>
          </div>
        </CardContent>
      </Card>
    </div>
      </div>
  );
}

function PencilIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}


function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}