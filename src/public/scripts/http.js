if(typeof window.PWA === 'undefined') window.PWA = {};
if(typeof window.PWA.Core === 'undefined') window.PWA.Core = {};

window.PWA.Core['Http'] = {
    /**
     * Helper for http calls
     * @param method
     * @param url
     * @param data
     * @returns {Promise}
     */
    req : function (method,url,data) {
        var data = data || '';
        // Return a new promise.
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open(method, url, true);
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            req.onload = function() {
                if (req.status == 200) {
                    resolve(req.response);
                }
                else {
                    reject(Error(req.statusText));
                }
            };
            req.onerror = function() {
                reject(Error("Something went wrong ... "));
            };
            req.send(data);
        });
    }
}