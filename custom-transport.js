const Transport = require('winston-transport');
const request = require('request');

module.exports = class HttpLogTransport extends Transport {
  apiEndPoint;
  routesToExclude;
  constructor(opts) {
    super(opts);
    this.apiEndPoint = opts.apiEndPoint;
    this.routesToExclude = opts.routesToExclude;
  }

  log(info, callback) {
    setImmediate(() => {
      let flag = true;
      let reqUrl = info?.metadata?.meta?.req.url;
      if (reqUrl) {
        flag = this.routesToExclude.includes(reqUrl) ? false : true;
      }
      if (flag) {
        request({
          url: `${this.apiEndPoint}/data`,
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: {
            data: info
          },
          json: true
        },)
      }
      this.emit('logged', info);
    });
    callback();
  }
};