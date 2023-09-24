const Reminder = require('../models/reminder');

Reminder.sync({alter: true});
// Reminder.sync({alter: true});