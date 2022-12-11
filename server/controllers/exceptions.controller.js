/**
 * Генерация и отдача xlsx списка исключений
 */
const Part = require('../models/part.model')

module.exports.getExceptions = async (req, res) => {
  let parts = ''
  try {
    const result = await Part.find(
      {
        $where: 'this.excepts.length > 0'
      },
      {
        name: 1,
        brand: 1,
        category: 1,
        excepts: 1
      }
    ).sort({ brand: 1, category: 1 })
    parts = result
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список исключений!' })
  }

  if (!parts) res.status(500).json({ message: 'Список исклчений пуст!' })

  try {
    const items = [['Бренд', 'Категория', 'Неисправность', 'Модель', 'Цена']]

    for await (const item of parts) {
      for await (const el of item.excepts) {
        const part = [item.brand, item.category, item.name, el.model, el.price]
        items.push(part)
      }
    }

    res.json({ data: items })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось сформировать xlsx отчет!' })
  }
}
