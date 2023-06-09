import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

const appInput = z
  .object({
    search: z.string().optional(),
    category: z.string().optional(),
    isFavorited: z.boolean().optional(),
    sort: z
      .string()
      .includes('desc')
      .or(z.string().includes('asc'))
      .default('desc'),
    ownerId: z.string().optional(),
  })
  .default({ search: undefined, sort: 'desc' })

export const gameRouter = createTRPCRouter({
  all: publicProcedure.input(appInput).query(({ ctx }) => {
    return ctx.prisma.game.findMany({ orderBy: { createdAt: 'desc' } })
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
