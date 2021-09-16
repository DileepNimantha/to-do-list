import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'To Do App API',
    description: 'To Do App API'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/toDo.routes.js', './routes/user.routes.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  await import('../server.js');
});
