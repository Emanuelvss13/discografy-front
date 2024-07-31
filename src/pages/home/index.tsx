import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IAlbum } from "../../types/album";
import {Axios} from "../../providers/axios";
import './Home.css'


export function Home(){
  const [searchAlbum, setSearchAlbum] = useState<string>('')
  const [albums, setAlbums] = useState<IAlbum[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    Axios.get(`/albums`)
      .then(response => {
        setAlbums(response.data.data);
      })
  }, []);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAlbum(event.target.value);
  };

  async function searchAlbumByName(name: string, event: React.MouseEvent) {
    event.preventDefault()
    await Axios.get(`/album-by-name?name=${name}`).then((response) => {
      setAlbums(response.data.data)
    })
  }

  return (
    <div className="Home">
    
    <form className="Search">
      <input
      value={searchAlbum}
      onChange={handleChange}
      placeholder="Digite o nome do album..."
      type="text" />
      <button onClick={(e) => searchAlbumByName(searchAlbum, e)} >Procurar</button>
    </form>

      <h2>Albuns</h2>

      {albums.map(album => (
        <Link to={`/album/${album.id}`} className='Album' key={album.id}>{album.name}</Link>
      ))}

      <div className="divide">
      <button className="Create-Album-Button" onClick={() => navigate('album/create')}>Criar Album</button>
      </div>

      <Link to={'/tracks'}>Procurar por faixas</Link>
      
    </div>
  )
}