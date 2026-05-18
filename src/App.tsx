import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { ScrollToHash } from "./components/ScrollToHash";
import { Home } from "./pages/Home";
import { DispatchesIndex } from "./pages/DispatchesIndex";
import { DispatchArticle } from "./pages/DispatchArticle";
import { useSystemTheme } from "./hooks/useSystemTheme";

function App() {
  // Theme is driven by the device's `prefers-color-scheme` setting and
  // reacts to changes in real time. No in-app toggle.
  useSystemTheme();

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
