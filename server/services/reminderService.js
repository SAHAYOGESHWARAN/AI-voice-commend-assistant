const nodemailer = require('nodemailer');
const User = require('../models/user');

// Setup email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Function to send reminders
const sendReminder = async () => {
    const users = await User.find({});

    users.forEach(user => {
        const pendingTasks = user.todos.filter(task => !task.completed);
        if (pendingTasks.length > 0) {
            const taskList = pendingTasks.map(task => task.task).join('\n');
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Task Reminder',
                text: `You have the following pending tasks:\n\n${taskList}`
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) console.error('Error sending email:', err);
                else console.log('Reminder sent:', info.response);
            });
        }
    });
};

// Schedule the reminders every 24 hours
setInterval(sendReminder, 24 * 60 * 60 * 1000);
