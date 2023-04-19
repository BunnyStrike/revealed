import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const appRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany({ orderBy: { createdAt: 'desc' } })
  }),
  apps: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany({
      // where: { versions: { none: { platform: 'STEAMOS' } } },
      orderBy: { createdAt: 'desc' },
    })
  }),
  steamos: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany({
      // where: { versions: { some: { platform: 'STEAMOS' } } },
      orderBy: { createdAt: 'desc' },
      // include: { versions: true },
    })
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      // TODO: get how long to beat data
      // TODO: cache how long to beat data
      // TODO: get steam data
      // TODO: cache steam data
      return ctx.prisma.game.findFirst({ where: { id: input.id } })
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        url: z.string().min(1),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.game.create({ data: input })
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.game.delete({ where: { id: input } })
  }),
})
