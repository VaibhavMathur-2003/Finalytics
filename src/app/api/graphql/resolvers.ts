import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    user: (_: any, { id }: { id: string }) => prisma.user.findUnique({ where: { id } }),
    wishlists: () => prisma.wishlist.findMany(),
    wishlist: (_: any, { id }: { id: string }) => prisma.wishlist.findUnique({ where: { id } }),
    stocks: () => prisma.stock.findMany(),
    stock: (_: any, { id }: { id: string }) => prisma.stock.findUnique({ where: { id } }),
  },
  Mutation: {
    createUser: (_: any, { email, password, name }: { email: string; password: string; name?: string }) => 
      prisma.user.create({ data: { email, password, name } }),
    updateUser: (_: any, { id, email, name }: { id: string; email?: string; name?: string }) => 
      prisma.user.update({ where: { id }, data: { email, name } }),
    deleteUser: (_: any, { id }: { id: string }) => 
      prisma.user.delete({ where: { id } }),

    createWishlist: (_: any, { name, userId }: { name: string; userId: string }) => 
      prisma.wishlist.create({ data: { name, userId } }),
    updateWishlist: (_: any, { id, name }: { id: string; name?: string }) => 
      prisma.wishlist.update({ where: { id }, data: { name } }),
    deleteWishlist: (_: any, { id }: { id: string }) => 
      prisma.wishlist.delete({ where: { id } }),

    updateStock: (_: any, { id, name, quantity }: { id: string; name?: string; quantity?: number }) => 
      prisma.stock.update({ where: { id }, data: { name, quantity } }),
    deleteStock: (_: any, { id }: { id: string }) => 
      prisma.stock.delete({ where: { id } }),

    createStock: async (_: any, { symbol, name, quantity }: { symbol: string; name: string; quantity: number }) => {
      let stock = await prisma.stock.findUnique({ where: { symbol } });
      if (!stock) {
        stock = await prisma.stock.create({ data: { symbol, name, quantity } });
      }
      return stock;
    },
    addStockToWishlist: async (_: any, { wishlistId, stockId }: { wishlistId: string; stockId: string }) => {
      return prisma.wishlist.update({
        where: { id: wishlistId },
        data: { stocks: { connect: { id: stockId } } },
        include: { stocks: true },
      });
    },
    removeStockFromWishlist: (_: any, { wishlistId, stockId }: { wishlistId: string; stockId: string }) => 
      prisma.wishlist.update({
        where: { id: wishlistId },
        data: { stocks: { disconnect: { id: stockId } } },
      }),
  },
  User: {
    wishlists: (parent: { id: string }) => 
      prisma.wishlist.findMany({ where: { userId: parent.id } }),
  },
  Wishlist: {
    user: (parent: { userId: string }) => 
      prisma.user.findUnique({ where: { id: parent.userId } }),
    stocks: (parent: { id: string }) => 
      prisma.stock.findMany({ where: { wishlists: { some: { id: parent.id } } } }),
  },
  Stock: {
    wishlists: (parent: { id: string }) => 
      prisma.wishlist.findMany({ where: { stocks: { some: { id: parent.id } } } }),
  },
};