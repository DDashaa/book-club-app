"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EventPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("events");
    if (saved) {
      const events = JSON.parse(saved);
      const e = events.find((ev) => ev.id === Number(params.id));
      setEvent(e);
    }
  }, [params.id]);

  if (!event) return <p className="p-6 text-[#757575]">Загрузка события...</p>;

  return (
    <main className="min-h-screen bg-white px-6 py-6 pb-32">
      {/* Верхняя иллюстрация */}
      <div className="relative w-full h-64 bg-gray-200 rounded-[20px] mb-6" />

      {/* Назад и Поделиться */}
      <div className="absolute top-6 left-6 p-2 rounded-full bg-white/70 backdrop-blur-md cursor-pointer" onClick={() => router.back()}>
        🔙
      </div>
      <div className="absolute top-6 right-6 p-2 rounded-full bg-white/70 backdrop-blur-md cursor-pointer">
        📤
      </div>

      {/* Заголовок */}
      <h1 className="text-[24px] font-bold text-[#1A1A1B] mb-4">{event.title}</h1>

      {/* Информационная сетка */}
      <div className="grid grid-cols-2 gap-4 text-[14px] text-[#757575] mb-6">
        <div>📅 {event.date}</div>
        <div>⏰ {event.time}</div>
        <div>📍 {event.location}</div>
        <div>👤 {event.organizer}</div>
      </div>

      {/* О программе */}
      <div className="text-[14px] text-[#757575] leading-6 mb-6">
        Описание события и дополнительная информация. Здесь можно писать текст о книге или программе встречи.
      </div>

      {/* Теги */}
      <div className="flex flex-wrap gap-2 mb-32">
        <span className="px-2 py-1 rounded-full bg-gray-200 text-[12px]">#Издательское_дело</span>
        <span className="px-2 py-1 rounded-full bg-gray-200 text-[12px]">#Дизайн</span>
        <span className="px-2 py-1 rounded-full bg-gray-200 text-[12px]">#Инди</span>
      </div>

      {/* Нижняя панель бронирования */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-[20px]">
        {/* Свободные места */}
        <div className="text-[#5FCDFD] font-bold text-lg">
          {event.seats} Доступно
        </div>

        {/* Степпер */}
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 rounded-full border border-gray-300 text-[#1A1A1B]">—</button>
          <span className="font-bold text-lg">1</span>
          <button className="w-8 h-8 rounded-full border border-gray-300 text-[#1A1A1B]">+</button>
        </div>

        {/* Кнопка бронирования */}
        <button className="bg-[#5FCDFD] text-white font-bold px-6 py-2 rounded-[20px] ml-4">
          Забронировать место
        </button>
      </div>
    </main>
  );
}