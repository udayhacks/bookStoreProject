import React, { useState, useEffect } from "react";
import styles from "./Input.module.css"; // Import CSS module

export default function Input() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Could not load books.");
    }
  };

  const addBook = async () => {
    try {
      const newBook = { title, release_year: releaseYear };
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) throw new Error("Failed to add book");

      const data = await response.json();
      setBooks([...books, data]);
      setTitle("");
      setReleaseYear("");
      setError(null);
    } catch (err) {
      console.error("Error adding book:", err);
      setError("Could not add book.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>📚 Book Manager</h1>

        <div className={styles.form}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the book title"
            className={styles.input}
          />
          <input
            type="number"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            placeholder="Enter the release year"
            className={styles.input}
          />
          <button onClick={addBook} className={styles.button}>
            Add Book
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <ul className={styles.list}>
          {books.map((book) => (
            <li key={book.id || book.title} className={styles.listItem}>
              <span className={styles.bookTitle}>{book.title}</span>
              <span className={styles.bookYear}>({book.release_year})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
