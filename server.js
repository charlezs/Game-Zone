const express = require('express');
const sequelize = require('./config/connection');
//const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

// turn on routes
//app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});