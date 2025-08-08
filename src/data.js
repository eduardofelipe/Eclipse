// Lista de raças, cores e expansões
export const RACES = [
  // Jogo Base
  { name: 'Eridani Empire', color: 'red', expansion: 'base' },
  { name: 'Planta', color: 'green', expansion: 'base' },
  { name: 'Descendants of Draco', color: 'yellow', expansion: 'base' },
  { name: 'Hydran Progress', color: 'blue', expansion: 'base' },
  { name: 'Mechanema', color: 'white', expansion: 'base' },
  { name: 'Orion Hegemony', color: 'black', expansion: 'base' },
  // Outcasts
  { name: 'The Exiles', color: 'gray', expansion: 'outcasts' },
  { name: 'Rho Indi Syndicate', color: 'salmon', expansion: 'outcasts' },
  // Seekers
  { name: 'Wardens of Magellan', color: 'violet', expansion: 'seekers' },
  { name: 'Enlightened of Lyra', color: 'orange', expansion: 'seekers' },
];

export const EXPANSIONS = [
  { key: 'base', label: 'Jogo Base' },
  { key: 'outcasts', label: 'Expansão Outcasts' },
  { key: 'seekers', label: 'Expansão Seekers' },
];
