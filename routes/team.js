var express = require('express');
var router = express.Router();
const {User} = require('../models/user.model');
const config = require('../configs/config.json');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const team_members = req.user.company ? await User.find({'company': req.user.company._id}) : []
  res.render('team', { title: 'Team', team_members, page_description: `Here is who is at the office today!`, admin_groups: config.allowed_groups });
});

module.exports = router;
