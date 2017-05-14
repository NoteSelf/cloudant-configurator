/**
 * Wraps an already wrapped axios instance.
 * Axios only allows you to create a wrapped instance using axios.create() once.
 * You can not call it again to keep adding subpaths, for example. 
 * This function returns an object that simulates an axios instance
 * with the url you give used as new baseUrl
 * @param {Axios} ax an wrapped axios isntance
 * @param {String} baseUrl the url you want to use as bases
 */
const wrapGeneratedAxios = (ax, baseUrl) => {

    baseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    const wrapper = (method) => (url, ...args) => ax[method](baseUrl + url, ...args);

    return {
        get: wrapper('get'),
        post: wrapper('post'),
        put: wrapper('put')

    }
}

export default wrapGeneratedAxios;