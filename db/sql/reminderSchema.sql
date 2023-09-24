CREATE TABLE reminders (
    reminder_id INT NOT NULL PRIMARY KEY,
    message TEXT,
    remind_time TEXT,
    server_id INT,
    user TEXT
);