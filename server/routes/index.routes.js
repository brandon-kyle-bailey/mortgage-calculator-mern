const express = require('express');

const controller = require('../controllers/index.controller');
const cacheMiddleware = require('../middlewares/cache.middleware');
const endpointValidationMiddleware = require('../middlewares/endpointValidation.middleware');

const apiRoutes = express.Router();

apiRoutes.get(
  '/calculate/:propertyPrice/:downPayment/:interest/:amortPeriod/:schedule',
  [
    endpointValidationMiddleware.validateParams,
    cacheMiddleware.cacheRequest(10),
  ],
  controller.getPostsRequest,
);

apiRoutes.get(
  '/test',
  [
    cacheMiddleware.cacheRequest(10),
  ],
  controller.testApiController,
);

module.exports = apiRoutes;
