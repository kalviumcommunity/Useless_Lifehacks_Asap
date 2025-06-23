const express = require('express');
const router = express.Router();
const Lifehack = require('./models/Lifehack'); // Adjust path if needed

// CREATE
router.post('/lifehacks', async (req, res) => {
  try {
    const newHack = new Lifehack(req.body);
    const savedHack = await newHack.save();
    res.status(201).json(savedHack);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get('/lifehacks', async (req, res) => {
  try {
    const hacks = await Lifehack.find();
    res.status(200).json(hacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get('/lifehacks/:id', async (req, res) => {
  try {
    const hack = await Lifehack.findById(req.params.id);
    res.status(200).json(hack);
  } catch (err) {
    res.status(404).json({ error: "Not Found" });
  }
});

// UPDATE
router.put('/lifehacks/:id', async (req, res) => {
  try {
    const updated = await Lifehack.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/lifehacks/:id', async (req, res) => {
  try {
    await Lifehack.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
