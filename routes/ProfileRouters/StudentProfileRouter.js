const StudentProfileRouter = require("express").Router();
const { StudentProfile, SchoolProfile} = require("../../models/Profile.model.js");

// Create new Profile for teacher
StudentProfileRouter.post('/', async(req,res)=>{
    try {
        const {name, id, profileUrl, schoolId, accessRights, contact } = req.body;
        
        const schoolDetails = await SchoolProfile.findOne({schoolId});
        if(!schoolDetails) return res.status(400).send({status: "failed", message: "School Id not found in DB."});

        const newStudentProfile = new StudentProfile({
            name, id, profileUrl, schoolId, accessRights, contact,
            school: schoolDetails
        });
        await newStudentProfile.save();

        res.status(200).send(newStudentProfile)
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message})
    }
})

// get all teacher profiles
StudentProfileRouter.get('/', async (req,res)=>{
    try {
        const studentProfiles = await StudentProfile.find({});
        res.status(200).send(studentProfiles);
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message})
    }
})

StudentProfileRouter.get('/:id', async (req,res)=>{
    try {
        const id = req.params.id;
        const studentProfile = await StudentProfile.findOne({id});
        res.status(200).send(studentProfile);
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message})
    }
})

//  delete teacher profile
StudentProfileRouter.delete('/:id', async (req,res)=>{
    try {
        const id = req.params.id;
        const deletedStudentProfile = await StudentProfile.deleteOne({id});
        res.status(200).send({message: "Student profile deleted Successfully!", deletedStudentProfile})
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message})
    }
})

module.exports = StudentProfileRouter;