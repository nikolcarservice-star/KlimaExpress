const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/lead', (req, res) => {
  const { name, phone, city } = req.body;

  if (!name || !phone || !city) {
    return res.status(400).json({ success: false, message: 'Uzupełnij wszystkie pola.' });
  }

  console.log('[LEAD]', { name, phone, city, at: new Date().toISOString() });

  res.json({ success: true });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`KlimaExpress działa na http://localhost:${PORT}`);
  });
}

module.exports = app;
