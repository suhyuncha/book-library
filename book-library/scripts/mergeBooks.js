import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const booksDir = path.join(__dirname, '../src/books');
const outputFile = path.join(__dirname, '../src/merged-books.json');

let books = [];

for (const file of fs.readdirSync(booksDir)) {
  if (file.endsWith('.json')) {
    const data = JSON.parse(fs.readFileSync(path.join(booksDir, file), 'utf-8'));
    books = books.concat(data);
  }
}

// 중복 제거 (제목+저자 기준)
const uniqueBooks = [];
const seen = new Set();

for (const book of books) {
  const key = `${book.title}|${book.author}`;
  if (!seen.has(key)) {
    seen.add(key);
    uniqueBooks.push(book);
  }
}

fs.writeFileSync(outputFile, JSON.stringify(uniqueBooks, null, 2));
console.log(`Merged ${uniqueBooks.length} books to merged-books.json`);