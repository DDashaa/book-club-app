"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [filter, setFilter] = useState("announcement");
  const [events, setEvents] = useState([]);

  // Загружаем события из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem("events");
    if (saved) {
      setEvents(JSON.parse(saved));
    }
  }, []);

  const filteredEvents = events.filter((e) => e.type === filter);

  return (
    <main className="min-h-screen bg-white px-4 py-6 pb-24">

      {/* Заголовок */}
      <h1 className="text-2xl font-bold text-[#1A1A1B] mb-4">
        Book Club
      </h1>

      {/* Фильтры */}
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

      {/* Список событий */}
      <div className="flex flex-col gap-4">
        {filteredEvents.map((event) => (
          <Link key={event.id} href={`/event/${event.id}`}>
            <div className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-200 cursor-pointer hover:shadow-md transition">
              {/* Изображение */}
              <div className="w-full aspect-video bg-gray-200" />

              {/* Содержимое */}
              <div className="p-4">
                <h3 className="text-[18px] font-bold text-[#1A1A1B] mb-1">{event.title}</h3>

                <div className="text-[14px] text-[#5D5FEF] mb-1">
                  📅 {event.date} • {event.time}
                </div>

                <div className="text-[14px] text-[#757575] mb-1">
                  {event.location} • {event.organizer}
                </div>

                <div className="text-[#5FCDFD] font-bold">
                  {event.seats > 0 ? `${event.seats} мест` : "Sold out"}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}