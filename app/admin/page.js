"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [seats, setSeats] = useState(0);
  const [type, setType] = useState("announcement");

  // Загружаем существующие события
  useEffect(() => {
    const saved = localStorage.getItem("events");
    if (saved) setEvents(JSON.parse(saved));
  }, []);

  // Сохраняем события
  const saveEvents = (newEvents) => {
    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents));
  };

  // Добавить событие
  const addEvent = () => {
    if (!title) return alert("Введите название события");
    const newEvent = {
      id: Date.now(),
      title,
      date,
      time,
      location,
      organizer,
      seats: Number(seats),
      type,
    };
    // Добавляем сверху списка
    saveEvents([newEvent, ...events]);

    // Очистка формы
    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
    setOrganizer("");
    setSeats(0);
    setType("announcement");
  };

  return (
    <main className="min-h-screen bg-white px-4 py-6 pb-24">
      <h1 className="text-2xl font-bold text-[#1A1A1B] mb-4">Admin Panel</h1>

      {/* Форма добавления события */}
      <div className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded text-[#1A1A1B]"
        />
        <input
          type="text"
          placeholder="Дата"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded text-[#1A1A1B]"
        />
        <input
          type="text"
          placeholder="Время"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded text-[#1A1A1B]"
        />
        <input
          type="text"
          placeholder="Место"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded text-[#1A1A1B]"
        />
        <input
          type="text"
          placeholder="Организатор"
          value={organizer}
          onChange={(e) => setOrganizer(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded text-[#1A1A1B]"
        />
        <input
          type="number"
          placeholder="Количество мест"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded text-[#1A1A1B]"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded text-[#1A1A1B]"
        >
          <option value="announcement">Announcement</option>
          <option value="archive">Archive</option>
        </select>

        <button
          onClick={addEvent}
          className="bg-gradient-to-r from-green-400 to-yellow-400 text-[#1A1A1B] font-bold px-4 py-2 rounded mt-2"
        >
          Добавить событие
        </button>
      </div>

      {/* Список событий */}
      <h2 className="text-xl font-bold text-[#1A1A1B] mb-2">События</h2>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-200"
          >
            <div className="w-full aspect-video bg-gray-200" />
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
              <div className="mt-1 text-[12px] text-gray-500">{event.type}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}