import { Routes, Route } from "react-router-dom";
import "./App.css";
import ALbumMp3Feature from "./features/AlbumMp3";
import PostFeature from "./features/Post";
import TodoFeature from "./features/Todo";
import AddAndDeleteTodoFeature from "./features/AddAndDeleteTodo";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import ProductFeature from "./features/Product";
import ProductDetail from "./features/Product/pages/ProductDetail";
import ProductList from "./features/Product/pages/ProductList";
import { useEffect } from "react";
import productApi from "./api/productApi";
import CountFeature from "./features/Count";
import CartFeature from "features/Cart";
import DescriptionTab from "features/Product/components/Tabs/DescriptionTab";
import AdditionalTab from "features/Product/components/Tabs/AdditionalTab";
import ReviewTab from "features/Product/components/Tabs/ReviewTab";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="" element={<ALbumMp3Feature />} />
        <Route path="product" element={<ProductFeature />}>
          <Route path="" element={<ProductList />} />
          <Route path=":productId" element={<ProductDetail />}>
            <Route path="" element={<DescriptionTab />} />
            <Route path="additional" element={<AdditionalTab />} />
            <Route path="reviews" element={<ReviewTab />} />
          </Route>
        </Route>
        <Route path="todo" element={<TodoFeature />} />
        <Route path="post" element={<PostFeature />} />
        <Route path="add-and-delete" element={<AddAndDeleteTodoFeature />} />
        <Route path="count" element={<CountFeature />} />
        <Route path="cart" element={<CartFeature />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
