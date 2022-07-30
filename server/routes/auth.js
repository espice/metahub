const User = require('../models/User');
const router = require('express').Router();

router.post('/create', async (req, res) => {
  const user = req.body;
  if (user) {
    const userFromDB = await User.findOne({
      email: user.email,
    }).catch((err) => console.log('==> User not found.'));
    console.log(user, userFromDB);
    if (userFromDB) {
      console.log('==> User already in DB, so new instance is not created.');
      res.json({
        message: 'User is already in DB, so new instance is not created.',
      });
      return;
    }
    const newUser = await new User({
      username: user.name,
      image: user.image,
      email: user.email,
      accountCreationDate: new Date().getTime(),
    }).save();
    res.json({ action: 'Create user', newUser });
    return;
  }
  res.json({ action: 'Create user', message: 'User signed out.' });
});

router.get('/getAllUsers', async (req, res) => {
  const users = await User.find().lean();
  res.json({
    users: users,
    action: 'Get all users',
  });
});

router.get('/getUser/:email', async (req, res) => {
  const userEmail = req.params.email;
  const userFromDB = await User.findOne({ email: userEmail });
  console.log(userEmail);
  res.json(userFromDB);
});

export default router;
