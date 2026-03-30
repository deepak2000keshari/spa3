import FullCalendar from '@fullcalendar/react'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import resourcePlugin from '@fullcalendar/resource'
import interactionPlugin from '@fullcalendar/interaction'
import React, { useEffect, useRef, useState } from 'react'
import Slottime from './component/Slottime';
import {user,therapist} from '../API/API';
import useAuth from '../Hook/useAuth';
import './App.css';
import './calendar.css'
import  Navbar from './component/Navbar';
import FilterPanel from './component/filtter/FilterPanel';
import Booking from './component/Boking/Booking';
import BookingInterface from './component/Nbooking/BookingInterface'
function App() {
  const [events, setEvents] = useState([]);
  const [page,setpage] = useState(1);
  const [therapistData,settherapistData] = useState(null);
  const [slot,setslot] = useState(15);
  const [currentdate,setcurrentdate] = useState(new Date());
  const wrapperRef = useRef(null);
  let token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNGEyYzEwYjBkOWM5ZTJlOTAyNTlmZTA0MmM4NzNkMjk3OWRkY2M2NWYwYTU3NGFiYzMxYzRlOWI4ZmJiOTZlNDMzMzUwNWJiNWE5MDUzNTIiLCJpYXQiOjE3NzQ2ODgzNjkuNDA3MzM1LCJuYmYiOjE3NzQ2ODgzNjkuNDA3MzM4LCJleHAiOjE4MDYyMjQzNjkuMzk0MTcyLCJzdWIiOiIyMjkwNjEiLCJzY29wZXMiOltdfQ.fffAogbF3T_aBsR3atLMRiN3RHHgjjoIsUri5A36QKhKMC73j_3CTYLnfX0Yb9CIFNPWqrppZ2_SafB-BdC0-BRTM-KNL_9TzAzVoA8nn9J9xA6bOxfO1pk8-i21B_yTgPG2PZSp6qBTTD-Oh8EEjamM5Z1oqTmu84azFeqwOa137yspbK2wx4x67KdaPgOTa7NzFhoeo8xKcCePcachkz4t8zjt0X-RrxXUyRoahIRYxNt7_XQsfDooYgrgLtmIMgC62022lnlRzQEEhkj1K-QtuC8FFovkLW_kAOgg-YtzvKIFkusNyRwFTE3X5j_aFpmcwCDxMMtRunpmzhLGmefRZGWe5KRyHARFelPlbd6SXK9zQCo5Brf6bUuqlYDTI-0ZHBBxdmyqDyZe7Nw7bVAQOvRj0DAv7_ftFJuHSEWX7Sj-YkJqgo-P1sGHPCfb3n4E__4ewD6sSRlcE3aIrlzIW2UBBLHNIT8yfPPBnHfNLfgXyEJH_oE46QPl5kpax0U--JsBUQHP7LtF24O9G8SimABTE2WJs0b05qhlPXUd1FDZRALKnRZ8ilIvb46GyPucOhIlTtNoKMkC9c71KhM2-Jm9wYLHhwNs6seRC0bO1HtuKvwMmsp59u8yLcCEQX7hUAXz_uSU9XaIjP0XDDq-EghfQORGk2CxChX4Rxo';
  const calendarRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [NBopen, setNBOpen] = useState(false);
  const [currentTimeDate, setCurrentTimeDate] = useState(null);
  const [currenttherapist, setCurrentTherapist] = useState(null);
  const api = () => calendarRef.current?.getApi();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const d = new Date(currentdate);

        const formattedDate =
          d.getFullYear() +
          "-" +
          String(d.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(d.getDate()).padStart(2, "0");



        const data = await therapist(token, formattedDate);
        // data shape may vary; this handles both nested and direct list formats
        const list = data?.data?.data?.list || data?.data?.staffs || data?.data || data;
        settherapistData(list);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [page,currentdate]);
const users = Array.isArray(therapistData) ? therapistData : therapistData?.staffs || [];
const resource = users.map((value, index) => ({
  id: String(value.id ?? index),
  title: value.title || value.alias || 'Unknown',
  extendedProps: {
    gender: value.gender || 'N/A', 
  }
}));
  if (!therapistData) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading therapists...</div>;
  }

  const handleSelect = (info) => {
    setNBOpen(true);
    setCurrentTimeDate(info.start);
    setCurrentTherapist(info.resource._resource);
    const title = prompt("Enter Booking Title")
    if (title) {
      const newEvent = {
        title,
        start: info.startStr,
        end: info.endStr,
        resourceId: info.resource.id   
      }

      setEvents([...events, newEvent])
    }
  }

  console.log("setCurrentTherapist",currenttherapist); //--- IGNORE ---
  return (
    <div className="calendar-wrapper" style={{ width: '100%', overflowX: 'auto' }}>
      <Navbar/>
      <div className="topbar">

        {/* LEFT SECTION */}
        <div className="left">
          <div className="location">
            <span>Liat Towers</span>
            <span className="arrow">▾</span>
          </div>

          <div className="display">
            {/* Display : 15 Min <span className="arrow">▾</span> */}
            <Slottime slot={slot} setslot={setslot}/>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="right">

          {/* SEARCH */}
          <div className="search">
            <span className="icon">🔍</span>
            <input placeholder="Search Sales by phone/name" />
            <FilterPanel open = {open} onClose={() => setOpen(false)} />
          </div>

          {/* FILTER BUTTON */}
          <button className="filter-btn" onClick={() => setOpen((prev) => !prev)}>
            Filter
          </button>

          {/* DATE CONTROLS */}
          <div className="date-controls">
            <button onClick={() => api()?.today()}>Today</button>
            <button onClick={() => api()?.prev()}>‹</button>
            <span className="date-label">{api()?.currentData?.viewTitle}</span>

            <button onClick={() => api()?.next()}>›</button>

            <button className="calendar-icon">📅</button>
          </div>

        </div>
      </div>
      <FullCalendar
       key={JSON.stringify(resource)}
        plugins={[
          resourcePlugin,
          resourceTimeGridPlugin,
          interactionPlugin
        ]}
        ref={calendarRef}

        headerToolbar={false}

        initialView="resourceTimeGridDay"
        nowIndicator={true}
        scrollTime="09:00:00"
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"

        selectable={true}
        select={handleSelect}

        resources={resource.length ? resource : [{ id: 'demo-1', title: 'Demo User',gender:'N/A' }]}  // fallback resource  
        resourceLabelContent={(arg) => {
          const gender = arg.resource.extendedProps.gender;
        // arg.resource is the resource object
        return (
          <div>
            <span style={gender === 'male' ? { background: '#3B82F6','marginLeft': '5px',borderRadius: '50% 50% 50% 50%',padding: "5px" } : { background: '#EC4899','marginLeft': '5px',borderRadius: '50% 50% 50% 50%',padding: "5px" }}>{arg.resource.id}</span>
            <strong>{arg.resource.title}</strong>
            <br/>
            <span>{gender}</span>
            </div>
        );
      }}
        events={events}

        slotMinTime="09:00:00"
        slotDuration={`00:${slot}:00`}
        slotLabelInterval="01:00"
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }}

        allDaySlot={false}
        timeZone="Asia/Kolkata"
        datesSet={(arg) => {
          setcurrentdate(new Date(arg.view.currentStart));
        }}
      />
      {/* <BookingInterface/> */}
      <Booking open = {NBopen} onClose={() => setNBOpen(false)}  currentTimeDate={currentTimeDate} currenttherapist = {currenttherapist}/>
    </div>
  )
}

export default React.memo(App);