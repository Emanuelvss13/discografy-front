import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ITrack } from "../../types/album";
import {Axios} from "../../providers/axios";
import './Track.css'


export function Tracks(){
  const [searchAlbum, setSearchAlbum] = useState<string>('')
  const [tracks, setTracks] = useState<ITrack[]>([])

  useEffect(() => {
    Axios.get(`/tracks`)
      .then(response => {
        setTracks(response.data.data);
      })
  }, []);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAlbum(event.target.value);
  };

  async function searchTrackByName(name: string, event: React.MouseEvent) {
    event.preventDefault()
    await Axios.get(`/track?name=${name}`).then((response) => {
      setTracks(response.data.track)
    })
  }

  return (
    <div className="Home">
    
    <form className="Search">
      <input
      value={searchAlbum}
      onChange={handleChange}
      placeholder="Digite o nome da faixa..."
      type="text" />
      <button onClick={(e) => searchTrackByName(searchAlbum, e)} >Procurar</button>
    </form>

      <h2>Faixas</h2>

      {tracks.map(track => (
        <Link to={`/album/${track.album_id}`} className='Album' key={track.id}>{track.name}</Link>
      ))}

      <Link to={'/'}>Procurar por Albuns</Link>
    </div>
  )
}