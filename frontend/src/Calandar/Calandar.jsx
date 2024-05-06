import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Calandar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Home from '../pages/Home/Home';

const localizer = momentLocalizer(moment);

const InventoryCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const calculateNextMaintenanceDates = (createdAt, preventiveMaintenancePerAnnual) => {
    const creationDate = moment(createdAt);
    const interval = 12 / preventiveMaintenancePerAnnual; // Calculate interval in months
    const nextMaintenanceDates = [];
    const startDate = moment(createdAt).add(interval, 'months'); // Start scheduling from the next maintenance date

    // Schedule maintenance dates starting from the next maintenance date after createdAt
    while (startDate.isBefore(moment().add(5, 'years'))) { // Limit scheduling until the next 5 years
      nextMaintenanceDates.push(startDate.toDate()); // Add next maintenance date
      startDate.add(interval, 'months'); // Increment by interval
    }

    return nextMaintenanceDates;
  };

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/contract/inventory');
      const inventory = response.data;

      const eventsData = inventory.flatMap(item => {
        const nextMaintenanceDates = calculateNextMaintenanceDates(item.createdAt, item.preventiveMaintenancePerAnnual);

        return nextMaintenanceDates.map(date => ({
          id: `${item.id}_${date.getTime()}`, // Using getTime to ensure unique IDs
          title: 'Preventive Maintenance',
          start: date,
          end: date,
          allDay: true,
          equipmentName: item.equipmentName,
          model: item.model,
          department: item.equipmentDepartment,
        }));
      });
      const calendarResponse = await axios.get('http://localhost:7000/api/requestOptions/calendarEvent');
      const calendarEvents = calendarResponse.data.map(event => ({
        id: `calendar_${event.id}`,
        title: event.title,
        start: moment(event.eventDate).add(1,'days'), // Adjusted date creation
        end: moment(event.eventDate).add(1,'days'), // Adjusted date creation
        allDay: true,
        equipmentName: event.equipmentName,
        model: event.equipmentModel,
        department: event.department,
        AssignedTo:event.assignedTo,
      }));

      
      setEvents([...eventsData,...calendarEvents]);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const EventComponent = ({ event }) => (
    <div className="event">
      <div className="event-title">{event.title}</div>
    </div>
  );

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleSelectSlot = (slotInfo) => {
    // Implement your functionality when a slot is selected
    console.log('Slot selected:', slotInfo);
    // Example: Show a dialog to create a new event for the selected slot
    // You can use a state to manage the dialog visibility and store the selected slot information
  };

  return (
    <div>
      <div className='device-main-calender'>
        <div><Home/></div>
        <h2>Calendar</h2>
      </div>
      <Calendar
        className="calendar-container"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '500px' }}
        components={{ event: EventComponent }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={(event, start, end, isSelected) => {
          const newStyle = {
            backgroundColor: 'some-color',
            borderRadius: '0px',
            border: 'none',
            color: 'white',
            fontSize: '12px',
          };
          return {
            style: newStyle,
          };
        }}
        resizable
        draggable
        onSelectSlot={handleSelectSlot}
      />
      {selectedEvent && (
        <div className="modal-calendar">
          <div className="modal-content-calendar">
            <div className='the-block'>
              <h2>{selectedEvent.title}</h2>
              <p><strong>Equipment Name:</strong> {selectedEvent.equipmentName}</p>
              <p><strong>Model:</strong> {selectedEvent.model}</p>
              <p><strong>Department:</strong> {selectedEvent.department}</p>
            </div>
            <span className="detail-close" onClick={handleCloseModal}>&times;</span>

          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryCalendar;
