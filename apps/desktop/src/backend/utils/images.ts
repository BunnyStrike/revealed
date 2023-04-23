import { spawnSync } from 'child_process'
import { basename, dirname, extname, join } from 'path'
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'graceful-fs'

import { type GameInfo, type SideloadGame } from '~/common/types'
import { type AppInfo } from '~/common/types/app.types'
import { revealedIconFolder } from '../constants'

function createImage(
  buffer: Buffer,
  outputFilePath: string
): string | undefined {
  try {
    writeFileSync(outputFilePath, buffer, {
      encoding: 'ascii',
    })
  } catch (error) {
    return `${error}`
  }
  return
}

function downloadImage(
  imageURL: string,
  outputFilePath: string
): string | undefined {
  try {
    spawnSync('curl', ['-L', imageURL, '-o', outputFilePath])
  } catch (error) {
    return `Donwloading of ${imageURL} failed with:\n${error}`
  }
  return
}

function removeImage(imagePath: string): string | undefined {
  try {
    unlinkSync(imagePath)
  } catch (error) {
    return `Removing of ${imagePath} failed with:\n${error}`
  }
  return
}

function checkImageExistsAlready(image: string): boolean {
  const extentions = ['.png', '.jpg']

  const imageName = basename(image).replace(extname(image), '')
  const dirName = dirname(image)

  const found = extentions.find((extention) => {
    return existsSync(join(dirName, imageName + extention))
  })

  return found !== undefined ? true : false
}

async function getIcon(
  appName: string,
  gameInfo: GameInfo | SideloadGame | AppInfo
) {
  if (!existsSync(revealedIconFolder)) {
    mkdirSync(revealedIconFolder)
  }

  const { art_square, squareImage, coverImage } = gameInfo as any

  const image = (art_square || squareImage || coverImage)
    .replaceAll(' ', '%20')
    .replace('{ext}', 'jpg')

  const icon = `${revealedIconFolder}/${appName}.jpg`

  if (!checkImageExistsAlready(icon)) {
    downloadImage(image, icon)
  }
  return icon
}

export {
  createImage,
  downloadImage,
  removeImage,
  checkImageExistsAlready,
  getIcon,
}
