import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fetchEvents } from "../services/eventService";
import EventModal from "./EventModal";
import { getSubjectStyle } from "../components/CalendarUtils";

const Calendar = ({ onEventsChange }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendarRef, setCalendarRef] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchEvents();
      const updatedEvents = fetchedEvents.map((event) => {
        const eventStyle = getSubjectStyle(event.subject);
        return {
          ...event,
          borderColor: eventStyle.backgroundColor,
          backgroundColor: eventStyle.backgroundColor,
          textColor: eventStyle.color,
          start: new Date(event.start),
          end: new Date(event.end),
        };
      });
      setEvents(updatedEvents);
    };
  
    loadEvents();
  }, []);

  const countOverlappingEvents = (selectedRangeStart, selectedRangeEnd) => {
    const calendarApi = calendarRef.getApi();
    const events = calendarApi.getEvents();
    let overlappingEvents = 0;
  
    events.forEach((event) => {
      if (
        (selectedRangeStart >= event.start && selectedRangeStart < event.end) ||
        (selectedRangeEnd > event.start && selectedRangeEnd <= event.end) ||
        (selectedRangeStart < event.start && selectedRangeEnd > event.end)
      ) {
        overlappingEvents++;
      }
    });
  
    return overlappingEvents;
  };
  
  const handleDateClick = (arg) => {
    const selectedRangeStart = new Date(arg.date);
    const selectedRangeEnd = new Date(arg.date);
    selectedRangeEnd.setDate(selectedRangeEnd.getDate() + 1);
  
    if (countOverlappingEvents(selectedRangeStart, selectedRangeEnd) >= 2) {
      alert("You cannot have more than 2 events on the same day.");
      return;
    }
  
    setSelectedEvent(null);
    setIsModalOpen(true);
  };
  
  const handleEventClick = (info) => {
    setSelectedEvent({
      id: info.event.id,
      title: info.event.title,
      subject: info.event._def.extendedProps.subject,
      start: info.event.start,
      end: info.event.end,
      description: info.event._def.extendedProps.description,
    });
    setIsModalOpen(true);
  };

  const handleEventAdd = (newEvent) => {
    const updatedEvent = {
      ...newEvent,
      borderColor: getSubjectStyle(newEvent.subject).backgroundColor,
      backgroundColor: getSubjectStyle(newEvent.subject).backgroundColor,
      textColor: getSubjectStyle(newEvent.subject).color,
    };
  
    calendarRef.getApi().addEvent(updatedEvent);
    onEventsChange([...events, updatedEvent]);
  };
  
  const handleEventUpdate = (updatedEvent) => {
    const eventApi = calendarRef.getApi().getEventById(updatedEvent.id);
    if (eventApi) {
      eventApi.setProp('title', updatedEvent.title);
      eventApi.setProp('subject', updatedEvent.subject);
      eventApi.setDates(updatedEvent.start, updatedEvent.end);
      eventApi.setExtendedProp('description', updatedEvent.description);
      eventApi.setProp('backgroundColor', getSubjectStyle(updatedEvent.subject).backgroundColor);
    }
    const updatedEventsList = events.map((event) => {
      return event.id === updatedEvent.id ? updatedEvent : event;
    });
    onEventsChange(updatedEventsList);
  };

  const handleEventDelete = (deletedEventId) => {
    const eventApi = calendarRef.getApi().getEventById(deletedEventId);
    if (eventApi) {
      eventApi.remove();
    }
    const remainingEvents = events.filter((event) => event.id !== deletedEventId);
    onEventsChange(remainingEvents);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div>
        <div className="event-title">{eventInfo.event.title}</div>
      </div>
    );
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        contentHeight={570}
        weekNumbers={true}
        eventOverlap={false}
        ref={setCalendarRef}
        eventContent={renderEventContent}
        events={events}
      />
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        onEventAdd={handleEventAdd}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
        events={events}
      />
    </div>
  );
};

export default Calendar;
