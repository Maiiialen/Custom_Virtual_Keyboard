export const layout1 = {
  default: [
    "1 2 3 4 5 6 7 8 9 0",
    "q w e r t y u i o p",
    "a s d f g h j k l ;",
    "{shift} z x c v b n m , .",
    "{lay1} {space} {lay2}",
  ],
};

export const layout2 = {
  default: [
    "1 2 3 4 5 6 7 8 9 0",
    "q w e r t y u i o p",
    "a s d f g h j k l ;",
    "{shift} z x c v b n m , .",
    "{lay1} {space} {lay2}",
  ],
};

export const display = {
  "{shift}": "⇧",
  "{lay1}": "🌹",
  "{lay2}": "🌷"
}

export const buttonTheme = () => [
  {
    class: "blue-key",
    buttons: "1 2 3 4 5 6 7 8 9 0"
  },
  {
    class: "space-key",
    buttons: "{space}"
  },
  {
    class: "function-key",
    buttons: "{lay1} {lay2}"
  }
]
