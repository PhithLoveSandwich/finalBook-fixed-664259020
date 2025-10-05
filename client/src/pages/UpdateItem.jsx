// src/pages/UpdateItem.jsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";

import BookService from "../services/bookService";
import ComicService from "../services/comicService";
import JournalService from "../services/journalService";

const UpdateItem = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  const services = {
    book: BookService,
    comic: ComicService,
    journal: JournalService,
  };

  useEffect(() => {
    const fetchData = async () => {
      const serviceKey = type?.toLowerCase();
      if (!services[serviceKey]) {
        Swal.fire("Error", "ประเภทไม่ถูกต้อง", "error");
        navigate("/");
        return;
      }

      try {
        const res = await services[serviceKey].getById(id);
        const data = res.data?.data || {};

        setFormData({
          title: data.title || "",
          author: data.author || "",
          category: data.category || "",
          publishYear: data.publishYear || new Date().getFullYear(),
          isbn: data.isbn || "",
          publisher: data.publisher || "",
          edition: data.edition || "",
          pageCount: data.pageCount || "",
          language: data.language || "",
          genre: data.genre || "",
          description: data.description || "",
          coverImage: data.coverImage || "",
          location: data.location || "",
          issn: data.issn || "",
          volume: data.volume || "",
          issue: data.issue || "",
          publicationFrequency: data.publicationFrequency || "",
          series: data.series || "",
          volumeNumber: data.volumeNumber || "",
          illustrator: data.illustrator || "",
          colorType: data.colorType || "",
          targetAge: data.targetAge || "",
        });
      } catch (error) {
        Swal.fire("Error", "ไม่พบข้อมูล หรือเกิดข้อผิดพลาด", "error");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (type && id) fetchData();
  }, [type, id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceKey = type?.toLowerCase();
    if (!services[serviceKey]) {
      Swal.fire("Error", "ประเภทไม่ถูกต้อง", "error");
      return;
    }

    try {
      const payload = {
        title: formData.title || "",
        author: formData.author || "",
        category: formData.category || "",
      };

      if (serviceKey === "book") {
        payload.publishYear = Number(formData.publishYear) || new Date().getFullYear();
        payload.isbn = formData.isbn || "";
        payload.publisher = formData.publisher || "";
        payload.edition = formData.edition || "";
        payload.pageCount = Number(formData.pageCount) || 0;
        payload.language = formData.language || "";
        payload.genre = formData.genre || "";
        payload.description = formData.description || "";
      }

      if (serviceKey === "comic") {
        payload.publishYear = Number(formData.publishYear) || new Date().getFullYear();
        payload.isbn = formData.isbn || "";
        payload.series = formData.series || "";
        payload.volumeNumber = Number(formData.volumeNumber) || 0;
        payload.illustrator = formData.illustrator || "";
        payload.colorType = formData.colorType || "";
        payload.targetAge = formData.targetAge || "";
        payload.description = formData.description || "";
      }

      if (serviceKey === "journal") {
        payload.publishYear = Number(formData.publishYear) || new Date().getFullYear();
        payload.issn = formData.issn || "";
        payload.volume = formData.volume || "";
        payload.issue = formData.issue || "";
        payload.publicationFrequency = formData.publicationFrequency || "";
        payload.publisher = formData.publisher || "";
        payload.description = formData.description || "";
      }

      await services[serviceKey].update(id, payload);

      Swal.fire({
        icon: "success",
        title: "อัปเดตสำเร็จ",
        text: `${serviceKey} ถูกอัปเดตเรียบร้อยแล้ว`,
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || error.message, "error");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 dark:text-gray-200">
        กำลังโหลดข้อมูล...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6 border-b pb-2">
        แก้ไข {type.charAt(0).toUpperCase() + type.slice(1)}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Fields ทั่วไป */}
        {[
          { label: "Title", name: "title" },
          { label: "Author", name: "author" },
          { label: "Category", name: "category" },
          { label: "Publisher", name: "publisher" },
          { label: "Publish Year", name: "publishYear", type: "number" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block font-semibold mb-1">{field.label}:</label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>
        ))}

        {/* Fields เฉพาะ type */}
        {type === "book" && (
          <>
            {[
              { label: "ISBN", name: "isbn" },
              { label: "Edition", name: "edition" },
              { label: "Page Count", name: "pageCount", type: "number" },
              { label: "Language", name: "language" },
              { label: "Genre", name: "genre" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block font-semibold mb-1">{field.label}:</label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="block font-semibold mb-1">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
              />
            </div>
          </>
        )}

        {type === "comic" && (
          <>
            {[
              { label: "ISBN", name: "isbn" },
              { label: "Series", name: "series" },
              { label: "Volume Number", name: "volumeNumber", type: "number" },
              { label: "Illustrator", name: "illustrator" },
              { label: "Color Type", name: "colorType" },
              { label: "Target Age", name: "targetAge" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block font-semibold mb-1">{field.label}:</label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="block font-semibold mb-1">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
              />
            </div>
          </>
        )}

        {type === "journal" && (
          <>
            {[
              { label: "ISSN", name: "issn" },
              { label: "Volume", name: "volume" },
              { label: "Issue", name: "issue" },
              { label: "Publication Frequency", name: "publicationFrequency" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block font-semibold mb-1">{field.label}:</label>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="block font-semibold mb-1">Publisher:</label>
              <input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          อัปเดตข้อมูล
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
