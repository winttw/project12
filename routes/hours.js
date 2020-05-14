var express = require('express');
var router = express.Router();
const {User} = require('../models/user.model');
const {Task} = require('../models/task.model');
const {Company} = require('../models/company.model')
const moment = require('moment');

/* GET home page. */
router.get('/', async function(req, res, next) {
    const days_arr = {};
    const selected_week = moment().startOf('isoWeek').format('LL') + ' - ' + moment().endOf('week').format('LL')
    for (let window of req.user.time_windows.filter(val => val.shift_start > moment().startOf('week').valueOf())) {
        const work_time = (!window.shift_end ? Date.now() : window.shift_end) - window.shift_start
        const lunch_time = (!window.lunch_end && window.lunch_start ? window.shift_end ? window.shift_end : Date.now() : window.lunch_end) - window.lunch_start
        const total_time = work_time - lunch_time;
        if (days_arr[moment(window.shift_start).isoWeekday()]) days_arr[moment(window.shift_start).isoWeekday()]+=total_time
        else days_arr[moment(window.shift_start).isoWeekday()] = total_time
        // console.log(moment(window.shift_start - 518400000).format('dddd'));
    }
    function msToTime(s) {
        var pad = (n, z = 2) => ('00' + n).slice(-z);
        return pad(s/3.6e6|0) + ':' + pad((s%3.6e6)/6e4 | 0) + ':' + pad((s%6e4)/1000|0);
    }
    res.render('hours', { title: 'Hour Overview', page_description: 'Here is an overview of your work this week...', days_arr, selected_week, msToTime });
    console.log(Object.keys(days_arr).length)
});

module.exports = router;

