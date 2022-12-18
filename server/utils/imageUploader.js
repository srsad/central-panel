/**
 * Просто функция которая записывает/перезаписывает картинку
 */
const fs = require('fs')
const path = require('path')

/**
 * Загрузка изображения
 * @param {String} basePath - базовый путь, например ../../static/company/logo/
 * @param {String} fileName - наименование файла
 * @param {String} filePath - путь к файлу, например `/${company._id}/${_fileName}`
 * @param {String} savePath - путь куда сохранять (basePath + savePath), без файла, например `/${company._id}`
 * @param {Buffer} bufferImage - картинка
 */
module.exports.imageLoader = async function({
  basePath,
  fileName,
  filePath,
  savePath,
  bufferImage
}) {
  // const _basePath = '../../static/company/logo/'
  // TODO тут на всякий удалять папку
  const _savePath = path.resolve(__dirname, basePath + savePath)
  // отчищаем есть она есть
  // rimraf(_savePath)
  // создаем если ее нет
  // createDirectories(_savePath)

  const buffer = bufferImage
  await fs.writeFileSync(`${_savePath}/${fileName}`, buffer, (err) => {
    if (err !== null) {
      console.error('Не удалось загрузить логотип компании', err)
      filePath = ''
    }
  })
  return filePath
}

/** Удаление */
module.exports.rimraf = function(filePath) {
  const _filePath = path.resolve(__dirname, filePath)
  rimraf(_filePath)
}

/**
 * Создание папки
 * @param {String} pathname
 */
// eslint-disable-next-line
function createDirectories(pathname) {
  const __dirname = path.resolve()
  // eslint-disable-next-line no-useless-escape
  pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, '')
  fs.mkdirSync(path.resolve(__dirname, pathname), { recursive: true }, (e) => {
    if (e) return console.error('', e)
  })
}

/**
 * Удаление директории
 * @param {String} pathname
 */
function rimraf(pathname) {
  if (fs.existsSync(pathname)) {
    const files = fs.readdirSync(pathname)
    files.forEach(function(filename) {
      const curPath = path.join(pathname, filename)
      if (fs.lstatSync(curPath).isDirectory()) {
        rimraf(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(pathname)
  }
}
