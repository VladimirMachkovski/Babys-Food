require ('../../pkg/db');
const config = require('../../pkg/config');
const express = require('express');
const jwt = require('express-jwt');
const handlers = require('./handlers/recipe');

const api = express();

api.use(express.json());


api.use(jwt({
  secret: config.get('security').secret,
  algorithms: config.get('security').algorithms
}).unless({
  path: [
      '/api/v1/recipe/getall',
      { url: /\/api\/v1\/recipe\/getone\/.*/, methods: ['GET'] },
      { url: /\/api\/v1\/recipe\/category\/.*/, methods: ['GET'] },
  ]
}));

api.post('/api/v1/recipe/create',handlers.create);
api.get('/api/v1/recipe/getall',handlers.getAll);
api.get('/api/v1/recipe/getmine',handlers.getMine);
api.get('/api/v1/recipe/getone/:id',handlers.getOne);
api.get('/api/v1/recipe/category/:category',handlers.getCategory);
api.patch('/api/v1/recipe/update/:id',handlers.update);
api.delete('/api/v1/recipe/remove/:id',handlers.remove);

api.listen(config.get('services').recipe.port, err => {
  if (err) {
      return console.log('Could not start server', err);
  }
  console.log(`Server successfully started on port ${config.get('services').recipe.port}`);
});


