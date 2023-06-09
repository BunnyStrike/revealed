import { EventEmitter } from 'events'
import {
  initTRPC,
  type inferRouterInputs,
  type inferRouterOutputs,
} from '@trpc/server'
import { observable } from '@trpc/server/observable'
import superjson from 'superjson'
import z from 'zod'

import { apps } from './apps'
import { connectivity } from './connectivity'
import { gamepad } from './gamepad'
import { games } from './games'
import { info } from './info'
import { logger } from './logger'
import { steam } from './steam'
import { system } from './system'
import { createTRPCRouter } from './trpc'

// const ee = new EventEmitter()

export const desktopRouter = createTRPCRouter({
  desktop: createTRPCRouter({
    gamepad,
    system,
    connectivity,
    steam,
    info,
    logger,
    apps,
    games,
  }),
})

export type DesktopRouter = typeof desktopRouter
