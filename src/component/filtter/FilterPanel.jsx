import { useState } from "react";
import "./filter.css";

export default function FilterPanel({ open, onClose }) {
//   const [close, setClose] = useState(false);
  const [status, setStatus] = useState({
    confirmed: true,
    unconfirmed: true,
    checkedIn: true,
    completed: true,
    cancelled: false,
    noShow: false,
    holding: true,
    progress: true,
  });

  if (!open) return null;

  return (
    <div className="filter-overlay">
      <div className="filter-panel" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn cursor-pointer" onClick={onClose}>
          ✕
        </button>
        {/* HEADER */}
        <div className="section">
          <h3 className="title">Show by group (Person who is on duty)</h3>

          <label className="row">
            All Therapist
            <input type="radio" name="group" defaultChecked />
          </label>

          <div className="sub">Male</div>
          <div className="sub">Female</div>
        </div>

        <hr />

        {/* RESOURCES */}
        <div className="section">
          <h3 className="title">Resources</h3>
          <div className="sub">Rooms</div>
          <div className="sub">Sofa</div>
          <div className="sub">Monkey Chair</div>
        </div>

        <hr />

        {/* BOOKING STATUS */}
        <div className="section">
          <h3 className="title">Booking Status</h3>

          {Object.keys(status).map((key) => (
            <label key={key} className="row">
              <input
                type="checkbox"
                checked={status[key]}
                onChange={() =>
                  setStatus({ ...status, [key]: !status[key] })
                }
              />
              {key}
            </label>
          ))}
        </div>

        <hr />

        {/* THERAPIST */}
        <div className="section">
          <div className="row between">
            <h3 className="title">Select Therapist</h3>
            <label>
              Select All <input type="checkbox" defaultChecked />
            </label>
          </div>

          <input
            className="search"
            placeholder="Search by therapist"
          />
        </div>

        {/* FOOTER */}
        <div className="footer">
          Clear Filter (Return to Default)
        </div>

      </div>
    </div>
  );
}