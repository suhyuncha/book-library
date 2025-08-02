import { useState } from "react";
import booksData from "./merged-books.json";

export default function App() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  // 소팅 함수
  const sortedBooks = [...booksData].sort((a, b) => {
    const aValue = (a[sortKey] || "").toLowerCase();
    const bValue = (b[sortKey] || "").toLowerCase();
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const filteredBooks = sortedBooks.filter((book) => {
    const q = query.toLowerCase();
    return (
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.publisher.toLowerCase().includes(q)
    );
  });

  // 헤더 클릭 시 소팅 키/순서 변경
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "24px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "24px" }}>📚 Book Library</h1>
      <input
        type="text"
        placeholder="Search by title, author, or publisher..."
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #b0b0b0",
          borderRadius: "6px",
          marginBottom: "20px",
          fontSize: "1rem"
        }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table className="book-table">
        <thead>
          <tr>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort("title")}>
              제목 {sortKey === "title" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort("author")}>
              저자 {sortKey === "author" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort("publisher")}>
              출판사 {sortKey === "publisher" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort("description")}>
              설명 {sortKey === "description" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th style={{ minWidth: "70px", cursor: "pointer" }} onClick={() => handleSort("language")}>
              언어 {sortKey === "language" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.description}</td>
              <td>{book.language}</td>
            </tr>
          ))}
          {filteredBooks.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", color: "#888", padding: "24px" }}>
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <style>{`
        .book-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          border-radius: 10px;
          overflow: hidden;
          background: #fff;
        }
        .book-table th, .book-table td {
          padding: 12px 14px;
          border-bottom: 1px solid #eaeaea;
          text-align: left;
        }
        .book-table th {
          background: linear-gradient(90deg, #e3f0ff 0%, #cbe2ff 100%);
          color: #234e7d;
          font-weight: 600;
          font-size: 1rem;
          user-select: none;
        }
        .book-table th:hover {
          background: #dbeeff;
        }
        .book-table tr:last-child td {
          border-bottom: none;
        }
        .book-table tbody tr:hover {
          background: #f5faff;
          transition: background 0.2s;
        }
      `}</style>
    </div>
  );
}