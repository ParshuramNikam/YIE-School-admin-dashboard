const express = require("express");
// const Notice = require("../Models/Notice.model.js");
const { Notice, SchoolProfile } = require("../models/Profile.model.js");
const NoticeRouter = new express.Router();

NoticeRouter.get('/', (req, res) => {
  Notice.find({}).then((data) => {
    res.send(data)
  }).catch((error) => res.send({ error: error.messsage }))
})

// get specific notices
NoticeRouter.get('/specific', (req, res) => {
  const { heading, date, _id } = req.body;
  Notice.find({ $or: [{ _id }, { heading }, { date }] }).then((data) => {
    res.send(data)
  }).catch((error) => res.send({ error: error.messsage }))
})

NoticeRouter.post('/', async (req, res) => {
  const { classNumber, department, url, heading, description, recipients, date, file, info } = req.body
  const { schoolId } = req.body;

  console.log(req.body);
  console.log("file", file);

  const schoolDetails = await SchoolProfile.findOne({ schoolId });
  if (!schoolDetails) return res.status(400).send({ message: "School not found!" })
  console.log(schoolDetails);

  let manyRecepients = false;
  console.log(recipients);
  const receivers = recipients.split(',');
  if (receivers.length > 1) manyRecepients = true;

  const notice = new Notice({
    classNumber,
    department,
    heading,
    content: description,
    date,
    url,
    reach: {
      // type: reach.type,
      many: manyRecepients,
      info: info,
      receivers: receivers,
    },
    school: schoolDetails,
  })


  // res.send(req.body)
  notice.save().then(() => {
    console.log(notice);
    res.send(notice)
  }).catch(e => {
    res.send(e)
  }).catch((error) => {
    console.log(error);
    res.send({ message: error.messsage, error })
  }
  )
})

NoticeRouter.delete('/:id', (req, res) => {
  try {
    Notice.deleteOne({ _id: req.params.id }).then(notice => {
      console.log(notice);
      res.status(200).json({ message: "Notice deleted" });
    });
  } catch (error) {
    res.status(400).send({ message: error.message })
  }

})

module.exports = NoticeRouter