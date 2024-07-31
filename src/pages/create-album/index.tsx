import { useState } from 'react'
import { Axios } from '../../providers/axios'
import './Create-Album.css'
import { useNavigate } from 'react-router-dom'

export default function CreateAlbum(){
  const [name, setName] = useState<string>('')
  const navigate = useNavigate()

  async function handleCreateAlbum(name: string,event: React.MouseEvent) {
    event.preventDefault()
    
    await Axios.post('/album', {
      name
    }).then((response => {
      navigate(`/album/${response.data.data.id}`)
    }))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return(
    <div className="Create-Album-Container">
      <h2>criar album</h2>

      <form>
        <input onChange={handleChange} value={name} type="text" placeholder="Digite o nome do album..." />
        <button onClick={(e) => handleCreateAlbum(name, e)}>criar</button>
      </form>
    </div>
  )
}