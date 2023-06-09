import { z } from 'zod'

import { addRevealedToSteam } from '../stores/steam/addRevealedToSteam'
import {
  checkIfSteamIsRunning,
  restartSteam,
  runSteamGame,
  startSteam,
  stopSteam,
} from '../stores/steam/manage'
import {
  addNonSteamApp,
  isAppAddedToSteam,
  removeNonSteamApp,
} from '../stores/steam/nonesteamapp'
import { appType } from './apps'
import { createTRPCRouter, publicProcedure } from './trpc'

// Simulate keyboard and mouse actions as if the real input device is used
export const steam = createTRPCRouter({
  addAppToSteam: publicProcedure
    .input(z.object({ appInfo: appType }))
    .mutation(({ input }) => addNonSteamApp(input.appInfo)),
  removeAppFromSteam: publicProcedure
    .input(
      z.object({
        appInfo: z.any(),
      })
    )
    .mutation(({ input }) => removeNonSteamApp(input.appInfo)),
  restartSteam: publicProcedure.mutation(({ input }) => restartSteam()),
  stopSteam: publicProcedure.mutation(({ input }) => stopSteam()),
  startSteam: publicProcedure.mutation(({ input }) => startSteam()),
  runGame: publicProcedure
    .input(
      z.object({
        path: z.string().nullable().optional(),
        steamAppId: z.number(),
      })
    )
    .mutation(({ input }) => runSteamGame(input.steamAppId, input.path)),
  checkIfSteamIsRunning: publicProcedure.query(({ input }) =>
    checkIfSteamIsRunning()
  ),
  addRevealedToSteam: publicProcedure.mutation(({ input }) =>
    addRevealedToSteam()
  ),
  isAddedToSteam: publicProcedure
    .input(
      z.object({
        title: z.string(),
        steamUserdataDir: z.string()?.optional(),
      })
    )
    .query(({ input }) => isAppAddedToSteam(input)),
})
