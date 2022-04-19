/**
 * Загрузка изображений в хранилище selectel
 */
require('dotenv').config()

// const { SelectelStorageClient } = 'selectel-storage-client';

// const manager = require('node-selectel-manager')({
//   login: process.env.SELECTEL_LOGIN,
//   password: process.env.SELECTEL_PASS
// })
// const Selectel = require('selectel-storage')
// const selClient = new Selectel(
//   process.env.SELECTEL_LOGIN,
//   process.env.SELECTEL_PASS
// )
// const client = new SelectelStorageClient({
//       userId: process.env.SELECTEL_LOGIN,
//       password: process.env.SELECTEL_PASS,
//       proto: 3,
// })

const selectel = {}

/**
 * Загрузка изображения
 * @param {Buffer} image - картинка
 * @param {String} containerName - имя контейнера
 * @return {String} путь к загруженной картинке
 */
selectel.upload = async function (image, containerName = 'tmp') {
  // const _image = new File(...image)
  console.log('selectel.upload', image, containerName)
  try {
    console.log('infoStorage', await selClient.infoStorage())
    console.log('infoContainer', await selClient.infoContainer())
    await selClient.uploadFile(image, containerName)
    // const info = await client.getAccountInfo()
    console.log('info ---', info)
  } catch (error) {
    console.error('errror ---', error)
  }
  // const updalod = manager.uploadFile(image, `landing/${containerName}/`)
  // console.log('updalod file options', updalod);
  return ''
}

module.exports = selectel
