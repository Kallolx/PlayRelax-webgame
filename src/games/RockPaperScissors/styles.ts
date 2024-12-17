export const choices = [
  {
    id: 'rock',
    icon: '👊',
    beats: 'scissors',
    color: 'from-red-500/20 to-red-600/20',
    borderColor: 'border-red-500',
    shadowColor: 'shadow-red-500/50',
    label: 'Rock',
  },
  {
    id: 'paper',
    icon: '✋',
    beats: 'rock',
    color: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-500',
    shadowColor: 'shadow-blue-500/50',
    label: 'Paper',
  },
  {
    id: 'scissors',
    icon: '✌️',
    beats: 'paper',
    color: 'from-yellow-500/20 to-yellow-600/20',
    borderColor: 'border-yellow-500',
    shadowColor: 'shadow-yellow-500/50',
    label: 'Scissors',
  },
];

export const resultStyles = {
  win: {
    text: 'text-green-500',
    bg: 'bg-green-500/20',
    border: 'border-green-500',
    shadow: 'shadow-green-500/50',
  },
  lose: {
    text: 'text-red-500',
    bg: 'bg-red-500/20',
    border: 'border-red-500',
    shadow: 'shadow-red-500/50',
  },
  draw: {
    text: 'text-yellow-500',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500',
    shadow: 'shadow-yellow-500/50',
  },
}; 