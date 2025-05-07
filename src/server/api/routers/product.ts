import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const productRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello RCA Iluminação`,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        brand: z.string().min(1),
        observation: z.string().min(1),
        image: z.string().min(1),
        sector: z.string().min(1),
        shelf: z.string().min(1),
        shed: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.create({
        data: {
          name: input.name,
          brand: input.brand,
          observation: input.observation,
          image: input.image,
          sector: input.sector,
          shelf: input.shelf,
          shed: input.shed,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.product.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
  getAll: protectedProcedure.query(({ ctx }) => {

    return ctx.db.product.findMany({
      include: {
        ProductTransaction: true
      }
    })
  }),

  deleteOne: protectedProcedure.input(z.object({id: z.number()})).mutation(({ ctx, input }) => {
    return ctx.db.product.delete({where: {id: input.id}})
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
