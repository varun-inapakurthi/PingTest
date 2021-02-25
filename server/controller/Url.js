const Url = require('./../model/Url');
const { monitorUrl, allJobs } = require('../utils/monitorUrl');
const { fetchData } = require('../utils/fetchData');
const asyncHandler = require("express-async-handler")



exports.addUrl = asyncHandler(async (req, res) => {
    try {
        let user = req.user;
        let { url, expectedResponseTime } = req.body;
        let pingData = await fetchData(url);
        if (pingData) {
            let newUrl = await Url.create({ url, expectedResponseTime, userId: user._id });
            newUrl.pingData.push({
                status: true,
                responseDuration: pingData.duration,
                timeOfRequest: pingData.config.start,
                timeOfResponse: pingData.end
            })

            monitorUrl(newUrl)
            await newUrl.save()
            await user.urls.push(newUrl._id)
            await user.save()
            res.json({
                status: true,
                url: newUrl
            })
        } else {
            res.status(400)
            throw new Error('Error adding url')

        }
    }
    catch (e) {
        res.status(400)
        throw new Error('Error adding url')

    }
})


exports.removeUrl = asyncHandler(async (req, res) => {
    try {

        let { id } = req.params;
        if (req.user.urls.includes(id)) {
            let task = allJobs[id];
            task.destroy()
            delete allJobs[id]
            await Url.findByIdAndDelete(id)
            req.user.urls = req.user.urls.filter(function (value, index, arr) {
                return value != id;
            });
            await req.user.save()
            res.json({
                status: true,
                message: "Url removed"
            })
        } else {

            res.status(400)
            throw new Error("Url not present or unauthorized user")
        }
    } catch (error) {
        res.status(400)
        throw new Error("Error deleting url")

    }
})


exports.getUrl = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const url = await Url.findById(id);
        res.json(url)

    } catch (error) {
        res.status(400)
        throw new Error("Error fetching url")
    }
})