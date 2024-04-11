// routes/announcements.js
const express = require('express');
const router = express.Router();
const AlertAndNotification = require('../models/AlertAndNotification');
const Users = require('../models/Users');

// GET all announcements
router.get('/getById', async (req, res) => {
    const {notificationType, userIdentification} = req.query;
  try {
    const notifications = await AlertAndNotification.findAll({
        where:{
            NotificationType: notificationType,
            readStatus: 0,   
            UserId: userIdentification,

  }});
  console.log('the notification',notifications);
    res.json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST create a new announcement

router.post('/', async (req, res) => {
  const { NotificationType } = req.body;
  try {
    const users = await Users.findAll(); // Retrieve all users from the database
    const notifications = users.map(user => ({
      NotificationType: NotificationType,
      readStatus: false,
      UserId: user.id
    }));
    AlertAndNotification.bulkCreate(notifications); // Create notifications for all users
    res.status(201).json({ message: 'Notifications created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
////////////////////


router.put('/notification', async (req, res) => {
  try {
    const { userId } = req.body;
    await AlertAndNotification.update(
      { readStatus: true }, // Set readStatus to true
      { where: { UserId: userId} } // Update notifications with matching userId and Id
    );
    res.status(200).json({ message: 'Notifications updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// DELETE an announcement
router.delete('/', async (req, res) => {
    const { notificationType } = req.query;
    try {
      const notifications = await AlertAndNotification.findAll({
        where: {
          NotificationType: notificationType
        }
      });
      if (!notifications || notifications.length === 0) {
        return res.status(404).json({ msg: 'Notifications not found' });
      }
      await Promise.all(notifications.map(async notification => {
        await notification.destroy();
      }));
      res.json({ msg: 'Deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

module.exports = router;
