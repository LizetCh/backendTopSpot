const express = require('express'); //express
const mongoose = require('mongoose'); //mongoose
const dotenv = require('dotenv').config(); 
const colors = require('colors'); //colors
const connectDB = require('./config/db.js');
const cors = require('cors'); //cors
const port = process.env.PORT || 5000; //port
const { errorHandler } = require('./middleware/errorMiddleware.js');

// conexión a base de datos
connectDB();

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/api/songs', require('./routes/songRoutes'));
app.use(errorHandler);

app.use('/api/albums', require('./routes/albumRoutes'));
app.use(errorHandler);

app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use(errorHandler);

// archivos estáticos para las imágenes
app.use('/uploads', express.static('public/uploads'));


app.listen(port, () => console.log(`Servidor inicado en el puerto ${port}`));



