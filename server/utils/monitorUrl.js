const cron = require('node-cron')
const { fetchData } = require('./fetchData')
const allJobs = {};
const monitorUrl = async (url) => {
    try {
        let task = cron.schedule('*/5 * * * *', async () => {
            let pingData = await fetchData(url.url)
            url.pingData.push({
                status: true,
                responseDuration: pingData.duration,
                timeOfRequest: pingData.config.start,
                timeOfResponse: pingData.end
            })
            await url.save()
        })
        allJobs[url._id] = task;
    } catch (error) {
    }
}

module.exports = { monitorUrl, allJobs }