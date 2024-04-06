import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './pages/Home/Home';
import Inventory from './pages/Inventory/Inventory';
import WorkOrder from './WorkOrder/WorkOrder';
import AnnouncementForm from './Announcement/Announcement';
import Dashboard from './pages/Home/Dashboard';
import AnnouncementDisplay from './announcementDisplay/AnnouncementDisplay';
import StaffInformation from './StaffInformation/StaffInformation';
import DeviceOverview from './DeviceOverview/DeviceOverview';
import DoctorDashboard from './DashboardForDoctors/DoctorDashboard';
import DoctorDeviceShow from './DashboardForDoctors/DoctorDeviceShow';
import DoctorMakeRequest from './DashboardForDoctors/DoctorMakeRequest';
import Requested from './Requested/Requested';
import RequestHistory from './DashboardForDoctors/RequestHistory';
import DoctorAnnouncement from './DashboardForDoctors/DoctorAnnouncement';
import DisposedDevices from './DisposedDevices/DisposedDevices';
import SortByDepartment from './SortByDepartment/SortByDepartment';
import DoctorSortByDep from './DashboardForDoctors/DoctorSortByDep';
import Request_options from './DashboardForDoctors/Requests/Request_options';
import ProcurementForm from './DashboardForDoctors/Requests/Procurement/Procurement.jsx';
import CalibrationForm from './DashboardForDoctors/Requests/Calibration/Calibration.jsx';
import MaintenanceForm from './DashboardForDoctors/Requests/Maintenance/Maintenance.jsx';
import SpecificationForm from './DashboardForDoctors/Requests/Specification/Specification.jsx';
import TrainingForm from './DashboardForDoctors/Requests/Training/Training.jsx';
import InstallationForm from './DashboardForDoctors/Requests/Installation/Installation.jsx';
import SortByRequestType from './RequestedIssues/ShowRequests.jsx';
import RequestForEngineer from './DashBoardForEngineers/RequestForENgineer/RequestForEngineer.jsx';
import EngineerDashboard from './DashBoardForEngineers/EngineerDashboard.jsx';
import Request_optionsEngineer from './DashBoardForEngineers/Requests/Request_options.jsx';
import SpecificationFormEngineer from './DashBoardForEngineers/Requests/Specification/Specification.jsx';
import InstallationFormEngineer from './DashBoardForEngineers/Requests/Installation/Installation.jsx';
import CalibrationFormEngineer from './DashBoardForEngineers/Requests/Calibration/Calibration.jsx';
import ProcurementFormEngineer from './DashBoardForEngineers/Requests/Procurement/Procurement.jsx';
import MaintenanceFormEngineer from './DashBoardForEngineers/Requests/Maintenance/Maintenance.jsx';
import TrainingFormEngineer from './DashBoardForEngineers/Requests/Training/Training.jsx';
import EngineerAnnouncement from './DashBoardForEngineers/EngineerAnnouncement.jsx';
import SortByReportType from './Report/ShowReport.jsx';
import CreateAccount from './CreateAccount/CreateAccount.jsx';
import EngineerDeviceShow from './DashBoardForEngineers/EngineerDeviceShow.jsx';
import EngineerSortByDep from './DashBoardForEngineers/EngineerSortByDep.jsx';
import ScheduleMaintenanceForm from './ScheduleMaintenance/scheduleMaintenance.jsx';
import InventoryCalendar from './Calandar/Calandar.jsx';
import EngineerInventoryCalendar from './DashBoardForEngineers/Calandar/Calandar.jsx';
import DoctorTrackChanges from './DashboardForDoctors/TrackChanges/TrackChanges.jsx';
import EngineerTrackChanges from './DashBoardForEngineers/TrackChanges/TrackChanges.jsx';
import AdminstratorDashboard from './DashboardforAdmin/DashboardAdmin.jsx';
import Contract from './DashboardforAdmin/Contract/Contract.jsx';
import AdminDeviceOverview from './DashboardforAdmin/DeviceShowAdmin.jsx';
import RequestedAdmin from './DashboardforAdmin/RequestedAdmin.jsx';
import ViewAllRequest from './DashboardforAdmin/ViewAllRequests/ViewAllRequest.jsx';

import AdminTrainingManagement from './DashboardforAdmin/Training/Training.jsx';
import DoctorTrainingManagement from './DashboardForDoctors/Training/Training.jsx';
import EngineerTrainingManagement from './DashBoardForEngineers/Training/Training.jsx';
import TrainingManagement from './Training/Training.jsx';
import RadiologistDashboard from './Radiologist/Dashboard/dashboard.jsx';
import RadiologistDeviceOverview from './Radiologist/deviceOverview/deviceOverview.jsx';
import Request_options_Radiologist from './Radiologist/Requests/Request_options.jsx';
import RadiologistProcurementForm from './Radiologist/Requests/Procurement/Procurement.jsx';
import RadiologistCalibrationForm from './Radiologist/Requests/Calibration/Calibration.jsx';
import RadiologistMaintenanceForm from './Radiologist/Requests/Maintenance/Maintenance.jsx';
import RadiologistSpecificationForm from './Radiologist/Requests/Specification/Specification.jsx';
import RadiologistTrainingForm from './Radiologist/Requests/Training/Training.jsx';
import RadiologistInstallationForm from './Radiologist/Requests/Installation/Installation.jsx';
import RadiologistTrackChanges from './Radiologist/TrackChanges/TrackChanges.jsx';
import RadiologistTrainingManagement from './Radiologist/Training/Training.jsx';
import AdminDisplayAnnouncement from './DashboardforAdmin/AdminAnnouncement.jsx';
import AdminInventoryCalendar from './DashboardforAdmin/Calandar/Calandar.jsx';
import RadiologistDisplayAnnouncement from './Radiologist/announcement/AdminAnnouncement.jsx';



function App() {
  return (
     <Router>
      <div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path='/Inventory' element={<Inventory/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/Calendar' element={<InventoryCalendar/>}/>
          <Route path='/Schedule' element={<ScheduleMaintenanceForm/>}/>
          <Route path='/TrainingManagement' element={<TrainingManagement/>}/>

          <Route path='/workorder' element={<WorkOrder/>}/>
          <Route path='/Announcement' element={<AnnouncementForm/>}/>
          <Route path='/AnnouncementDisplay' element={<AnnouncementDisplay/>}/>
          <Route path='/CreateAccount' element={<CreateAccount/>}/>       
          <Route path='/StaffInformation' element={<StaffInformation/>}/> 
          <Route path='/DeviceOverview' element={<DeviceOverview/>}/> 
          <Route path='/DoctorDashboard' element={<DoctorDashboard/>}/>  
          <Route path='/DoctorDeviceShow' element={<DoctorDeviceShow/>}/> 
          <Route path='/DoctorMakeRequest' element={<DoctorMakeRequest/>}/> 
          <Route path='/Requested' element={<SortByRequestType/>}/> 
          <Route path='/DoctorRequestHistory' element={<DoctorTrackChanges/>}/> 
          <Route path='/DoctorAnnouncement' element={<DoctorAnnouncement/>}/> 
          <Route path='/DoctorTrainingManagement' element={<DoctorTrainingManagement/>}/> 
          <Route path='/DisposedDevices' element={<DisposedDevices/>}/> 
          <Route path='/SortByDepartment' element={<SortByDepartment/>}/> 
          <Route path='/DoctorSortByDep' element={<DoctorSortByDep/>}/>
          <Route path='/Requests' element={<Request_options/>}/>
          <Route path='/RequestsByEngineer' element={<Request_optionsEngineer/>}/>
          <Route path='/EngineerDashBoard' element={<EngineerDashboard/>}/>
          <Route path='/EngineerCalendar' element={<EngineerInventoryCalendar/>}/>
          <Route path='/EngineerDeviceShow' element={<EngineerDeviceShow/>}/>
          <Route path='/EngineerSortByDep' element={<EngineerSortByDep/>}/>
          <Route path='/EngineerTrainingManagement' element={<EngineerTrainingManagement/>}/>
          <Route path='/EngineerRequestHistory' element={<EngineerTrackChanges/>}/>
          <Route path='/RequestsForEngineer' element={<RequestForEngineer/>}/>
          <Route path='/Requests/Procurement' element={<ProcurementForm/>}/>
          <Route path='/Requests/Calibration' element={<CalibrationForm/>}/>
          <Route path='/Requests/Maintenance' element={<MaintenanceForm/>}/>
          <Route path='/Requests/Specification' element={<SpecificationForm/>}/>
          <Route path='/Requests/Training' element={<TrainingForm/>}/>
          <Route path='/Requests/Installation' element={<InstallationForm/>}/>
          <Route path='/RequestsByEngineer/Procurement' element={<ProcurementFormEngineer/>}/>
          <Route path='/RequestsByEngineer/Calibration' element={<CalibrationFormEngineer/>}/>
          <Route path='/RequestsByEngineer/Maintenance' element={<MaintenanceFormEngineer/>}/>
          <Route path='/RequestsByEngineer/Specification' element={<SpecificationFormEngineer/>}/>
          <Route path='/RequestsByEngineer/Training' element={<TrainingFormEngineer/>}/>
          <Route path='/RequestsByEngineer/Installation' element={<InstallationFormEngineer/>}/>
          <Route path='/EngineerAnnouncement' element={<EngineerAnnouncement/>}/>
          <Route path='/Report' element={<SortByReportType/>}/>
          <Route path='/AdminContract' element={<Contract/>}/>
          <Route path='/AdminstratorDashboard' element={<AdminstratorDashboard/>}/>
          <Route path='/AdminDisplayAnnouncement' element={<AdminDisplayAnnouncement/>}/>
          <Route path='/AdminInventoryCalendar' element={<AdminInventoryCalendar/>}/>
          <Route path='/AdminDeviceOverview' element={<AdminDeviceOverview/>}/>
          <Route path='/RequestedAdmin' element={<RequestedAdmin/>}/>
          <Route path='/ViewAllRequestAdmin' element={<ViewAllRequest/>}/>
          <Route path='/AdminTrainingManagement' element={<AdminTrainingManagement/>}/>
          <Route path='/RadiologistDashboard' element={<RadiologistDashboard/>}/>
          <Route path='/RadiologistDeviceOverview' element={<RadiologistDeviceOverview/>}/>
          <Route path='/RadiologistDisplayAnnouncement' element={<RadiologistDisplayAnnouncement/>}/>
          <Route path='/Request_options_Radiologist' element={<Request_options_Radiologist/>}/>
          <Route path='/Request_options_Radiologist/Procurement' element={<RadiologistProcurementForm/>}/>
          <Route path='/Request_options_Radiologist/Calibration' element={<RadiologistCalibrationForm/>}/>
          <Route path='/Request_options_Radiologist/Maintenance' element={<RadiologistMaintenanceForm/>}/>
          <Route path='/Request_options_Radiologist/Specification' element={<RadiologistSpecificationForm/>}/>
          <Route path='/Request_options_Radiologist/Training' element={<RadiologistTrainingForm/>}/>
          <Route path='/Request_options_Radiologist/Installation' element={<RadiologistInstallationForm/>}/>
          <Route path='/RadiologistTrackChanges' element={<RadiologistTrackChanges/>}/>
          <Route path='/RadiologistTrainingManagement' element={<RadiologistTrainingManagement/>}/>
          
          
          
          
        </Routes>
      </div>
    </Router>

  );
}

export default App;