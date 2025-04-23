import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  deleteTodo,
  toggleTodoDone,
} from "../../redux/slices/todoSlices";
import TodoCard from "./todoCard";

export default function TodoList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.todos);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [isGrid, setIsGrid] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const todosPerPage = isGrid ? 12 : 4;

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    // Reset to first page
    setCurrentPage(1);
  }, [search, sort, isGrid]);

  const filterAndSortTodos = () => {
    let filtered = items.filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    );

    switch (sort) {
      case "deadline":
        filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }

    return filtered;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-32">
        <div className="w-12 h-12 rounded-full bg-[#0a192f] flex items-center justify-center shadow-[3px_3px_6px_#09152a,-3px_-3px_6px_#0b1d34] animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#64ffda]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 rounded-xl bg-gradient-to-br from-[#0a192f] to-[#112240] shadow-[inset_5px_5px_10px_#09152a,inset_-5px_-5px_10px_#0b1d34]">
        <p className="text-red-400 text-center">{error}</p>
      </div>
    );

  const todos = filterAndSortTodos();
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(todos.length / todosPerPage);

  // Create page numbers array for pagination with ellipsis for many pages
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let pageNumbers = [];

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages are less than or equal to maxPagesToShow
      pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Calculate start and end of shown pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if currentPage is near the beginning
      if (currentPage <= 3) {
        start = 2;
        end = Math.min(maxPagesToShow - 1, totalPages - 1);
      }

      // Adjust if currentPage is near the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - maxPagesToShow + 2);
        end = totalPages - 1;
      }

      // Add ellipsis before middle pages if needed
      if (start > 2) {
        pageNumbers.push("...");
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis after middle pages if needed
      if (end < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-col min-h-full space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Cari Tugas..."
          className="px-4 py-2 w-full sm:w-1/2 rounded-md bg-[#0a192f] border border-gray-700 text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 rounded-md bg-[#0a192f] border border-gray-700 text-white flex-grow sm:flex-grow-0"
          >
            <option value="default">Urutkan</option>
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="deadline">Deadline!</option>
          </select>

          <button
            onClick={() => setIsGrid(!isGrid)}
            className="p-2 rounded-md bg-[#112240] text-[#64ffda] hover:bg-[#0a192f] transition"
            title={isGrid ? "Tampilan List" : "Tampilan Grid"}
          >
            {isGrid ? (
              // Icon List
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              // Icon Grid
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 6h4v4H4V6zm6 0h4v4h-4V6zm6 0h4v4h-4V6zM4 12h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="flex-grow h-max">
        {todos.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0a192f] flex items-center justify-center shadow-[3px_3px_6px_#09152a,-3px_-3px_6px_#0b1d34]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-gray-300">
              Belum ada todo
            </h2>
            <p className="text-gray-500 mt-2">
              Tambahkan tugas baru untuk mulai
            </p>
          </div>
        ) : (
          <div
            className={`${
              isGrid
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                : "flex flex-col gap-4"
            }`}
          >
            {currentTodos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onToggleDone={() => dispatch(toggleTodoDone(todo.id))}
                onDelete={() => dispatch(deleteTodo(todo.id))}
                isGrid={isGrid}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination*/}
      {totalPages > 1 && (
        <div className="mt-auto pt-4">
          <div className="h-full flex flex-wrap justify-center gap-2">
            {/* Previous button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-2 sm:px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-[#112240] text-white hover:bg-[#64ffda]/80 hover:text-[#0a192f] transition"
              }`}
            >
              &laquo;
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((num, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof num === "number" ? setCurrentPage(num) : null
                }
                disabled={typeof num !== "number"}
                className={`px-2 sm:px-3 py-1 rounded-md ${
                  currentPage === num
                    ? "bg-[#64ffda] text-[#0a192f] font-semibold"
                    : typeof num === "number"
                    ? "bg-[#112240] text-white hover:bg-[#64ffda]/80 hover:text-[#0a192f] transition"
                    : "bg-transparent text-gray-400 cursor-default"
                }`}
              >
                {num}
              </button>
            ))}

            {/* Next button */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-2 sm:px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-[#112240] text-white hover:bg-[#64ffda]/80 hover:text-[#0a192f] transition"
              }`}
            >
              &raquo;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
