const express = require('express');
const app = express();
const sequelize = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const setupSwagger = require('./swagger/swagger');
const cors = require('cors');

app.use(cors({
    origin:'http://localhost:8081',
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    allowedHeaders: ['Content-type','Authorization']
}));

app.use(express.json());
setupSwagger(app);

app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', authRoutes);

sequelize.sync()
    .then(() => {
        console.log('Database conected and synced');
    })
    .catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });

module.exports = app;