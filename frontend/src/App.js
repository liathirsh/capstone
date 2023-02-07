import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
// import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { NotFound } from "./pages/404";
import { Home } from "./pages/Home";
import { Leaderboard } from "./pages/Leaderboard";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <div class="container-fluid">
            <Link to="/" class="navbar-brand">
              Popular Python Packages
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarColor01"
              aria-controls="navbarColor01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor01">
              <ul class="navbar-nav me-auto">
                <li class="nav-item">
                  <Link to="/" class="nav-link active">
                    Home
                    <span class="visually-hidden">(current)</span>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/about" class="nav-link">
                    About
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/Leaderboard" class="nav-link">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
            <form class="d-flex">
              <input
                class="form-control me-sm-2"
                type="search"
                placeholder="Search"
              />
              <button class="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        {/* <Route path="settings" element={<Settings />} />
        <Route path="home" element={<Home />} />
        <Route path="homepage" element={<HomePage />} /> */}
        <Route path="leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
