
/**
 * 
 * @param {Object} _obj a json object that specifies at least the following elements:
 *                      . url - the file's url
 *                      The object may also specify:
 *                      . responseType - mainly 'text' or  'json'
 *                      . method - 'GET' or 'POST'
 *                      . => any kind of parameter that is accepted in
 *                           XMLHttpRequest.setRequestHeader()
 * @returns a promise with the results of the ran XMLHttpRequest.
 */
async function loadFromUrlPromise(_obj) {
    // Defining the promise:
    let request = _obj => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(_obj.method || "GET", _obj.url);
            xhr.responseType = _obj.responseType;
            if (_obj.headers) {
                Object.keys(_obj.headers).forEach(key => {
                    xhr.setRequestHeader(key, _obj.headers[key]);
                });
            }
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(_obj.body);
        });
    };
    return request(_obj);
}