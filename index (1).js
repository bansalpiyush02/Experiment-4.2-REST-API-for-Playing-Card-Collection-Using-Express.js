const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory card collection
let cards = [];
let nextId = 1;

// Routes

// 1. List all cards
app.get("/cards", (req, res) => {
  res.json(cards);
});

// 2. Add a new card
app.post("/cards", (req, res) => {
  const { suit, value } = req.body;
  
  if (!suit || !value) {
    return res.status(400).json({ error: "Suit and value are required" });
  }

  const newCard = {
    id: nextId++,
    suit,
    value,
  };

  cards.push(newCard);
  res.status(201).json(newCard);
});

// 3. Get a card by ID
app.get("/cards/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const card = cards.find(c => c.id === id);

  if (!card) {
    return res.status(404).json({ error: "Card not found" });
  }

  res.json(card);
});

// 4. Delete a card by ID
app.delete("/cards/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cards.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Card not found" });
  }

  const removed = cards.splice(index, 1);
  res.json({ message: "Card deleted", card: removed[0] });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
