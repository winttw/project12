var express = require('express');
var router = express.Router();
const {User} = require('../models/user.model');
const {Task} = require('../models/task.model');
const {Event} = require('../models/event.model');
const moment = require('moment');

/* GET home page. */
router.get('/', async function(req, res, next) {
    const weekday_of_first_month_day = moment().startOf('month');
    const first_sunday = weekday_of_first_month_day.day(0)
    const calendar = {};
    const events = await Event.find({}).exec()
    const selected_month = moment().format('MMMM, YYYY')
    for (let x = 0; x < 42; x++) {
        const day_number = x > 0 ? moment(first_sunday.add(1, 'days')) : first_sunday;
        calendar[x] = {
            extra: day_number.isSame(moment(), 'month') ? day_number.isSame(moment(), 'day') ? 2 : 1 : 0,
            day: day_number.format('D'), 
            tasks: await Task.find({$and: [{'time_alloted.task_end': {$gt: day_number.startOf('day').valueOf()}}, {'time_alloted.task_start': {$lt: day_number.endOf('day').valueOf()}}, {status: 1}]}).exec(),
            events: events.filter(val => val.time_alloted.task_end > day_number.startOf('day').valueOf() && val.time_alloted.task_start < day_number.endOf('day').valueOf())
        }
    }
    const users_doc = await User.find({status: 1}).exec();
    res.render('calendar', { title: 'Calendar', active_users: users_doc, calendar, events, selected_month, page_description: `Here is what is going on this month!` });
});

module.exports = router;