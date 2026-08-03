import { Navigate, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import Book from "@/pages/Book";
import Terms from "@/pages/Terms";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/book" element={<Book />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
