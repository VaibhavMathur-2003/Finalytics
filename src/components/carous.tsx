"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "./ui/input";
import { Calendar } from "@/components/ui/smallcalendar";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import * as React from "react";
import stocksData from "../../public/assets/stocks.json";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Link from "next/link";
import Image from "next/image";

const CREATE_WISHLIST = gql`
  mutation CreateWishlist($name: String!, $userId: ID!) {
    createWishlist(name: $name, userId: $userId) {
      id
      name
    }
  }
`;

const CREATE_STOCK = gql`
  mutation CreateStock($symbol: String!, $name: String!, $quantity: Float!) {
    createStock(symbol: $symbol, name: $name, quantity: $quantity) {
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
        quantity
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
          quantity
        }
      }
    }
  }
`;
const DELETE_WISHLIST = gql`
  mutation DeleteWishlist($id: ID!) {
    deleteWishlist(id: $id) {
      id
    }
  }
`;

const REMOVE_STOCK_FROM_WISHLIST = gql`
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

export default function WishlistsPart({ userId }: { userId: string }) {
  const [wishlistName, setWishlistName] = useState("");
  const [selectedWishlist, setSelectedWishlist] = useState<{
    id: string;
    name: string;
    stocks: Array<{
      id: string;
      symbol: string;
      name: string;
      quantity: number;
    }>;
  } | null>(null);
  const [selectedStock, setSelectedStock] = useState("");
  const [stockQuantity, setStockQuantity] = useState(1);

  const { data: userData, refetch: refetchWishlists } = useQuery(
    GET_USER_WISHLISTS,
    {
      variables: { userId },
    }
  );
  const [deleteWishlist] = useMutation(DELETE_WISHLIST, {
    onCompleted: () => {
      refetchWishlists();
    },
  });
  const handleDeleteWishlist = (wishlistId: string) => {
    deleteWishlist({ variables: { id: wishlistId } });
  };
  const [createWishlist] = useMutation(CREATE_WISHLIST, {
    onCompleted: () => {
      refetchWishlists();
      setWishlistName("");
    },
  });

  const [createStock] = useMutation(CREATE_STOCK);
  const [addStockToWishlist] = useMutation(ADD_STOCK_TO_WISHLIST, {
    onCompleted: (data) => {
      setSelectedWishlist(data.addStockToWishlist);
      refetchWishlists();
    },
  });

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
            quantity: stockQuantity,
          },
        });

        if (data?.createStock?.id) {
          await addStockToWishlist({
            variables: {
              wishlistId: selectedWishlist.id,
              stockId: data.createStock.id,
            },
          });
        }
        refetchWishlists();
        setSelectedStock("");
      }
    }
  };
  const [removeStockFromWishlist] = useMutation(REMOVE_STOCK_FROM_WISHLIST, {
    onCompleted: (data) => {
      setSelectedWishlist(data.removeStockFromWishlist);
      refetchWishlists();
    },
  });

  const handleRemoveStock = async (wishlistId: string, stockId: string) => {
    await removeStockFromWishlist({
      variables: { wishlistId, stockId },
    });
  };

  return (
    <div className="overflow-hidden bg-gray-900 h-screen">
      <div className="flex flex-col justify-center">
        <div className="absolute w-full flex justify-center ">
          <div className="absolute top-[50px] bg-white h-14 left-40 w-px"></div>
        </div>

        <div className="absolute top-[100px] left-10">
          <Calendar
            mode="single"
            className="rounded-md border transform rotate-12 border-[#39FF14] bg-black text-white shadow-white shadow-lg"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="absolute w-full flex justify-center ">
          <div className="absolute top-[50px] bg-white h-14 right-40 w-px"></div>
        </div>

        <div className="absolute top-[100px] right-10">
          <Image
          width={220}
          height={220}
            src="/assets/stocks.png"
            className="rounded-full border-white border-2 shadow-white shadow-lg brightness-150 hover:animate-bounce"
            alt=""
          />
        </div>
      </div>
      <Drawer>
        <div className="bg-gray-900 mt-20 mx-auto p-8">
          <form
            onSubmit={handleCreateWishlist}
            className="flex items-center justify-between max-w-4xl mx-auto pb-8"
          >
            <Input
              type="text"
              value={wishlistName}
              onChange={(e) => setWishlistName(e.target.value)}
              placeholder="Name your Wishlist"
              className="flex-grow mr-4 z-20"
            />
            <Button
              type="submit"
              className="bg-white text-black font-bold text-2xl p-4 rounded-xl shadow-lg hover:bg-gray-100 transition z-20"
            >
              +
            </Button>
          </form>
          <div className="grid grid-cols-1 gap-6  max-w-4xl mx-auto overflow-y-scroll max-h-[500px] no-scrollbar">
            {userData?.user?.wishlists.map(
              (wishlist: {
                id: string;
                name: string;
                stocks: Array<{
                  id: string;
                  symbol: string;
                  name: string;
                  quantity: number;
                }>;
              }) => (
                <DrawerTrigger key={wishlist.id} asChild>
                  <Card
                    key={wishlist.id}
                    className="relative overflow-hidden rounded-xl border-4 border-blue-500 shadow-lg transition-all hover:shadow-2xl hover:border-red-600 transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => setSelectedWishlist(wishlist)}
                  >
                    <CardContent className="p-4  gap-2 justify-center bg-white">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {wishlist.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition"
                          >
                            <PencilIcon
                              className="w-4 h-4 text-gray-600"
                              aria-hidden="true"
                            />
                            <span className="sr-only">
                              Edit {wishlist.name}
                            </span>
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-gray-100 transition"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleDeleteWishlist(wishlist.id);
                            }}
                          >
                            <TrashIcon
                              className="w-4 h-4 text-gray-600"
                              aria-hidden="true"
                            />
                            <span className="sr-only">
                              Delete {wishlist.name}
                            </span>
                          </Button>
                        </div>
                      </div>
                      {/* <p className="text-gray-600">{wishlist.description}</p> */}
                      <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                        {/* <span>Progress: {wishlist.progress}%</span> */}
                        <span>
                          {/* ${wishlist.currentAmount.toLocaleString()} / $
                    {wishlist.targetAmount.toLocaleString()} */}
                        </span>
                      </div>
                      {/* <Progress
                  value={wishlist.progress}
                  className="w-full bg-green-500 rounded-full"
                /> */}
                    </CardContent>
                  </Card>
                </DrawerTrigger>
              )
            )}
          </div>
        </div>
        <DrawerContent>
          <div className="mx-auto w-full max-w-2xl">
            <DrawerHeader>
              <DrawerTitle>
                {selectedWishlist ? selectedWishlist.name : "Select a Wishlist"}
              </DrawerTitle>
              <form
                onSubmit={handleAddStock}
                className="flex items-center justify-between w-full  mx-auto"
              >
                <select
                  value={selectedStock}
                  onChange={(e) => setSelectedStock(e.target.value)}
                  className="w-full mr-4 z-20"
                >
                  {" "}
                  <option value="">Select a Stock</option>
                  {stocksData.map(
                    (stock: { id: string; symbol: string; name: string }) => (
                      <option key={stock.id} value={stock.id}>
                        {stock.symbol} - {stock.name}
                      </option>
                    )
                  )}
                </select>
                <input
                  type="number"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(Number(e.target.value))}
                />

                <Button
                  type="submit"
                  className="bg-white text-black font-bold text-2xl p-4 rounded-xl border border-black shadow-lg hover:bg-gray-100 transition z-20"
                >
                  +
                </Button>
              </form>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full max-w-xl"
                >
                  <CarouselContent>
                    {selectedWishlist?.stocks.map((stock, index) => (
                      <CarouselItem
                        key={stock.id}
                        className="md:basis-1/2 lg:basis-1/5"
                      >
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6 bg-gray-900 text-white rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.19),_0_6px_6px_rgba(0,0,0,0.23)] hover:shadow-[0_0_0_3px_rgba(3,102,214,0.3)] transition-transform transform hover:scale-105">
                              <div className="text-center">
                                <span className="text-base font-semibold">
                                  {stock.name}
                                </span>
                                <Button
                                  onClick={() =>
                                    handleRemoveStock(
                                      selectedWishlist.id,
                                      stock.id
                                    )
                                  }
                                  className="absolute top-0 right-0 m-2 p-1 h-6 w-6 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
                                >
                                  ✕
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
            <DrawerFooter>
              {selectedWishlist && (
                <Link href={`/wishlist/${selectedWishlist.id}`}>
                  <Button className="w-full">Fetch Data</Button>
                </Link>
              )}
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function PencilIcon(props: React.SVGProps<SVGSVGElement>) {
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
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
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
  );
}
