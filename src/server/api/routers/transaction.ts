import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const transactionRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello RCA Transaction`,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        date: z.date(),
        quantity: z.number(),
        type: z.string().min(1),
        productId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.productTransaction.create({
        data: {
          productId: input.productId,
          date: input.date,
          quantity: input.quantity,
          type: input.type,
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.productTransaction.findFirst();
  }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.productTransaction.findMany();
  }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.productTransaction.delete({ where: { id: input.id } });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
