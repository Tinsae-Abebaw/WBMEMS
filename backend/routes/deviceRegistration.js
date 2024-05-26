// routes/registration.js
const express = require('express');
const router = express.Router();
const Inventorys = require('../models/Inventory');
const Manuals = require('../models/Manuals');
const multer  = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Destination folder for storing images
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage });

// POST create a new user with image upload
router.post('/', upload.fields([
  { name: 'equipmentImage', maxCount: 1 },
  { name: 'userManual', maxCount: 1 },
  { name: 'serviceManual', maxCount: 1 }
]), async (req, res) => {
  const {
    equipmentName, model, serialNumber, equipmentDepartment, preventiveMaintenancePerAnnual,
    equipmentDescription, maintenanceHistory, manufacturer,
    countryOfOrigin, warrantyExpiryDate, status
  } = req.body;
  
  const equipmentImage = req.files['equipmentImage'] ? req.files['equipmentImage'][0].path : null;
  const userManual = req.files['userManual'] ? req.files['userManual'][0].path : null;
  const serviceManual = req.files['serviceManual'] ? req.files['serviceManual'][0].path : null;

  try {
    const newDevice = await Inventorys.create({
      equipmentName, model, serialNumber, equipmentDepartment,
      equipmentDescription, maintenanceHistory, manufacturer, preventiveMaintenancePerAnnual,
      countryOfOrigin, warrantyExpiryDate, equipmentImage, status
    });

    const newManuals = await Manuals.create({
      serialNumber, userManual, serviceManual
    });

    res.json({ newDevice, newManuals });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.get('/manuals', async (req, res) => {
  const { serialNumber } = req.query; // Use req.query to get query parameters

  try {
    // Find manuals by serial number
    const manuals = await Manuals.findOne({ where: { serialNumber } });

    if (manuals) {
      // If manuals found, send them in the response
      res.json(manuals);
    } else {
      // If no manuals found for the serial number, send null values for both manuals
      res.json({ userManual: null, serviceManual: null });
    }
  } catch (error) {
    console.error('Error fetching manuals:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route for downloading user manual
router.get('/userManuals/download/uploads/:userManuals', (req, res) => {
  const { userManuals} = req.params;
  const filePath = path.join(__dirname, '..', 'uploads', userManuals); // Adjust the path to your uploads folder
  res.download(filePath, (err) => {
    if (err) {
      console.error('Error downloading user manual:', err);
      res.status(500).send('Error downloading file');
    }
  });
});

// GET route for downloading service manual
router.get('/serviceManuals/download/uploads/:serviceManuals', (req, res) => {
  const { serviceManuals } = req.params;
  const filePath = path.join(__dirname, '..', 'uploads', serviceManuals); // Adjust the path to your uploads folder
  res.download(filePath, (err) => {
    if (err) {
      console.error('Error downloading service manual:', err);
      res.status(500).send('Error downloading file');
    }
  });
});

// GET all devices
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventorys.findAll({
      where:{
        status: 'Active'
      }
    });
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
///////////////////////////////////////
router.get('/Piechart', async (req, res) => {
  try {
    // Fetch data from the database
    const inventory = await Inventorys.findAll();
    // Process data to get counts by category
    const countsByCategory = {};
    inventory.forEach(item => {
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
/////////////////////////////////////////////////






router.get('/byDepartment', async (req, res) => {
  try {
    // Fetch data from the database
    const inventory = await Inventorys.findAll();
    // Process data to get counts by category
    const countsByCategory = {};
    inventory.forEach(item => {
      countsByCategory[item.equipmentDepartment] = countsByCategory[item.equipmentDepartment] ? countsByCategory[item.equipmentDepartment] + 1 : 1;
    });

    // Convert data to format expected by frontend
    const pieChartData = Object.keys(countsByCategory).map(equipmentDepartment => ({
      equipmentDepartment,
      count: countsByCategory[equipmentDepartment]
    }));
    res.json(pieChartData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
////////////////////////////////////////////////


router.get('/disposed', async (req, res) => {
  try {
    const disposed = await Inventorys.findAll({
      where: {
        status : 'disposed'
      }
    });
    res.json(disposed);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//post by device id
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    let disposal = await Inventorys.findByPk(req.params.id);
    if (!disposal) {
      return res.status(404).json({ msg: ' not found' });
    }
    disposal.status = status;
    await disposal.save();
    res.json(disposal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE a device by ID
router.delete('/:id', async (req, res) => {
  const deviceId = req.params.id;
  try {
    const deletedDevice = await Disposed.destroy({
      where: {
        id: deviceId
      }
    });

    if (deletedDevice) {
      res.json({ message: 'Device deleted successfully' });
    } else {
      res.status(404).json({ error: 'Device not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



router.get('/getByDepartment', async(req, res) => {
 try{
  const equipment = req.query.equipmentDepartment;
  const devices = await Inventorys.findAll({
    where:{
        equipmentDepartment: equipment
    }
  });
  // Send the filtered equipments as response
  res.json(devices);
  console.log('devices:',devices);
 }catch(error){
     console.error(error.message);
 } 
});

//get by id
router.get('/getById', async(req,res)=>{
  try{
    const equipment = req.query.id;
  const devices = await Inventorys.findAll({
    where:{
      id: equipment
  }
  })
  res.json(devices);

  }catch(error){
    console.error('the error is:', error.message);
  }
  
})

module.exports = router;
