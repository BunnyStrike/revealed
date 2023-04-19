import { EventEmitter } from 'events'
import { initTRPC } from '@trpc/server'
import { observable } from '@trpc/server/observable'
import superjson from 'superjson'
import z from 'zod'

import { connectivity } from './connectivity'
import { gamepad } from './gamepad'
import { system } from './system'
import { createTRPCRouter } from './trpc'

// const ee = new EventEmitter()

export const desktopRouter = createTRPCRouter({
  desktop: createTRPCRouter({ gamepad, system, connectivity }),
})

export type AppRouter = typeof desktopRouter
