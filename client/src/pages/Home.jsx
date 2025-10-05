import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import BookService from "../services/bookService";
import ComicService from "../services/comicService";
import JournalService from "../services/journalService";
import Items from "../components/Items";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [comics, setComics] = useState([]);
  const [journals, setJournals] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filteredComics, setFilteredComics] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchAllItems();
  }, []);

  const fetchAllItems = async () => {
    try {
      setLoading(true);
      const [bookRes, comicRes, journalRes] = await Promise.all([
        BookService.getAll(),
        ComicService.getAll(),
        JournalService.getAll(),
      ]);

      const booksData = bookRes.data?.data || [];
      const comicsData = comicRes.data?.data || [];
      const journalsData = journalRes.data?.data || [];

      setBooks(booksData);
      setComics(comicsData);
      setJournals(journalsData);

      setFilteredBooks(booksData);
      setFilteredComics(comicsData);
      setFilteredJournals(journalsData);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "ไม่สามารถโหลดข้อมูลสินค้าได้",
      });
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Search แบบ client-side
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);

    if (!keyword || keyword.trim() === "") {
      setFilteredBooks(books);
      setFilteredComics(comics);
      setFilteredJournals(journals);
      return;
    }

    const lowerKeyword = keyword.toLowerCase();

    setFilteredBooks(
      books.filter(
        (item) =>
          item.title?.toLowerCase().includes(lowerKeyword) ||
          item.author?.toLowerCase().includes(lowerKeyword) ||
          item.category?.toLowerCase().includes(lowerKeyword)
      )
    );

    setFilteredComics(
      comics.filter(
        (item) =>
          item.title?.toLowerCase().includes(lowerKeyword) ||
          item.author?.toLowerCase().includes(lowerKeyword) ||
          item.category?.toLowerCase().includes(lowerKeyword)
      )
    );

    setFilteredJournals(
      journals.filter(
        (item) =>
          item.title?.toLowerCase().includes(lowerKeyword) ||
          item.author?.toLowerCase().includes(lowerKeyword) ||
          item.category?.toLowerCase().includes(lowerKeyword)
      )
    );
  };

  if (loading) {
    return (
      <div className="text-center p-4 text-lg">
        ⏳ กำลังโหลดข้อมูล...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          All Items
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          ค้นหาสินค้าจากช่องค้นหาด้านล่าง
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-lg">
          <input
            type="search"
            value={searchKeyword}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="🔍 ค้นหาสินค้า..."
            className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Books */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Books</h2>
      <Items items={filteredBooks} type="book" />

      {/* Comics */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Comics</h2>
      <Items items={filteredComics} type="comic" />

      {/* Journals */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Journals</h2>
      <Items items={filteredJournals} type="journal" />
    </div>
  );
};

export default Home;
