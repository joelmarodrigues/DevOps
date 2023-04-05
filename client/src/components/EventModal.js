import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { createEvent, updateEvent, deleteEvent } from "../services/eventService";
import { getSubjectStyle, canAddEvent } from "../components/CalendarUtils";
import "../assets/css/calendar.css";
import { useAuth } from '../services/AuthProvider';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
    height: "70%",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

const generateTimeOptions = () => {
  const options = [];

  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, "0");
    options.push(`${hour}:00`);
  }

  return options;
};

Modal.setAppElement("#root");

const EventModal = ({ isOpen, onClose, event, onEventAdd, onEventUpdate, onEventDelete, events }) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const timeOptions = generateTimeOptions();
  const [titleError, setTitleError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [startTimeError, setStartTimeError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [endTimeError, setEndTimeError] = useState(false);
  const { user, role } = useAuth();

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setSubject(event.subject);
      setStartDate(new Date(event.start).toISOString().slice(0, 10));
      setStart(new Date(event.start).toISOString().slice(11, -8));
      setEndDate(event.end ? new Date(event.end).toISOString().slice(0, 10) : "");
      setEnd(event.end ? new Date(event.end).toISOString().slice(11, -8) : "");
      setDescription(event.description);
    } else {
      setTitle("");
      setSubject("");
      setStartDate("");
      setStart("");
      setEndDate("");
      setEnd("");
      setDescription("");
    }
  }, [event]);

  const subjectOptions = [
    "Select Subject",
    "UX/UI",
    "Operating Systems",
    "DevOps",
    "Mobile Apps",
    "Networking",
    "OOP",
    "Notes",
  ];

  const validateInputs = () => {
    let isValid = true;

    if (title.trim() === "") {
      setTitleError(true);
      isValid = false;
    } else {
      setTitleError(false);
    }

    if (subject.trim() === "") {
      setSubjectError(true);
      isValid = false;
    } else {
      setSubjectError(false);
    }

    if (startDate.trim() === "") {
      setStartDateError(true);
      isValid = false;
    } else {
      setStartDateError(false);
    }

    if (start.trim() === "") {
      setStartTimeError(true);
      isValid = false;
    } else {
      setStartTimeError(false);
    }

    if (endDate.trim() === "") {
      setEndDateError(true);
      isValid = false;
    } else {
      setEndDateError(false);
    }

    if (end.trim() === "") {
      setEndTimeError(true);
      isValid = false;
    } else {
      setEndTimeError(false);
    }

    return isValid;
  };

  const validateDateTime = () => {
    const startDateObj = new Date(`${startDate}T${start}`);
    const endDateObj = endDate && end ? new Date(`${endDate}T${end}`) : null;

    if (endDateObj && endDateObj <= startDateObj) {
      alert("End date/time must be greater than start date/time.");
      return false;
    }

    return true;
  };

  const resetFields = () => {
    setTitle("");
    setSubject("");
    setStart("");
    setEnd("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setTitleError("");
    setSubjectError("");
    setStartDateError("");
    setStartTimeError("");
    setEndDateError("");
    setEndTimeError("");
  };

  const handleSave = async () => {
    const eventStyle = getSubjectStyle(subject);
  
    if (!validateInputs()) {
      return;
    }
  
    if (!validateDateTime()) {
      return;
    }
  
    const newEvent = {
      title,
      subject,
      start: new Date(`${startDate}T${start}`),
      end: endDate && end ? new Date(`${endDate}T${end}`) : null,
      description,
      createdByUserId: user.uid,
      borderColor: eventStyle.backgroundColor,
      backgroundColor: eventStyle.backgroundColor,
      textColor: eventStyle.color,
    };
  
    if (event) {
      // Update event case
      await updateEvent(event.id, newEvent);
      onEventUpdate({ ...newEvent, id: event.id });
    } else {
      // Add new event case
      if (!canAddEvent(events, newEvent.start, newEvent.end)) {
        alert("Cannot add event. \n\nMaximum two events are allowed at the same range.");
        return;
      }
  
      const createdEvent = await createEvent(newEvent);
      onEventAdd({ ...newEvent, id: createdEvent.id });
    }
    resetFields();
    onClose();
  };

  const handleDelete = async () => {
    if (event) {
      await deleteEvent(event.id);
      onEventDelete(event.id);
    }
    resetFields();
    onClose();
  };

  const handleCancel = () => {
    resetFields();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      shouldCloseOnOverlayClick={false}>
      <div className="custom-modal">
        <h2>{event ? "Edit Event" : "Add Event"}</h2>
        <form>
          <label>Title:</label>
          <input
            className={titleError ? "input-error" : ""}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Subject: </label>
          <select
            className={subjectError ? "input-error" : ""}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            {subjectOptions
              .filter((option) => role !== "student" || option === "Notes" || option === "Select Subject")
              .map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <div className="date-time">
            <div>
              <label>Start:</label>
              <div>
                <input
                  type="date"
                  className={startDateError ? "input-error" : ""}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <select
                  className={startTimeError ? "input-error" : ""}
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                >
                  {timeOptions.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label>End:</label>
              <div>
                <input
                  type="date"
                  className={endDateError ? "input-error" : ""}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <select
                  className={endTimeError ? "input-error" : ""}
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                >
                  {timeOptions.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </form>
        {!(role === 'student' && subject !== 'Notes') && (
          <button onClick={handleSave}>{event ? "Save Changes" : "Add Event"}</button>
        )}
        {event && !(role === 'student' && subject !== 'Notes') && (
          <button onClick={handleDelete}>Delete</button>
        )}
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </Modal>
  );
};

export default EventModal;
