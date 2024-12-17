"use client"; // This marks the component as a client-side component

import React, { useEffect, useState } from "react";
import MainLayouts from "@/components/layout/MainLayouts";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const DashboardPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState<any | null>(null); // For Modal Data
  const [isUpdating, setIsUpdating] = useState(false); // Track if we are updating a task
  const router = useRouter();
  const [completedTasks, setCompletedTasks] = useState([]);

  // Form state for creating and updating events
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
  });

  // Function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long", // "Monday"
      year: "numeric", // "2024"
      month: "long", // "December"
      day: "numeric", // "6"
    });
  };

  

  // Handle task click to open event details in modal
  const handleOpenEvent = (task: any) => {
    setSelectedTask(task); // Set the selected event for the modal
    setFormData({
      title: task.title,
      description: task.description,
      date: task.date,
      time: task.time,
      location: task.location,
      category: task.category,
    });
  };

  // Handle modal close and reset form
  const closeModal = () => {
    setSelectedTask(null);
    setIsUpdating(false);
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "",
    });
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle task creation or update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const url = isUpdating ? "/api/update" : "/api/create"; // Determine endpoint
    const method = isUpdating ? "PATCH" : "POST"; // Determine HTTP method
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          id: isUpdating ? selectedTask?.id : undefined, // Include ID for updates only
        }),
      });
  
      if (response.ok) {
        alert(isUpdating ? "Event updated successfully!" : "Event created successfully!");
        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          category: "",
        });
        setIsUpdating(false);
        fetchTasks(); // Refresh the tasks/events list
      } else {
        const { error, message } = await response.json();
        alert(error || message || "Failed to save event.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while saving the event.");
    }
  };
  

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (response.ok) {
        const data = await response.json();
        const tasksWithStringTitles = data.map((task: any) => ({
          ...task,
          title: String(task.title),
        }));
        setTasks(tasksWithStringTitles); // Set all tasks
      } else {
        console.error("Failed to fetch tasks.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  
  // Separate active and history tasks
  const activeTasks = tasks.filter((task: any) => !task.isDone);
  const historyTasks = tasks.filter((task: any) => task.isDone);
  

// Handle task deletion
const handleDelete = async (id: number) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this event?");
  if (!confirmDelete) return;

  try {
    const response = await fetch("/api/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      alert("Event deleted successfully!");
      fetchTasks(); // Update the UI after deleting
    } else {
      const { message } = await response.json();
      alert(`Failed to delete event: ${message}`);
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    alert("An error occurred while deleting the event.");
  }
};

// Mark task as done
const markAsDone = async (id: number) => {
  try {
    const response = await fetch(`/api/mark?id=${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      alert("Event marked as done!");
      fetchTasks(); // Refresh tasks after marking as done
    } else {
      const { message } = await response.json();
      alert(`Failed to mark event as done: ${message}`);
    }
  } catch (error) {
    console.error("Error marking as done:", error);
    alert("An error occurred while marking the event as done.");
  }
};

// Check login status and fetch tasks
useEffect(() => {
  const loggedIn = localStorage.getItem("isLoggedIn");
  const userRole = localStorage.getItem("role");

  if (loggedIn !== "true") {
    router.push("/login");
  } else {
    setIsLoggedIn(true);
    setRole(userRole);
    fetchTasks();
  }
}, [router]);

return (
  <MainLayouts>
    <div className="min-h-screen flex flex-col bg-cover bg-center relative">
      {/* Event Creation/Update Form */}
      <form
        onSubmit={handleSubmit}
        className="absolute top-8 left-12 bg-white shadow-md rounded-md border border-gray-300 p-6"
        style={{
          width: "500px",
          height: "675px",
        }}
      >
        <p className="text-left text-2xl font-bold text-gray-800 mb-9">
          {isUpdating ? "Update Event" : "Create Event"}
        </p>
        <div className="flex items-center mb-8">
          <p className="text-xl font-bold text-gray-800 w-1/3">Title:</p>
          <input
            type="text"
            name="title"
            className="w-3/4 p-2 border border-gray-300 rounded-md"
            placeholder="Enter event title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center mb-8">
          <p className="text-xl font-bold text-gray-800 w-1/3">Description:</p>
          <textarea
            name="description"
            className="w-3/4 p-2 border border-gray-300 rounded-md"
            placeholder="Enter event description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center mb-8">
          <p className="text-xl font-bold text-gray-800 w-1/3">Date:</p>
          <input
            type="date"
            name="date"
            className="w-3/4 p-2 border border-gray-300 rounded-md"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center mb-8">
          <p className="text-xl font-bold text-gray-800 w-1/3">Time:</p>
          <input
            type="time"
            name="time"
            className="w-3/4 p-2 border border-gray-300 rounded-md"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center mb-8">
          <p className="text-xl font-bold text-gray-800 w-1/3">Location:</p>
          <input
            type="text"
            name="location"
            className="w-3/4 p-2 border border-gray-300 rounded-md"
            placeholder="Enter event location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center mb-8">
          <p className="text-xl font-bold text-gray-800 w-1/3">Category:</p>
          <select
            name="category"
            className="w-3/4 p-2 border border-gray-300 rounded-md"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Social Events">Social Events</option>
            <option value="Corporate/Business Events">Corporate/Business Events</option>
            <option value="Cultural and Artistic Events">Cultural and Artistic Events</option>
            <option value="Sports and Recreation">Sports and Recreation </option>
            <option value="Educational Events">Educational Events </option>
            <option value="Charity and Community Events">Charity and Community Events</option>
            <option value="Government and Political Events">Government and Political Events </option>
            <option value="Holiday and Seasonal Events">Holiday and Seasonal Events</option>
            <option value="Virtual Events">Virtual Events</option>
            <option value="Religious Events">Religious Events</option>

          </select>
        </div>
        <div className="flex justify-between mt-8">
          <button
            type="submit"
            className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            {isUpdating ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="w-1/2 bg-gray-500 text-white py-2 px-4 rounded-md ml-4 hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* All Events and Event History */}
      <div className="absolute top-8 right-12 flex flex-col space-y-4">
        {/* All Events Section */}
<div
  className="bg-white shadow-md rounded-md border border-gray-300 p-6"
  style={{
    width: "950px",
    height: "400px",
    overflowY: "auto", // Scroll bar for all tasks
  }}
>
  <p className="text-2xl font-bold mb-6">All Events</p>
  <div className="flex flex-col space-y-4">
    {activeTasks.map((task: any) => (
      <div
        key={task.id}
        className="border border-gray-300 rounded-md p-4 flex justify-between items-center hover:bg-gray-100 transition cursor-pointer"
        onClick={() => handleOpenEvent(task)}
      >
        <div>
          <p className="text-xl font-bold">{task.title}</p>
        </div>
        <div className="flex space-x-4">
          <FontAwesomeIcon
            icon={faPen}
            className="text-yellow-500 cursor-pointer hover:text-yellow-600"
            title="Update"
            onClick={(e) => {
              e.stopPropagation();
              setIsUpdating(true);
              handleOpenEvent(task);
            }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="text-red-500 cursor-pointer hover:text-red-600"
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(task.id);
            }}
          />
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 cursor-pointer hover:text-green-600"
            title="Mark as Done"
            onClick={(e) => {
              e.stopPropagation();
              markAsDone(task.id);
            }}
          />
        </div>
      </div>
    ))}
  </div>
</div>


       {/* Event History Section */}
       <div
            className="bg-white shadow-md rounded-md border border-gray-300 p-6"
            style={{
              width: "950px",
              height: "250px",
              overflowY: "auto",
            }}
          >
            <p className="text-2xl font-bold mb-6">Event History</p>
            <div className="flex flex-col space-y-4">
              {tasks.filter((task: any) => task.isDone).length > 0 ? (
                tasks
                  .filter((task: any) => task.isDone)
                  .map((task: any) => (
                    <div
                      key={task.id}
                      className="border border-gray-300 rounded-md p-4 flex justify-between items-center hover:bg-gray-100 transition cursor-pointer"
                      onClick={() => handleOpenEvent(task)}
                    >
                      <p className="text-xl font-bold">{task.title}</p>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-500 cursor-pointer hover:text-red-600"
                        title="Delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(task.id);
                        }}
                      />
                    </div>
                  ))
              ) : (
              <div className="border border-gray-300 rounded-md p-4">
                <p className="text-gray-600">No history available.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Viewing Event Details */}
      {selectedTask && !isUpdating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4">Event Details</h2>
            <p className="mb-2"><strong>Title:</strong> {selectedTask.title}</p>
            <p className="mb-2"><strong>Description:</strong> {selectedTask.description}</p>
            <p className="mb-2"><strong>Date:</strong> {formatDate(selectedTask.date)}</p>
            <p className="mb-2"><strong>Time:</strong> {selectedTask.time}</p>
            <p className="mb-2"><strong>Location:</strong> {selectedTask.location}</p>
            <p className="mb-2"><strong>Category:</strong> {selectedTask.category}</p>
            <button
              onClick={closeModal}
              className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  </MainLayouts>
);

};

export default DashboardPage;
