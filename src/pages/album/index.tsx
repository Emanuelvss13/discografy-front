import { useNavigate, useParams } from 'react-router-dom';
import { IAlbum } from '../../types/album';
import {Axios} from '../../providers/axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './Album.css'

export default function Album() {
  const {albumId} = useParams()
  const [album, setAlbum] = useState<IAlbum>()
  const [trackName, setTrackName] = useState<string>('')
  const [trackDuration, setTrackDuration] = useState<string>('')
  const navigate = useNavigate();


  useEffect(() => {
    Axios.get(`/album-by-id?id=${albumId}`)
      .then(response => {
        setAlbum(response.data.data);
      })
  }, [albumId]);

  const handleChange = (fn: Dispatch<SetStateAction<string>>, event: React.ChangeEvent<HTMLInputElement>) => {
    fn(event.target.value);
  };

  async function handleCreateTrack(name: string, duration: string, event: React.MouseEvent) {
    event.preventDefault();

    await Axios.post(`/track`, {
      name,
      duration,
      "album_id": albumId
    }).then(response => {
      setAlbum(album => ({
        ...album!,
        tracks: [...album!.tracks, response.data.track ]
      }))

      setTrackName('')
      setTrackDuration('')
    })
  }

  async function handleDeleteAlbum(id: number) {
    await Axios.delete(`/album?id=${id}`).then(() => {
      navigate('/')
    })
  }

  async function handleDeleteTrack(id: number) {
    await Axios.delete(`/track?id=${id}`).then(() => {
      const newTracks = album!.tracks.filter(track => track.id !== id  )


      setAlbum(album => ({
        ...album!,
        tracks: [...newTracks ]
      }))
    })
  }

  return(
    <div className='Container'>
    <div className='Album-Actions'>
      <h1>{album?.name}</h1>
      <button onClick={() => handleDeleteAlbum(Number(albumId))}>Excluir</button>
    </div>
      
      {album?.tracks.map(track => (
        <div className='Tracks' key={track.id}>
          <p>Nome: {track.name}</p>
          <p>Duração: {track.duration}</p>
          <button onClick={() => handleDeleteTrack(track.id)}>Excluir</button>
        </div>
      ))}
      <form className='Create-Track-Container'>
        <input value={trackName} onChange={(e) => handleChange(setTrackName, e)} type="text" placeholder='Digite o nome da faixa' />
        <input value={trackDuration} onChange={(e) => handleChange(setTrackDuration, e)} type="text" placeholder='Digite a duração da faixa' />
        <button onClick={(e) => handleCreateTrack(trackName, trackDuration, e)}>Criar Faixa</button>
      </form>
    </div>
  )

}