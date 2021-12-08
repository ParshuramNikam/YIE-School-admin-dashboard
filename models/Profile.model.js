const mongoose = require("mongoose");

const schoolProfileSchema =  new mongoose.Schema({
    name: String,
    school: String,
    schoolId: {
        type: Number,
        unique: true,
    },
    adminId: {
        type: Number,
        unique: true,
    }, 
    address: String,
    noOfEmp: Number,
    totalClasses: Number,
    overallCompletion: Number,
    contact: Number,
})
const SchoolProfile = mongoose.model('schoolProfile', schoolProfileSchema);
// download aggregate prodifile :- make new schema for that;

const TeacherProfile = new mongoose.model('teacherProfile', new mongoose.Schema({
    name: String,
    id: {
        type: Number,
        unique: true,
        require: true
    },
    subjects: String,
    delegation: {
        type: String,
        default: "N/A",
    },
    accessRights: String,
    contact: Number,
    school: schoolProfileSchema,
}) )

const StudentProfile = new mongoose.model('studentProfie', new mongoose.Schema({
    name: String,
    id: {
        type: Number,
        unique: true,
        require: true
    },
    profileUrl: String,
    accessRights: String,
    contact: Number,
    school: schoolProfileSchema,
}) )


//  =========== NOTICE ===========

const ReachSchema = new mongoose.Schema({
    // type: String,
    many: Boolean,
    receivers: [String],
    info: {}
})

const Notice = mongoose.model("Notice", new mongoose.Schema({
    class: Number,
    department: String,
    heading: String,
    content: String,
    date: Date,
    url: String,
    school: schoolProfileSchema,
    reach: ReachSchema
}));

module.exports = { SchoolProfile, TeacherProfile, StudentProfile, Notice }