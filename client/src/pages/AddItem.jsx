// src/pages/AddItem.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

import BookService from "../services/bookService";
import ComicService from "../services/comicService";
import JournalService from "../services/journalService";

const AddItem = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [formData, setFormData] = useState({});

  const services = {
    book: BookService,
    comic: ComicService,
    journal: JournalService,
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!type) {
      Swal.fire("Error", "กรุณาเลือกประเภทของไอเท็ม", "error");
      return;
    }

    const serviceKey = type.toLowerCase();
    const service = services[serviceKey];
    if (!service) {
      Swal.fire("Error", "ประเภทไม่ถูกต้อง", "error");
      return;
    }

    try {
      let payload = {
        title: formData.title || "",
        author: formData.author || "",
        category: formData.category || "",
        publishYear: Number(formData.publishYear) || new Date().getFullYear(),
        isbn: formData.isbn || "",
        status: "AVAILABLE",
        coverImage: formData.coverImage || "",
        description: formData.description || "",
        location: formData.location || "",
        addedDate: new Date().toISOString(),
        itemType: type.charAt(0).toUpperCase() + type.slice(1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (serviceKey === "book") {
        payload = {
          ...payload,
          publisher: formData.publisher || "",
          edition: formData.edition || "",
          pageCount: Number(formData.pageCount) || 0,
          language: formData.language || "",
          genre: formData.genre || "",
        };
      }

      if (serviceKey === "journal") {
        payload = {
          ...payload,
          issn: formData.issn || "",
          volume: formData.volume || "",
          issue: formData.issue || "",
          publicationFrequency: formData.publicationFrequency || "",
          publisher: formData.publisher || "",
        };
      }

      if (serviceKey === "comic") {
        payload = {
          ...payload,
          series: formData.series || "",
          volumeNumber: Number(formData.volumeNumber) || 0,
          illustrator: formData.illustrator || "",
          colorType: formData.colorType || "",
          targetAge: formData.targetAge || "",
        };
      }

      console.log("Payload:", payload);

      await service.create(payload);

      Swal.fire({
        icon: "success",
        title: "สร้างสำเร็จ",
        text: `${type.charAt(0).toUpperCase() + type.slice(1)} ถูกสร้างเรียบร้อยแล้ว`,
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || error.message, "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">เพิ่มไอเท็มใหม่</h1>

      {/* เลือกประเภท */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">เลือกประเภทไอเท็ม:</label>
        <select
          value={type}
          onChange={handleTypeChange}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option value="">-- เลือกประเภท --</option>
          <option value="book">Book</option>
          <option value="comic">Comic</option>
          <option value="journal">Journal</option>
        </select>
      </div>

      {type && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ฟิลด์ทั่วไป */}
          {[
            { label: "Title", name: "title" },
            { label: "Author", name: "author" },
            { label: "Category", name: "category" },
            { label: "Publish Year", name: "publishYear", type: "number" },
            { label: "ISBN", name: "isbn" },
            { label: "Cover Image URL", name: "coverImage" },
            { label: "Location", name: "location" },
            { label: "Description", name: "description", type: "textarea" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block font-semibold mb-1">{field.label}:</label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
              ) : (
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder={field.name === "coverImage" ? "https://example.com/image.jpg" : ""}
                />
              )}
            </div>
          ))}

          {/* ฟิลด์เฉพาะแต่ละประเภท */}
          {type === "book" && (
            <>
              {[
                { label: "Publisher", name: "publisher" },
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
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg"
                  />
                </div>
              ))}
            </>
          )}

          {type === "comic" && (
            <>
              {[
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
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg"
                  />
                </div>
              ))}
            </>
          )}

          {type === "journal" && (
            <>
              {[
                { label: "ISSN", name: "issn" },
                { label: "Volume", name: "volume" },
                { label: "Issue", name: "issue" },
                { label: "Publication Frequency", name: "publicationFrequency" },
                { label: "Publisher", name: "publisher" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block font-semibold mb-1">{field.label}:</label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg"
                  />
                </div>
              ))}
            </>
          )}

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            เพิ่มไอเท็ม
          </button>
        </form>
      )}
    </div>
  );
};

export default AddItem;