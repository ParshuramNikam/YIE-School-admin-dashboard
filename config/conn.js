const mongoose = require('mongoose');

const conn = mongoose.connect('mongodb://127.0.0.1:27017/school-admin-dashboard', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('mongoose connected'))
    .catch((err) => console.log(err))

module.exports = conn;