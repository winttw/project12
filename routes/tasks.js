var express = require('express');
var router = express.Router();
const {User} = require('../models/user.model');
const {Task} = require('../models/task.model');
const {Company} = require('../models/company.model');

/* GET home page. */
router.get('/', async function(req, res, next) {
    const tasks = await Task.find({}).populate('employees').exec()
    const team_members = req.user.company ? await User.find({'company': req.user.company._id}) : []
    res.render('tasks', { title: 'Manage Tasks', tasks, page_description: `Here is what you are working on...`, team_members });
});

module.exports = router;
