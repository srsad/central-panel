const axios = require('axios')
const Testimonial = require('../../models/site/testimonial.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body)
    await testimonial.save()
    await updateSourceOptions(testimonial)
    res.status(201).json({ message: 'Отзыв успешно добавлен!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось добавить отзыв!', error })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    const testimonial = await Testimonial.findById(req.params.id)
    await Testimonial.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    await updateSourceOptions(testimonial)
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
    const testimonial = await Testimonial.findById(req.params.id)
    await Testimonial.deleteOne({ _id: req.params.id })
    await updateSourceOptions(testimonial)
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
      // .find({})
      .aggregate([{$group: {_id: "$site_url"}}])
      .sort({ brand: 1 })
      // .aggregate([
      //   {
      //     $group: {
      //       site_url: 1
      //     }
      //   }
      // ])
      // .populate('brand', { name: 1 })
    res.json({ data: testimonials })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список отзывов!' })
  }
}

/** Вернуть по адресу сайта */
module.exports.getBySiteUrl = async (req, res) => {
  try {
    const testimonials = await Testimonial
      .find({ 'site_url': req.params.siteurl })
      .populate('brand', { name: 1 })
      .sort({ sort_index: 1 })
    res.json({ data: testimonials })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список отзывов!' })
  }
}

/**
 * Сохраняем данные на источнике
 */
async function updateSourceOptions(testimonial) {
  try {
    const testimonials = await Testimonial
      .find({ 'site_url': testimonial.site_url, status: true })
      .sort({ sort_index: 1 })

    await axios.post(`https://${testimonial.site_url}/rest/`, {
      params: {
        create: 'testimonials',
        testimonials: JSON.stringify(testimonials)
      }
    })
  } catch (e) {
    console.error('updateSourceOptions error 2', e.response)
    return false
  }
}
