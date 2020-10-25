const Testimonial = require('../../models/site/testimonial.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body)
    await testimonial.save()
    res.status(201).json({ message: 'Отзыв успешно добавлен!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось добавить отзыв!', error })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await Testimonial.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось обновить отзыв!', error })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    await Testimonial.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Отзыв удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить отзыв!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id)
    res.status(200).json(testimonial)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть отзыв!', error })
  }
}

/** Вернуть только уникальный список бренд + сайт */
module.exports.getAllBrandsAndSites = async (req, res) => {
  try {
    const testimonials = await Testimonial
      .find({})
      .sort({ brand: 1 })
      // .aggregate([
      //   {
      //     $group: {
      //       site_url: 1
      //     }
      //   }
      // ])
      .populate('brand', { name: 1 })
    res.json({ data: testimonials })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список отзывов!' })
  }
}

/** Вернуть по адресу сайта */
module.exports.getBySiteUrl = async (req, res) => {
  try {
    console.log('siteurl', req.params.siteurl)
    const testimonials = await Testimonial
      .find({ 'site_url': req.params.siteurl })
      .populate('brand', { name: 1 })
      .sort({ created: 1 })
    res.json({ data: testimonials })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список отзывов!' })
  }
}
