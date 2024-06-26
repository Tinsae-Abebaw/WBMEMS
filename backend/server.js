const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const sequelize = require('./db');
const announcementRoutes = require('./routes/announcements');
const registrationRoutes = require('./routes/registration');
const deviceRegistrationRoutes = require('./routes/deviceRegistration');
const loginRoutes = require('./routes/login');
const requestRoutes = require('./routes/request');
const notificationRoutes = require('./routes/alertAndNotification');
const requestOptions= require('./routes/requestOptions');
const reportOptions= require('./routes/reportOptions');
const contract= require('./routes/Contract');
const Manuals = require('./models/Manuals'); // Import Manuals model
const fs = require('fs'); // Import fs module
// Middleware
app.use(express.json()); // Body parser middleware
app.use(cors());

app.use('/api/announcements', announcementRoutes);
app.use('/api/registration', registrationRoutes);
app.use('/api/deviceRegistration', deviceRegistrationRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/requestOptions', requestOptions);
app.use('/api/alertAndNotification', notificationRoutes);
app.use('/api/reportOptions',reportOptions );
app.use('/api/contract',contract);

// Serve static files (like profile pictures and manuals)
const uploadsDirectory = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDirectory));



// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);

  // Sync database models
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync(); // Sync models to the DB
    console.log('All models have been synchronized.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
});
