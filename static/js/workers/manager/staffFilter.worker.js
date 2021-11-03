/**
 * Воркер для отделения менеджеров и инженеров
 */

self.addEventListener('message', async (event) => {
    const table = event.data.table

    self.postMessage(table)
})