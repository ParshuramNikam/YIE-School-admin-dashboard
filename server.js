const express = require('express');
const conn = require('./config/conn');
const cors = require('cors');
const NoticeRouter = require('./routes/NoticeRouter');
const SchoolProfileRouter = require('./routes/ProfileRouters/SchoolProfileRouter');
const StudentProfileRouter = require('./routes/ProfileRouters/StudentProfileRouter');
const TeacherProfileRouter = require('./routes/ProfileRouters/TeacherProfileRouter');


const app = express();
conn;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/profile/school', SchoolProfileRouter);
app.use('/profile/teacher', TeacherProfileRouter);
app.use('/profile/student', StudentProfileRouter);

app.use('/notice', NoticeRouter) 

app.listen('5000', ()=> console.log("server listening on 5000"))