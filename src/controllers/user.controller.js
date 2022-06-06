const router = require('express').Router();

const User = require('../models/user.model');

router.get('/', async(req, res) => {
  try {
    const users = await User.query();

    return res.success('SUCCESS', '', {
      users
    });
    
  } catch (error) {
    return res.error('OBJECTION_ERROR', error);
  }
});

module.exports = router;