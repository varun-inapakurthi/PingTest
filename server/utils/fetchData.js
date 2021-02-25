const instance = require('./../utils/axiosnstance');
exports.fetchData = async (url) => {
    try {
        let pingData = await instance.get(url);
        return pingData;
    } catch (error) {
        return false;
    }
}