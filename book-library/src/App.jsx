import { useState } from "react";
import booksData from "./book-list.json";

export default function App() {
  const [query, setQuery] = useState("");

  const filteredBooks = booksData.filter((book) => {
    const q = query.toLowerCase();
    return (
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.publisher.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">📚 Book Library</h1>
      <input
        type="text"
        placeholder="Search by title, author, or publisher..."
        className="w-full p-2 border rounded mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="space-y-3">
        {filteredBooks.map((book, index) => (
          <li key={index} className="p-4 border rounded shadow">
            <p className="text-xl font-semibold">{book.title}</p>
            <p className="text-sm text-gray-600">✍️ {book.author}</p>
            <p className="text-sm text-gray-500">🏢 {book.publisher}</p>
          </li>
        ))}
        {filteredBooks.length === 0 && (
          <p className="text-gray-500">No books found.</p>
        )}
      </ul>
    </div>
  );
} 