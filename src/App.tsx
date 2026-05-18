import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { ScrollToHash } from "./components/ScrollToHash";
import { Home } from "./pages/Home";
import { DispatchesIndex } from "./pages/DispatchesIndex";
import { DispatchArticle } from "./pages/DispatchArticle";

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dispatches" element={<DispatchesIndex />} />
          <Route path="/dispatches/:slug" element={<DispatchArticle />} />
          <Route path="*" element={<DispatchArticle />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
