import { useState } from "react";
import booksData from "./merged-books.json"; // 변경된 파일 사용

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
      <table className="w-full border rounded mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">제목</th>
            <th className="py-2 px-4 text-left">저자</th>
            <th className="py-2 px-4 text-left">출판사</th>
            <th className="py-2 px-4 text-left">설명</th>
            <th className="py-2 px-4 text-left">언어</th> {/* language 컬럼 추가 */}
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4">{book.title}</td>
              <td className="py-2 px-4">{book.author}</td>
              <td className="py-2 px-4">{book.publisher}</td>
              <td className="py-2 px-4">{book.description}</td>
              <td className="py-2 px-4">{book.language}</td> {/* language 값 출력 */}
            </tr>
          ))}
          {filteredBooks.length === 0 && (
            <tr>
              <td colSpan={4} className="py-4 text-center text-gray-500">
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}