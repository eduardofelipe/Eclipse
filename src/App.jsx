
import { useState } from 'react';
import './App.css';
import { RACES, EXPANSIONS } from './data';
import ShareButton from './ShareButton.jsx';


function decodeResult(encoded) {
  try {
    const data = JSON.parse(decodeURIComponent(atob(encoded)));
    return data.map((r, i) => ({
      name: r.n,
      race: {
        name: r.r,
        color: r.c,
        expansion: r.e,
      },
    }));
  } catch {
    return null;
  }
}

function App() {
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState(['', '']);
  const [selectedExpansions, setSelectedExpansions] = useState(['base']);
  const [result, setResult] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('sorteio')) {
      return decodeResult(params.get('sorteio'));
    }
    return null;
  });

  // Se veio de um link de sorteio, mostrar só o resultado
  const params = new URLSearchParams(window.location.search);
  const onlyResult = params.has('sorteio');

  // Limites de jogadores
  const minPlayers = 2;
  const maxPlayers = RACES.filter(r => selectedExpansions.includes(r.expansion)).length;

  // Atualiza nomes
  const handleNameChange = (idx, value) => {
    const newNames = [...playerNames];
    newNames[idx] = value;
    setPlayerNames(newNames);
  };

  // Atualiza número de jogadores
  const handleNumPlayers = (n) => {
    setNumPlayers(n);
    setPlayerNames(Array(n).fill('').map((v, i) => playerNames[i] || ''));
  };

  // Atualiza expansões
  const handleExpansion = (key) => {
    setSelectedExpansions((prev) => {
      if (prev.includes(key)) {
        return prev.length === 1 ? prev : prev.filter(e => e !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  // Sorteio
  const handleDraw = () => {
    const availableRaces = RACES.filter(r => selectedExpansions.includes(r.expansion));
    const shuffled = [...availableRaces].sort(() => Math.random() - 0.5);
    const draw = playerNames.map((name, i) => ({
      name: name || `Jogador ${i+1}`,
      race: shuffled[i],
    }));
    setResult(draw);
  };

  if (onlyResult && result) {
    return (
      <div className="sorteador-container">
        <div className="result">
          <h2>Resultado do Sorteio</h2>
          {result.map((item, idx) => (
            <div className="race-row" key={idx}>
              <span
                className="race-color"
                style={{ background: item.race.color, border: '3px solid #fff' }}
                title={item.race.name}
              />
              <span className="player-name">{item.name}:</span>
              <span className="race-name">{item.race.name}</span>
              <span style={{ color: '#aaa', fontSize: 12 }}>({item.race.expansion === 'base' ? 'Base' : item.race.expansion.charAt(0).toUpperCase() + item.race.expansion.slice(1)})</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="sorteador-container">
      <h1>Sorteador de Raças</h1>
      <div className="expansions">
        <h2>Expansões</h2>
        {EXPANSIONS.map(exp => (
          <label key={exp.key} style={{ marginRight: 16 }}>
            <input
              type="checkbox"
              checked={selectedExpansions.includes(exp.key)}
              onChange={() => handleExpansion(exp.key)}
              disabled={exp.key === 'base' && selectedExpansions.length === 1}
            />
            {exp.label}
          </label>
        ))}
      </div>
      <div className="players">
        <h2>Número de Jogadores</h2>
        <input
          type="number"
          min={minPlayers}
          max={maxPlayers}
          value={numPlayers}
          onChange={e => handleNumPlayers(Number(e.target.value))}
        />
        <div className="player-names">
          {Array.from({ length: numPlayers }).map((_, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Nome do Jogador ${idx + 1}`}
              value={playerNames[idx] || ''}
              onChange={e => handleNameChange(idx, e.target.value)}
              style={{ margin: 4 }}
            />
          ))}
        </div>
      </div>
      <button className="draw-btn" onClick={handleDraw} disabled={numPlayers > maxPlayers}>
        Sortear Raças
      </button>
      {numPlayers > maxPlayers && (
        <div style={{ color: 'red', marginTop: 8 }}>
          Número de jogadores excede o número de raças disponíveis!
        </div>
      )}
      {result && (
        <div className="result">
          <h2>Resultado do Sorteio</h2>
          {result.map((item, idx) => (
            <div className="race-row" key={idx}>
              <span
                className="race-color"
                style={{ background: item.race.color, border: '3px solid #fff' }}
                title={item.race.name}
              />
              <span className="player-name">{item.name}:</span>
              <span className="race-name">{item.race.name}</span>
              <span style={{ color: '#aaa', fontSize: 12 }}>({item.race.expansion === 'base' ? 'Base' : item.race.expansion.charAt(0).toUpperCase() + item.race.expansion.slice(1)})</span>
            </div>
          ))}
          <ShareButton result={result} />
        </div>
      )}
    </div>
  );
}

export default App;
