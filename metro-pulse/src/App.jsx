import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ArticleDetail from "./pages/ArticleDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/article/:slug" element={<ArticleDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
