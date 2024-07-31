import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { Home } from "./pages/home"
import Album from "./pages/album"
import CreateAlbum from "./pages/create-album"
import './App.css'
import { Tracks } from "./pages/tracks"

function App() {

  return (
    <BrowserRouter>
    <Link className="Artist-Name" to={'/'}>Tião Carreiro e Pardinho 🤠</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="/album/:albumId" element={<Album/>} />
        <Route path="/album/create" element={<CreateAlbum/>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
