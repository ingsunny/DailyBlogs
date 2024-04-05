import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* Dynamic Pages  */}
      <div className="px-5 lg:px-0 lg:pr-5">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Sidebar />
                  <Header />
                  <Home />
                </>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
