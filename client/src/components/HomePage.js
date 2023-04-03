import "../assets/css/calendar.css";
import Social from "./SocialMedia";
import { logout } from "../services/firebase";
import Calendar from "./Calendar";
import { Subjects, EventBar, DeadlineBar, NotesBar } from "./CalendarUtils";
import { fetchEvents } from "../services/eventService";
import React, { useState, useEffect } from "react";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={require("../assets/img/logo_calendar.png")} alt="logo" />
      </div>
      <div className="profile">
        <img src={require("../assets/img/logo_calendar.png")} alt="profile icon" />
        <div className="dropdown-menu">
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

function Main({ user }) {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState("All");

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchEvents();
      const updatedEvents = fetchedEvents.map((event) => {
        return {
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        };
      });
      setCurrentEvents(updatedEvents);
    };

    loadEvents();
  }, []);

  return (
    <main>
      <section>
        <div className="left-side">
          <div className="column-today-date">
            <h1>{formattedDate}</h1>
          </div>
          <div className="column-events">
            <div className="events-title">
              <h1>Events</h1>
            </div>
            <EventBar events={currentEvents} user={user} />
          </div>
          <div className="notes-title">
            <h1>Notes</h1>
          </div>
          <div className="column-notes">
            <NotesBar events={currentEvents} user={user} />
          </div>
        </div>
        <div className="center">
          <div className="button-bar-mid"></div>
          <div className="calendar-mid">
            <Calendar user={user} onEventsChange={setCurrentEvents} />
          </div>
        </div>
        <div className="right-side">
          <div className="module-title">
            <h1>Modules</h1>
          </div>
          <div className="column-module">
            <ul>
              {Subjects.map((subject) => (
                <React.Fragment key={subject.name}>
                  <li
                    style={subject.style}
                    onClick={() => setSubjectFilter(subject.name)}
                  >
                    {subject.name}
                  </li>
                  <br />
                </React.Fragment>
              ))}
            </ul>
          </div>
          <div className="deadline-title">
            <h1>Deadline</h1>
          </div>
          <div className="column-deadline">
            <h3 className="all-filter" onClick={() => setSubjectFilter("All")}>All</h3>
            <DeadlineBar events={currentEvents} subjectFilter={subjectFilter} user={user} />
          </div>
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <div className="column_left">
        <ul>
          <li>          <a href="#top">About us</a></li>
          <li><a href="#top">Privacy Policy</a></li>
          <li><a href="#top">Terms of use</a></li>
        </ul>
      </div>
      <div className="column_mid">
        <Social />
      </div>
      <div className="column_right">
        <span>&#169;</span>
        <p>2023 Key. All Rights Reserved | Development Group</p>
      </div>
    </footer>
  );
}

function Home({ user }) {
  return (
    <div>
      <Header />
      <Main user={user} />
      <Footer />
    </div>
  );
}

export default Home;
