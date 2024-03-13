// backend/routes/procurement.js
const express = require('express');
const router = express.Router();
const Requests=require('../models/AllRequests');
const { Op } = require('sequelize');
const User=require('../models/Users');

// Route to handle the procurement form submission
router.post('/procurement', async (req, res) => {
  try {
    const { equipmentName,
      equipmentType,
      department,
      specification,
      procurementReason,
      requestDate,
      requestedBy  } = req.body;

    // Create a new Procurement instance using the Sequelize model
    const procurement = await Requests.create({
      equipmentName:equipmentName,
      equipmentType:equipmentType,
      department:department,
      procurementSpecification:specification,
      procurementReason:procurementReason,
      requestDate,
      requestedBy,
      requestType:'procurement',
    });

    res.status(201).json(procurement);
  } catch (error) {
    console.error('Error creating procurement:', error);
    res.status(500).json({ message: 'Error creating procurement' });
  }
});

// Route to handle the calibration form submission

router.post('/calibration', async (req, res) => {
  try {
    const { equipmentName,
    equipmentType,
    equipmentModel,
    department,
    calibrationReason,
    calibrationType,
    calibrationDueDate,
    requestDate ,
    requestedBy} = req.body;

    // Create a new Calibration instance using the Sequelize model
    const calibration = await Requests.create({
      equipmentName:equipmentName,
      equipmentType:equipmentType,
      Model:equipmentModel,
      department:department,
      calibrationReason:calibrationReason,
      calibrationType:calibrationType,
      calibrationDueDate:calibrationDueDate,
      requestDate,
      requestedBy,
      requestType:'calibration',
    });

    res.status(201).json(calibration);
  } catch (error) {
    console.error('Error creating calibration:', error);
    res.status(500).json({ message: 'Error creating calibration' });
  }
});

// Route to handle the maintenance form submission

router.post('/maintenance', async (req, res) => {
  try {
    const { equipmentName,
      equipmentType,
      equipmentModel,
      department,
      issue,
      priority,
      dueDate,
      requestDate,
      requestedBy  } = req.body;

    // Create a new Maintenance instance using the Sequelize model
    const maintenance = await Requests.create({
          equipmentName:equipmentName,
          equipmentType:equipmentType,
          Model:equipmentModel,
          department:department,
          maintenanceIssue:issue,
          maintenancePriority:priority,
          maintenanceDueDate:dueDate,
          requestDate,
          requestedBy,
          requestType:'maintenance',
    });

    res.status(201).json(maintenance);
  } catch (error) {
    console.error('Error creating maintenance:', error);
    res.status(500).json({ message: 'Error creating maintenance' });
  }
});

// Route to handle the specification form submission
router.post('/specification', async (req, res) => {
  try {
    const {
      equipmentName,
      equipmentType,
      model,
      serialNumber,
      manufacturer,
      department,
      description,
      dueDate,
      requestDate,
      requestedBy
    } = req.body;

    // Create a new Specification instance using the Sequelize model
    const specification = await Requests.create({
      equipmentName:equipmentName,
      equipmentType:equipmentType,
      Model:model,
      serialNumber:serialNumber,
      manufacturer:manufacturer,
      department:department,
      specificationDescription:description,
      specificationDueDate:dueDate,
      requestDate,
      requestedBy,
      requestType:'specification',
    });

    res.status(201).json(specification);
  } catch (error) {
    console.error('Error creating specification:', error);
    res.status(500).json({ message: 'Error creating specification' });
  }
});

// Route to handle the training form submission
router.post('/training', async (req, res) => {
  try {
    const {
      equipmentName,
      equipmentType,
      model,
      department,
      traineeType,
      level,
      description,
      duration,
      requestDate,
      requestedBy
    } = req.body;

    // Create a new training instance using the Sequelize model
    const training = await Requests.create({
      equipmentName:equipmentName,
      equipmentType:equipmentType,
      Model:model,
      department:department,
      traineeType:traineeType,
      trainingLevel:level,
      trainingDescription:description,
      trainingDuration:duration,
      requestDate,
      requestedBy,
      requestType:'training',
    });

    res.status(201).json(training);
  } catch (error) {
    console.error('Error creating training:', error);
    res.status(500).json({ message: 'Error creating training' });
  }
});

// Route to handle the installation form submission
router.post('/installation', async (req, res) => {
  try {
    const {
      equipmentName,
      equipmentType,
      model,
      serialNumber,
      manufacturer,
      department,
      description,
      dueDate,
      requestDate,
      requestedBy
    } = req.body;

    // Create a new installation instance using the Sequelize model
    const installation = await Requests.create({
      equipmentName:equipmentName,
      equipmentType:equipmentType,
      Model:model,
      serialNumber:serialNumber,
      manufacturer:manufacturer,
      department:department,
      installationDescription:description,
      installationDueDate:dueDate,
      requestDate,
      requestedBy,
      requestType:'installation',
    });

    res.status(201).json(installation);
  } catch (error) {
    console.error('Error creating installation:', error);
    res.status(500).json({ message: 'Error creating installation' });
  }
});









// GET all requests 
router.get('/', async (req, res) => {
  try {
    const requests = await Requests.findAll({
      
    });
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET requests by Type 

router.get('/getByRequestType', async(req, res) => {
  try{
   const requestType = req.query.requestType;
   const requests = await Requests.findAll({
     where:{
         
         requestType: requestType,
     }
   });
   // Send the filtered equipments as response
   res.json(requests);
   console.log('requests:',requests);
  }catch(error){
      console.error(error.message);
  } 
 });



// GET all requests for Engineers

router.get('/occupation', async (req, res) => {
  try {
    const fullName = req.query.fullName;
    
    // List of RequestType values you want to include
    const validRequestTypes = ['calibration', 'installation', 'maintenance', 'specification'];

    const requests = await Requests.findAll({
      where: {
        action: fullName,
        RequestType: {
          [Op.in]: validRequestTypes,
        },
      },
    });

    console.log(fullName);
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ...


// GET requests by Type for Engineers 

router.get('/occupation/getByRequestType', async(req, res) => {
  try{
   const requestType = req.query.requestType;
   const fullName = req.query.fullName;
   const requests = await Requests.findAll({
     where:{
         
         requestType: requestType,
         action:fullName,
     }
   });
   // Send the filtered requests as response
   res.json(requests);
   console.log('requests:',requests);
  }catch(error){
      console.error(error.message);
  } 
 });




// update status
 router.put('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    let request = await Requests.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ msg: ' not found' });
    }
    request.status = status;
    await request.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// update action
router.put('/action/:id', async (req, res) => {
  const { action } = req.body;
  try {
    const request = await Requests.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ msg: ' not found' });
    }
    request.action = action;
    await request.save();
    
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});





//get by id
router.get('/getById', async(req,res)=>{
  try{
    const request = req.query.id;
  const requests = await Requests.findAll({
    where:{
      id: request
  }
  })
  res.json(requests);

  }catch(error){
    console.error('the error is:', error.message);
  }
  
})
// GET all users

router.get('/users', async (req, res) => {
  try {
    const requests = await User.findAll({
      attributes: ['id','name','lastName'], // Specify the columns you want to retrieve
      where: {
        occupation: 'Engineer'
      },
    });
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});







module.exports = router;