const SchoolProfileRouter = require("express").Router();
const { SchoolProfile } = require("../../models/Profile.model.js");

// Add new School Profile
SchoolProfileRouter.post('/', async(req,res)=> {
    try {
        const {name, school, schoolId, adminId, address, noOfEmp, totalClasses, overallCompletion } = req.body;
        
        const newSchoolProfile = new SchoolProfile({
            name, school, schoolId, adminId, address, noOfEmp, totalClasses, overallCompletion
        });
        await newSchoolProfile.save();

        res.status(200).send(newSchoolProfile)
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message})
    }
})

//  get all schools data
SchoolProfileRouter.get('/', async(req,res)=>{
    try {
        const schoolProfiles = await SchoolProfile.find({});
        res.status(200).send(schoolProfiles);
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message})
    }
})

// get one specific scholl data b "schoolId";
SchoolProfileRouter.get('/:schoolId', async (req,res)=>{
    try {
        const schoolId = req.params.schoolId;
        const schoolProfile = await SchoolProfile.findOne({schoolId: schoolId});
        res.status(200).send(schoolProfile);
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message})
    }
})

// update school profile
SchoolProfileRouter.patch('/:schoolId', async(req,res)=>{
    try {
        console.log("updating...");
        const schoolId = req.params.schoolId;
        console.log(req.body);
        await SchoolProfile.findOneAndUpdate({schoolId : Number(schoolId)}, req.body);
        const updatedSchoolProfile = await SchoolProfile.findOne({schoolId});
        res.status(200).send({message: "School profile updated sucessfully", updatedSchoolProfile})
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message})
    }
})

//  delete school profile
SchoolProfileRouter.delete('/:schoolId', async (req,res)=>{
    try {
        const schoolId = req.params.schoolId;
        const deletedSchoolProfile = await SchoolProfile.deleteOne({schoolId});
        res.status(200).send({message: "school profile deleted Successfully!", deletedSchoolProfile})
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message})
    }
})

module.exports = SchoolProfileRouter;