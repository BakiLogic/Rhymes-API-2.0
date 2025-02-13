import SignIn from "./componentes/signinScreen.js"
import Title from "./componentes/titleScreen.js"
import AddRhyme from "./componentes/addRhyme.js"
import SearchResult from "./componentes/searchResultScreen.js"
import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/title" element={<Title />} />
            <Route path="/AddRhyme" element={<AddRhyme/>} />
            <Route path="/SearchResult" element={<SearchResult/>} />
        </Routes>
    </Router>
  );
}

export default App;
