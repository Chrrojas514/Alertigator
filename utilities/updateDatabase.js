const Reminder = require(`../models/reminder`);

Reminder.sync({force: true}); // WARNING - CLEARS EVERYTHING CURRENTLY IN DB