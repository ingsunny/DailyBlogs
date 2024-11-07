import Header from "./components/Header";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home showContent={false} />
              </>
            }
          />
          <Route
            path="/post/:category/:postID"
            element={
              <>
                <Home showContent={true} />
              </>
            }
          />
          <Route path="/author/create_post" element={<CreatePost />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
