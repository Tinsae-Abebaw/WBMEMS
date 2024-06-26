// backend/routes/procurement.js
const express = require('express');
const router = express.Router();
const Requests=require('../models/AllRequests');
const { Op } = require('sequelize');
const User=require('../models/Users');
const CalendarEvent = require('../models/CalendarEvent');

// Route to handle the procurement form submission
router.post('/procurement', async (req, res) => {
  try {
    const { equipmentName,
      equipmentType,
      department,
      specification,
      procurementReason,
      requestDate,
      requestedBy,
      } = req.body;

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
      action: 'Administrator',
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
          
      equipmentModel,
      department,
      manufacturer,
      serialNumber,
      calibrationReason,
      calibrationType,
      calibrationDueDate,
      requestDate,
      requestedBy,
    } = req.body;

    // Create a new Calibration instance using the Sequelize model
    const calibration = await Requests.create({
      equipmentName:equipmentName,
      
      Model:equipmentModel,
      department:department,
      manufacturer,
      serialNumber,
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
      
      equipmentModel,
      manufacturer,
      serialNumber,
      department,
      issue,
      priority,
      dueDate,
      requestDate,
      requestedBy  } = req.body;

    // Create a new Maintenance instance using the Sequelize model
    const maintenance = await Requests.create({
          equipmentName:equipmentName,
          
          Model:equipmentModel,
          manufacturer,
          serialNumber,
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
      serialNumber,
      manufacturer,
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
      
      Model:model,
      serialNumber,
      manufacturer,
      department:department,
      traineeType:traineeType,
      trainingLevel:level,
      trainingDescription:description,
      trainingDuration:duration,
      requestDate,
      requestedBy,
      requestType:'training',
      action:'Administrator',
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
      
      model,
      manufacturer,
      serialNumber,
      department,
      specification,
      description,
      dueDate,
      requestDate,
      requestedBy
    } = req.body;

    // Create a new installation instance using the Sequelize model
    const installation = await Requests.create({
      equipmentName:equipmentName,
      
      Model:model,
      serialNumber:serialNumber,
      manufacturer:manufacturer,
      installationSpecification:specification,
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
      where: {
        requestType: {
          [Op.or]: ['Installation', 'Calibration', 'Maintenance', 'Specification']
        }
      }
    });
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
/////////////////////
router.get('/forAdmin', async (req, res) => {
  try {
    const requests = await Requests.findAll({
       where:{
        requestType:{
          [Op.or]: ['training', 'procurement']
        },
       }
      
    });
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
/////////////////////////////////////
router.get('/byStatus', async (req, res) => {
  try {
    // Fetch data from the database
    const requests = await Requests.findAll();
    // Process data to get counts by category
    const countsByCategory = {};
    requests.forEach(item => {
      countsByCategory[item.status] = countsByCategory[item.status] ? countsByCategory[item.status] + 1 : 1;
    });

    // Convert data to format expected by frontend
    const pieChartData = Object.keys(countsByCategory).map(status => ({
      status,
      count: countsByCategory[status]
    }));
    res.json(pieChartData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
///////////////////////
router.get('/RequestType', async (req, res) => {
  try {
    // Fetch data from the database
    const requests = await Requests.findAll();
    // Process data to get counts by category
    const countsByCategory = {};
    requests.forEach(item => {
      countsByCategory[item.requestType] = countsByCategory[item.requestType] ? countsByCategory[item.requestType] + 1 : 1;
    });

    // Convert data to format expected by frontend
    const pieChartData = Object.keys(countsByCategory).map(requestType => ({
      requestType,
      count: countsByCategory[requestType]
    }));
    res.json(pieChartData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
/////////////////////////////

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
// ... Get requests to Track changes
router.get('/trackchanges', async (req, res) => {
  try {
    const fullName = req.query.fullName;
    
    // List of RequestType values you want to include
    

    const requests = await Requests.findAll({
      where: {
        requestedBy: fullName,
       
      },
    });

    console.log(fullName);
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



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

// POST endpoint for form submission
router.post('/calendarEvent', async (req, res) => {
  try {
    const {
      equipmentName,
      equipmentModel,
      department,
      eventDate,
      title,
      assignedTo,
      
    } = req.body;

    // Create a new entry in the Inventory model
    await CalendarEvent.create({
      equipmentName,
      equipmentModel,
      department,
      title, 
      eventDate,
      assignedTo,
      
    });

    // Send a success response back to the client
    res.status(201).json({ message: 'calendar request submitted successfully' });
  } catch (error) {
    console.error('Error submitting calendar request:', error);
    // Send an error response back to the client
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// routes/calendarEvents.js


// GET endpoint to fetch calendar events
router.get('/calendarEvent', async (req, res) => {
  try {
    const events = await CalendarEvent.findAll();
    res.json(events);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





module.exports = router;