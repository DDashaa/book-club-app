"use client";

import React from "react";

export default function Home() {
  const [nextMeeting, setNextMeeting] = React.useState(() => {
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

  const [books, setBooks] = React.useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("books");
      return saved
        ? JSON.parse(saved)
        : ["1984", "Мастер и Маргарита", "Норвежский лес"];
    }
    return ["1984", "Мастер и Маргарита", "Норвежский лес"];
  });

  const [selectedBook, setSelectedBook] = React.useState(null);
  const [newBook, setNewBook] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = () => {
    const trimmed = newBook.trim();
    if (trimmed && !books.includes(trimmed)) {
      setBooks([...books, trimmed]);
      setNewBook("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addBook();
  };

  const chooseRandomBook = () => {
    if (books.length === 0) return;
    const randomIndex = Math.floor(Math.random() * books.length);
    setSelectedBook(books[randomIndex]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-green-50 p-4 font-sans dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-6 text-green-900 text-center">
        📚 Book Club Planka
      </h1>

      {/* Кликабельная карточка встречи */}
      <div
        onClick={() => setModalOpen(true)}
        className="w-full max-w-md bg-gradient-to-r from-green-200 to-yellow-100 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 p-6 cursor-pointer mb-6"
      >
        <h2 className="text-2xl font-bold mb-2 text-green-900 flex items-center gap-2">
          📅 {nextMeeting.date}
        </h2>
        <p className="text-green-800 mb-1 flex items-center gap-2">📝 Тема: {nextMeeting.theme}</p>
        <p className="text-green-800 mb-1 flex items-center gap-2">📖 Книга: {nextMeeting.book}</p>
        <p className="text-green-800 flex items-center gap-2">📍 Место: {nextMeeting.place}</p>
      </div>

      {/* Модальное окно */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-lg scale-95 animate-[scale-up_0.2s_ease-out] relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-green-900 font-bold"
            >
              ✖
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-green-900">
              Подробности встречи
            </h2>
            <p className="mb-1 text-green-800">📅 Дата: {nextMeeting.date}</p>
            <p className="mb-1 text-green-800">📝 Тема месяца: {nextMeeting.theme}</p>
            <p className="mb-1 text-green-800">📖 Книга: {nextMeeting.book}</p>
            <p className="mb-1 text-green-800">📍 Место: {nextMeeting.place}</p>
          </div>
        </div>
      )}

      {/* Форма предложений книг */}
      <section className="w-full max-w-md bg-green-100 dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-green-900">
          Предложить книгу на следующий месяц
        </h2>

        <ul className="mb-4 space-y-2">
          {books.map((book, index) => (
            <li
              key={index}
              className="p-2 bg-green-200 dark:bg-gray-700 rounded hover:bg-green-300 dark:hover:bg-gray-600 transition"
            >
              {book}
            </li>
          ))}
        </ul>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newBook}
            onChange={(e) => setNewBook(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Добавить книгу..."
            className="flex-1 rounded border border-green-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={addBook}
            className="rounded bg-green-800 px-4 py-2 text-white hover:bg-green-900 transition"
          >
            Добавить
          </button>
        </div>

        <button
          onClick={chooseRandomBook}
          className="w-full rounded bg-green-800 px-6 py-2 text-white font-semibold hover:bg-green-900 transition shadow-lg"
        >
          🎲 Выбрать случайную книгу
        </button>

        {selectedBook && (
          <p className="mt-4 text-xl font-bold text-green-900 text-center animate-pulse">
            Выбрана книга: {selectedBook}
          </p>
        )}
      </section>
    </main>
  );
}