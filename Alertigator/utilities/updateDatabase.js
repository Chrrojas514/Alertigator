const Reminder = require('../models/reminder');
const DailyNews = require('../models/News');
const CurrencyConversion = require('../models/conversion');

// Sync the models to generate tables in the database
DailyNews.sync({ force: true }); 
CurrencyConversion.sync({ force: true }); 
Reminder.sync({ force: true }); // WARNING - CLEARS EVERYTHING CURRENTLY IN DB
