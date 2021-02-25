const axios = require('axios')
let instance = axios.create()

instance.interceptors.request.use((request) => {
    request.start = new Date()
    return request
})

instance.interceptors.response.use((response) => {
    response.end = new Date();
    response.duration = response.end - response.config.start
    return response
})

module.exports = instance;