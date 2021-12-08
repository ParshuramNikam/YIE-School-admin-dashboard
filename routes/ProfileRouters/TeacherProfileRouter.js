const TeacherProfileRouter = require("express").Router();
const { TeacherProfile, SchoolProfile } = require("../../models/Profile.model.js");

// Create new Profile for teacher
TeacherProfileRouter.post('/',async(req,res)=>{
    try {
        const {name, id, subjects, delegation, accessRights, contact, schoolId } = req.body;
        
        const schoolDetails = await SchoolProfile.findOne({schoolId});
        if(!schoolDetails) return res.status(400).send({status: "failed", message: "School Id not found in DB."});

        const newTeacherProfile = new TeacherProfile({
            name, id, subjects, delegation, accessRights, contact, schoolId,
            school: schoolDetails
        });
        await newTeacherProfile.save();

        res.status(200).send(newTeacherProfile)
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message})
    }
})

// get all teacher profiles
TeacherProfileRouter.get('/', async(req,res)=>{
    try {
        const TeacherProfiles = await TeacherProfile.find({});
        res.status(200).send(TeacherProfiles);
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message})
    }
})

TeacherProfileRouter.get('/:id', async (req,res)=>{
    try {
        const id = req.params.id;
        const teacherProfile = await TeacherProfile.findOne({id});
        res.status(200).send(teacherProfile);
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message})
    }
})

//  delete teacher profile
TeacherProfileRouter.delete('/:id', async (req,res)=>{
    try {
        const id = req.params.id;
        const deletedTeacherProfile = await TeacherProfile.deleteOne({id});
        res.status(200).send({message: "Teacher profile deleted Successfully!", deletedTeacherProfile})
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message})
    }
})

module.exports = TeacherProfileRouter;