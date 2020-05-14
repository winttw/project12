var express = require('express');
var router = express.Router();
const {User} = require('../models/user.model')
const {Task} = require('../models/task.model')

/* GET home page. */
router.get('/', async function(req, res, next) {
    const users_doc = req.user.company ? await User.find({$and: [{'company': req.user.company._id}, {status: 1}]}) : []
    const active_tasks = await Task.find({status: 1}).exec();
    res.render('dashboard', { title: 'Dashboard', active_users: users_doc, active_tasks, message: req.flash('success'), page_description: `Hello, ${req.user.display_name}!` });
});

module.exports = router;
