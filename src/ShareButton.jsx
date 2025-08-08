import React from 'react';

function encodeResult(result) {
  // Codifica o resultado em base64 para compartilhar via URL
  const data = result.map(r => ({ n: r.name, r: r.race.name, c: r.race.color, e: r.race.expansion }));
  return btoa(encodeURIComponent(JSON.stringify(data)));
}

export default function ShareButton({ result }) {
  const handleShare = () => {
    const encoded = encodeResult(result);
    const url = `${window.location.origin}${window.location.pathname}?sorteio=${encoded}`;
    if (navigator.share) {
      navigator.share({
        title: 'Resultado do Sorteio',
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <button className="draw-btn" style={{ marginTop: 16 }} onClick={handleShare}>
      Compartilhar Resultado
    </button>
  );
}
