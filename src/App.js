import React,{ useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
      api.get('repositories').then(response => {
        setRepositories(response.data)
      })
  }, [])

  async function handleAddRepository() {
    
    const repository = {
      title: "Desafio Node.js",
      url: "https://github.com/ElderGr/gostack-conceitos-node",
      techs: ["Node.js", "Express"]
    }

    const response = await api.post('repositories', repository)

    setRepositories([ ...repositories, response.data ])
  }

  async function handleRemoveRepository(id) {
    const filteredRepositories = repositories.filter(repository => repository.id !== id)

    api.delete(`repositories/${id}`).then(response => {
      setRepositories(filteredRepositories);
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map( repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          )) 
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
