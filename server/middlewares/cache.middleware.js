const mcache = require('memory-cache');

exports.cacheRequest = (cacheDuration) => (req, res, next) => {
  const key = `_express_${req.originalUrl}` || req.url;
  const cachedBody = mcache.get(key);
  if (cachedBody) {
    res.send(cachedBody);
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      mcache.put(key, body, cacheDuration * 1000);
      res.sendResponse(body);
    };
    next();
  }
};
