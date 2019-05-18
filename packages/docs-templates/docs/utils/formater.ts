import * as fs from 'fs'

/**
 * replace `&` to `-`
 * @params str<string>: filename
 */
export const replaceInvalidCharter = (str: string): string => {
  const regex = /&|\+|@/g
  return str.replace(regex, '-')
}

/**
 * rename file by replaceInvaliCharter
 * @params fileNames<string[]>: all files in [folderName]
 * @params foderName<string>: parent folder of fileNames
 * @params callback<func>: amend callback funcs
 */
export const rename = (
  fileNames: string[],
  folderName: string,
  callback = replaceInvalidCharter
) => {
  const newFileNames: string[] = []
  fileNames.forEach(fileName => {
    const newFileName = callback(fileName)
    fs.renameSync(`${folderName}/${fileName}`, `${folderName}/${newFileName}`)
    newFileNames.push(newFileName)
  })
  return newFileNames
}
