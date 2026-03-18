"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [filter, setFilter] = useState("announcement");

  // Начальные события, чтобы карточки отображались сразу
  const initialEvents = [
    {
      id: 1,
      title: "Встреча марта",
      date: "19 марта",
      time: "19:00",
      location: "Горького, 65",
      organizer: "Planka",
      seats: 10,
      type: "announcement"
    },
    {
      id: 2,
      title: "Книжный вечер",
      date: "26 марта",
      time: "19:00",
      location: "Горького, 65",
      organizer: "Planka",
      seats: 5,
      type: "archive"
    }
  ];

  const [events, setEvents] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("events");
      if (saved) return JSON.parse(saved);
    }
    return initialEvents;
  });

  useEffect(() => {
    // Сохраняем в localStorage новые события при изменении
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  const filteredEvents = events.filter((e) => e.type === filter);

  return (
    <main className="min-h-screen bg-white px-4 py-6 pb-24">
      {/* Header */}
      <h1 className="text-2xl font-bold text-[#1A1A1B] mb-4">Book Club</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter("announcement")}
          className={`px-4 py-1 rounded-full text-sm ${
            filter === "announcement"
              ? "bg-[#5FCDFD] text-white"
              : "border text-gray-600"
          }`}
        >
          Announcement
        </button>
        <button
          onClick={() => setFilter("archive")}
          className={`px-4 py-1 rounded-full text-sm ${
            filter === "archive"
              ? "bg-[#5FCDFD] text-white"
              : "border text-gray-600"
          }`}
        >
          Archive
        </button>
      </div>

      {/* Event list */}
      <div className="flex flex-col gap-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-[20px] shadow-sm overflow-hidden cursor-pointer"
            onClick={() => alert(`Откроется страница события: ${event.title}`)}
          >
            {/* Image */}
            <div className="w-full aspect-video bg-gray-200" />

            {/* Content */}
            <div className="p-4">
              <h2 className="text-[18px] font-bold text-[#1A1A1B] mb-2">
                {event.title}
              </h2>
              <div className="text-[14px] text-[#5D5FEF] mb-1">
                📅 {event.date} • {event.time}
              </div>
              <div className="text-[14px] text-[#757575] mb-2">
                {event.location} • {event.organizer}
              </div>
              <div className="text-[#5FCDFD] font-bold">
                {event.seats > 0
                  ? `${event.seats} seats available`
                  : "Sold out"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}