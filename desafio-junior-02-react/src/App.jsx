import { useState } from "react";
import "./App.css";

/**
 *  o usuário pode clicar em qualquer lugar da página.
    deve-se renderizar um pequeno círculo na posição clicada.
    a cada clique, mantém-se os círculos já criados e renderiza-se um novo.
    rie duas funcionalidades para a aplicação:
     desfazer (undo)
     refazer (redo)
 */

function App() {
  const [eixos, setEixos] = useState([]);
  const [refazerEixos, setRefazerEixos] = useState([])

  function handleClick(event) {
    console.log(event);
    const novoPonto = {
      clientX: event.clientX,
      clientY: event.clientY,
    };

    setEixos((prev) => [...prev, novoPonto]);
    setRefazerEixos([])
  }

  function handleDesafazer(event) {
    event.stopPropagation(); // serve para o elemento filho nao sobrescrever outros elementos filhos

    if (eixos.length === 0) {
      alert("Nao existem dados para serem defeitos");
      return;
    }

    // pegar o ultimo elemento do array
    const ultimoPonto = eixos[eixos.length - 1];
    setRefazerEixos(prev => [...prev, ultimoPonto]);
    const novoArray = eixos.slice(0,-1)
    setEixos(novoArray);

  }

  function handleRefazer(event) {
    event.stopPropagation();

    if(refazerEixos.length === 0) {
      alert('Nao existe pontos para serem refeitos');
      return;
    }

    const ultimoPonto = refazerEixos[refazerEixos.length - 1];
    const novoArray = refazerEixos.slice(0,-1);
    setRefazerEixos(novoArray);
    setEixos(prev => [...prev, ultimoPonto])
  }
  return (
    <div id="page" onClick={handleClick}>
      <button onClick={handleDesafazer}>desfazer</button>
      <button onClick={handleRefazer}>refazer</button>
      {eixos.map((item, index) => {
        return (
          <span
            className="ponto"
            style={{ top: item.clientY, left: item.clientX }}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default App;
