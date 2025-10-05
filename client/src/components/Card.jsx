// src/components/Card.jsx
import React from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router";

import ComicService from "../services/comicService";
import BookService from "../services/bookService";
import JournalService from "../services/journalService";

const Card = ({ item }) => {
  const navigate = useNavigate();

  if (!item) return null;

  const formattedDate = item.addedDate
    ? new Date(item.addedDate).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

  const statusColors = {
    AVAILABLE: "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200",
    BORROWED: "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200",
    RESERVED: "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200",
  };

  const getServiceByType = (type) => {
    const t = (type || "").toLowerCase();
    if (t === "book" || t === "books") return BookService;
    if (t === "comic" || t === "comics") return ComicService;
    if (t === "journal" || t === "journals") return JournalService;
    console.warn("ไม่พบ service สำหรับ type:", type);
    return null;
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "คุณแน่ใจไหม?",
      text: "การลบสินค้านี้จะไม่สามารถกู้คืนได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่ ลบเลย!",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      try {
        const service = getServiceByType(item.type);
        if (!service) {
          Swal.fire({
            icon: "error",
            title: "ไม่พบประเภทสินค้า",
            text: "ไม่สามารถลบสินค้านี้ได้",
          });
          return;
        }

        await service.remove(item.itemId);

        Swal.fire({
          icon: "success",
          title: "ลบสำเร็จ",
          text: "สินค้าถูกลบเรียบร้อยแล้ว",
          timer: 1500,
          showConfirmButton: false,
        });

        window.location.reload();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถลบได้",
          text: error.response?.data?.message || error.message,
        });
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 h-full flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <div className="flex flex-col space-y-4">
        {item.coverImage && (
          <img
            src={item.coverImage}
            alt={item.title || "No title"}
            className="rounded-lg w-full h-48 object-cover"
          />
        )}

        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 border-b pb-2">
          {item.title || "-"}
        </h2>

        <div className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
          {item.author && (
            <p>
              <span className="font-semibold">ผู้แต่ง:</span> {item.author}
            </p>
          )}
          <p>
            <span className="font-semibold">ประเภท:</span> {item.category || "-"}
          </p>
          <p>
            <span className="font-semibold">วันที่เพิ่ม:</span> {formattedDate}
          </p>
          {item.location && (
            <p>
              <span className="font-semibold">สถานที่:</span> {item.location}
            </p>
          )}
          <p>
            <span className="font-semibold">สถานะ:</span>{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                statusColors[item.status] || "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {item.status || "-"}
            </span>
          </p>
        </div>

        <div className="flex flex-row justify-end gap-2 mt-4">
          <button
            onClick={handleDelete}
            className="px-3 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg text-sm transition"
          >
            ลบ
          </button>
          <Link
            to={`/items/update/${(item.type || "").toLowerCase()}/${item.itemId || ""}`}
            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg text-sm text-center transition"
          >
            แก้ไข
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
