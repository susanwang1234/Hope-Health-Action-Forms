const scheduler = require('node-schedule');
let rule = new scheduler.RecurrenceRule();
rule.month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
rule.hour = 0;
rule.minute = 0;
rule.second = 0;
