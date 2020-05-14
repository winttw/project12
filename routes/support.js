var express = require('express');
var router = express.Router();
const {User} = require('../models/user.model');
const {Task} = require('../models/task.model');
const {Company} = require('../models/company.model');

/* GET home page. */
router.get('/', async function(req, res, next) {
    res.render('support', { title: 'Support', page_description: `Need help with something, ${req.user.display_name}?` });
});

module.exports = router;
