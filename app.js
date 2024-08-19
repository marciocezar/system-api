const express = require('express');
const app = express();
const sequelize = require('./config/config');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

app.use('/api', userRoutes);

sequelize.sync()
    .then(() => {
        console.log('Database conected and synced');
    })
    .catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });

module.exports = app;