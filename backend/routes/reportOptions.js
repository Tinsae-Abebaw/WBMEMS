const express = require('express');
const router = express.Router();
const AllReports = require('../models/AllReports');
const Requests = require('../models/AllRequests');
const { Op } = require('sequelize');


// GET all reports 
router.get('/', async (req, res) => {
  try {
    const reports = await AllReports.findAll({
      
    });
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET reports by Type 

router.get('/getByReportType', async(req, res) => {
  try{
   const reportType = req.query.reportType;
   const reports = await AllReports.findAll({
     where:{
         
         reportType: reportType,
     }
   });
   // Send the filtered equipments as response
   res.json(reports);
   console.log('reports:',reports);
  }catch(error){
      console.error(error.message);
  } 
 });


// Route for inserting maintenance form data
router.post('/maintenaceReport', async (req, res) => {
  try {
    const {
      id,  
      equipmentName,
      equipmentType,
      department,
      Model,
      serialNumber,
      manufacturer,
      reportType,
      requestedBy,
      doneBy,
      location,
      maintenanceDescription,
      tasksPerformed,
      repair,
      natureOfBreakage,
      replacement,
      replacedSparePart,
      replacementCost,
      complianceWithGuidelines,
      verifyFunctionality,
      durationInHours,
      majorComplaint,
      recommendation,
      reportDate,
      // Add other form fields as needed
    } = req.body;

    // Insert the form data into the AllReports table
    const newMaintenanceReport = await AllReports.create({
      id,
      equipmentName,
      equipmentType,
      department,
      Model,
      serialNumber,
      manufacturer,
      reportType,
      requestedBy,
      doneBy,
      location,
      maintenanceDescription,
      tasksPerformed,
      repair,
      natureOfBreakage,
      replacement,
      replacedSparePart,
      complianceWithGuidelines,
      verifyFunctionality,
      durationInHours,
      majorComplaint,
      recommendation,
      reportDate,
      replacementCostInETB:replacementCost,
      // Add other form fields as needed
    });

    // Update the status to "Completed" in the Requests table
    await Requests.update(
      { status: 'Completed' },
      {
        where: {
          id: id, // Assuming requestedBy holds the id of the request in the Requests table
        },
      }
    );

    // You can send a success response or the new maintenance report data in the response
    res.status(201).json({ success: true, data: newMaintenanceReport });
  } catch (error) {
    console.error('Error inserting maintenance form data:', error);
    // Handle the error and send an appropriate response
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


router.post('/calibrationReport', async (req, res) => {
    try {
      const {
        id,
            equipmentName,
            equipmentType,
            department,
            Model,
            manufacturer,
            serialNumber,
            reportType,
            requestedBy,
            location,
            visualInspection,
            visibleDamageBefore,
            partsReplacedOrRepaired,
            replacementCost,
            environmentalConditions,
            referenceStandards,
            proceduresDescription,
            complianceWithGuidelines,
            adjustmentsMade,
            adjustments,
            deviationFromStandard,
            correctiveAction,
            calibrationResultsSummary,
            verifyFunctionality,
            durationInHours,
            recommendation,
            doneBy,
            reportDate,
        // Add other form fields as needed
      } = req.body;
  
      // Insert the form data into the AllReports table
      const newCalibrationReport = await AllReports.create({
        id,
        equipmentName,
            equipmentType,
            department,
            Model,
            manufacturer,
            serialNumber,
            reportType,
            requestedBy,
            location,
            visualInspection,
            visibleDamageBefore,
            replacedSparePart:partsReplacedOrRepaired,
            replacementCost,
            replacementCostInETB:environmentalConditions,
            referenceStandards,
            proceduresDescription,
            complianceWithGuidelines,
            adjustmentsMade,
            adjustments,
            deviationFromStandard,
            correctiveAction,
            calibrationResultsSummary,
            verifyFunctionality,
            durationInHours,
            recommendation,
            doneBy,
            reportDate,
        // Add other form fields as needed
      });
  
      // Update the status to "Completed" in the Requests table
      await Requests.update(
        { status: 'Completed' },
        {
          where: {
            id: id, // Assuming requestedBy holds the id of the request in the Requests table
          },
        }
      );
  
      // You can send a success response or the new calibration report data in the response
      res.status(201).json({ success: true, data: newCalibrationReport });
    } catch (error) {
      console.error('Error inserting calibration form data:', error);
      // Handle the error and send an appropriate response
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  router.post('/specificationReport', async (req, res) => {
    try {
      const {
        id,
        equipmentName,
        equipmentType,
        department,
        Model,
        serialNumber,
        manufacturer,
        reportType,
        requestedBy,
        purpose,
        specificationDetail,
        durationInHours,
        majorComplaint,
        recommendation,
        doneBy,
        reportDate,
        // Add other form fields as needed
      } = req.body;
  
      // Insert the form data into the SpecificationReports table
      const newSpecificationReport = await AllReports.create({
        id,
        equipmentName,
        equipmentType,
        department,
        Model,
        serialNumber,
        manufacturer,
        reportType,
        requestedBy,
        purpose,
        specificationDetail,
        durationInHours,
        majorComplaint,
        recommendation,
        doneBy,
        reportDate,
        // Add other form fields as needed
      });

      await Requests.update(
        { status: 'Completed' },
        {
          where: {
            id: id, // Assuming requestedBy holds the id of the request in the Requests table
          },
        }
      );
  
      // You can send a success response or the new specification report data in the response
      res.status(201).json({ success: true, data: newSpecificationReport });
    } catch (error) {
      console.error('Error inserting specification form data:', error);
      // Handle the error and send an appropriate response
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  // Route for inserting installation form data
router.post('/installationReport', async (req, res) => {
    try {
      const {
        id,
        equipmentName,
        equipmentType,
        department,
        Model,
        serialNumber,
        manufacturer,
        reportType,
        requestedBy,
        location,
        visualInspection,
        visibleDamageBefore,
        partsReplacedOrRepaired,
        replacementCost,
        accessoriesPresent,
        modificationsDuringInstallation,
        adjustmentsMade,
        complianceWithGuidelines,
        challengesOrIssuesEncountered,
        issuesAddressed,
        verifyFunctionality,
        safetyStandardsCompliance,
        durationInHours,
        recommendation,
        doneBy,
        reportDate,
        // Add other form fields as needed
      } = req.body;
  
      // Insert the form data into the InstallationReports table
      const newInstallationReport = await AllReports.create({
        id,
        equipmentName,
        equipmentType,
        department,
        Model,
        serialNumber,
        manufacturer,
        reportType,
        requestedBy,
        location,
        visualInspection,
        visibleDamageBefore,
        replacedSparePart:partsReplacedOrRepaired,
        replacementCostInETB:replacementCost,
        accessoriesPresent,
        modificationsDuringInstallation,
        adjustmentsMadeDuringInstallation:adjustmentsMade,
        complianceWithGuidelines,
        challengesOrIssuesEncountered,
        issuesAddressed,
        verifyFunctionality,
        safetyStandardsCompliance,
        durationInHours,
        recommendation,
        doneBy,
        reportDate,
        // Add other form fields as needed
      });

      await Requests.update(
        { status: 'Completed' },
        {
          where: {
            id: id, // Assuming requestedBy holds the id of the request in the Requests table
          },
        }
      );
  
      // You can send a success response or the new installation report data in the response
      res.status(201).json({ success: true, data: newInstallationReport });
    } catch (error) {
      console.error('Error inserting installation form data:', error);
      // Handle the error and send an appropriate response
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  //get by id
router.get('/getById', async(req,res)=>{
  try{
    const report = req.query.id;
  const reports = await AllReports.findAll({
    where:{
      id: report
  }
  })
  res.json(reports);

  }catch(error){
    console.error('the error is:', error.message);
  }
  
})
  




module.exports = router;
