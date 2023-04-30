import { spawn } from 'child_process'
import { join } from 'path'
import {
  getSteamCompatFolder,
  isLinux,
  isMac,
  isWindows,
} from 'backend/constants'

export const getSteamName = (): string => {
  let steamName = 'steam.exe'

  if (isMac) {
    steamName = 'steam_osx'
  } else if (isLinux) {
    steamName = 'steam'
  }

  return steamName
}

export const getSteamPath = async () => {
  if (isWindows) {
    const steamName = getSteamName()

    const defaultSteamPath = getSteamCompatFolder()
    const steamPath = join(defaultSteamPath.replaceAll("'", ''), steamName)

    return steamPath
  } else {
    // /usr/bin/steam
    return getSteamName()
  }
}

export const restartSteam = async () => {
  await stopSteam()
  // TODO: wait 5 seconds in typescript
  await startSteam()
}

export const stopSteam = async () => {
  if (isWindows) {
    const results = spawn('taskkill', ['/f', '/im', getSteamName()])

    return results
  } else {
    const results = spawn('killall', [getSteamName()])

    return results
  }
}

export const startSteam = async () => {
  const steamPath = await getSteamPath()
  const results = spawn(steamPath, [])
  return results
}

export const checkIfSteamIsRunning = async () => {
  if (isWindows) {
    const results = spawn('tasklist', ['/fi', 'imagename eq ${getSteamName()}'])

    return results.stdout.toString().includes(getSteamName())
  } else {
    const results = spawn('ps', ['-A'])

    return results.stdout.toString().includes(getSteamName())
  }
}
