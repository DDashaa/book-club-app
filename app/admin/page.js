"use client";

import React from "react";

export default function AdminPage() {
  // Простой пароль для доступа к админке
  const PASSWORD = "bookclub123";

  const [authorized, setAuthorized] = React.useState(false);

  React.useEffect(() => {
    const userInput = prompt("Введите пароль для доступа к админке:");
    if (userInput === PASSWORD) {
      setAuthorized(true);
    } else {
      alert("Неверный пароль! Доступ запрещён.");
    }
  }, []);

  const [meeting, setMeeting] = React.useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nextMeeting");
      return saved
        ? JSON.parse(saved)
        : {
            date: "25 марта",
            theme: "Мистический реализм",
            book: "Сто лет одиночества",
            place: "Дом Planka, ул. 8 Марта, 20А",
          };
    }
    return {
      date: "25 марта",
      theme: "Мистический реализм",
      book: "Сто лет одиночества",
      place: "Дом Planka, ул. 8 Марта, 20А",
    };
  });

  const handleChange = (e) => {
    setMeeting({ ...meeting, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("nextMeeting", JSON.stringify(meeting));
    alert("Данные встречи обновлены!");
  };

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-semibold text-red-600 dark:text-red-400">
        ❌ Доступ запрещён
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-zinc-50 p-6 font-sans dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-6 text-black dark:text-white text-center">
        🛠 Admin Panel — Редактирование встречи
      </h1>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-4">
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Дата</label>
          <input
            type="text"
            name="date"
            value={meeting.date}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Тема месяца</label>
          <input
            type="text"
            name="theme"
            value={meeting.theme}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Книга</label>
          <input
            type="text"
            name="book"
            value={meeting.book}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Место</label>
          <input
            type="text"
            name="place"
            value={meeting.place}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          💾 Сохранить
        </button>
      </div>
    </main>
  );
}