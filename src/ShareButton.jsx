import React from 'react';

function formatResultText(result) {
  let text = 'Resultado do Sorteio:\n';
  result.forEach((item, idx) => {
    text += `${item.name}: ${item.race.name} [${item.race.expansion === 'base' ? 'Base' : item.race.expansion.charAt(0).toUpperCase() + item.race.expansion.slice(1)}]`;
    text += '\n';
  });
  return text;
}

export default function ShareButton({ result }) {
  const handleShare = () => {
    const text = formatResultText(result);
    navigator.clipboard.writeText(text);
    alert('Resultado copiado para a área de transferência!');
  };

  return (
    <button className="draw-btn" style={{ marginTop: 16 }} onClick={handleShare}>
      Compartilhar Resultado (Texto)
    </button>
  );
}
