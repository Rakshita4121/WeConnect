const express = require('express');
const router = express.Router();
const webpush = require('../utils/push');
const User = require('../models/UserModel');

// Middleware to check if user is authenticated
const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

// Save subscription to user's profile
router.post('/subscribe', ensureAuth, async (req, res) => {
  const subscription = req.body;

  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.subscription = subscription;
    await user.save();

    res.status(201).json({ message: 'Subscription saved successfully to user' });
  } catch (error) {
    console.error('Error saving subscription:', error);
    res.status(500).json({ message: 'Failed to save subscription' });
  }
});

// (Optional) Admin or trigger route to send notification to all subscribed users
router.post('/send-notification', async (req, res) => {
  const { title, message } = req.body;

  const payload = JSON.stringify({ title, message });

  try {
    const usersWithSubs = await User.find({ "subscription.endpoint": { $exists: true } });

    await Promise.all(
      usersWithSubs.map(user =>
        webpush.sendNotification(user.subscription, payload)
          .catch(err => console.error("Push error:", err))
      )
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
