import http from "./http-common";

const fetchEvents = async () => {
  try {
    const response = await http.get("/events");
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

const createEvent = async (event) => {
  try {
    const response = await http.post("/events", event);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

const updateEvent = async (id, event) => {
  try {
    const response = await http.put(`/events/${id}`, event);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

const deleteEvent = async (id) => {
  try {
    const response = await http.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

export { fetchEvents, createEvent, updateEvent, deleteEvent };
