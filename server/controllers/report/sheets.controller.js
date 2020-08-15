const { GoogleSpreadsheet } = require('google-spreadsheet')
const doc = new GoogleSpreadsheet('1WTLT-eVSxad78EdjUa4Aj5p9xZ7RWg5Zu7f3uVDp2fw')

module.exports.updSheet = async (req, res) => {
  try {
    await doc.useServiceAccountAuth(require('./sheets-api-777369aa50cf.json'))
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[8]

    if (sheet.title === 'РемОнлайн') {
      console.log(sheet.title)
      console.log(sheet.rowCount)
      const cellA1 = sheet.getCell(0, 0)
      cellA1.value = 123.45;
      await sheet.saveUpdatedCells();
    }

    res.status(200).json({ message: 'запись произошла!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось записать!', error })
  }
}

