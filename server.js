const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and form submissions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets
app.use(express.static(path.join(__dirname)));

// Ensure data folder exists
const dataDir = path.join(__dirname, 'data');
const rsvpFilePath = path.join(dataDir, 'rsvps.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(rsvpFilePath)) {
  fs.writeFileSync(rsvpFilePath, JSON.stringify([], null, 2), 'utf8');
}

// API endpoint to receive RSVP submissions
app.post('/api/rsvp', (req, res) => {
  try {
    const { name, guests, attendance, events, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Please provide your full name.' });
    }

    if (!attendance) {
      return res.status(400).json({ success: false, error: 'Please let us know whether you will attend.' });
    }

    const newRsvp = {
      id: Date.now().toString(),
      name: name.trim(),
      guests: guests || 1,
      attendance: attendance,
      events: Array.isArray(events) ? events : (events ? [events] : []),
      message: message ? message.trim() : '',
      submittedAt: new Date().toISOString()
    };

    let rsvps = [];
    try {
      const fileData = fs.readFileSync(rsvpFilePath, 'utf8');
      rsvps = JSON.parse(fileData);
    } catch (err) {
      rsvps = [];
    }

    rsvps.push(newRsvp);
    fs.writeFileSync(rsvpFilePath, JSON.stringify(rsvps, null, 2), 'utf8');

    console.log(`[RSVP] New submission from "${newRsvp.name}" (${newRsvp.attendance})`);

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your RSVP has been received with love and appreciation.',
      rsvp: newRsvp
    });
  } catch (error) {
    console.error('Error saving RSVP:', error);
    return res.status(500).json({ success: false, error: 'An error occurred while saving your RSVP. Please try again.' });
  }
});

// API endpoint to retrieve all RSVPs
app.get('/api/rsvps', (req, res) => {
  try {
    const fileData = fs.readFileSync(rsvpFilePath, 'utf8');
    const rsvps = JSON.parse(fileData);
    return res.json({ success: true, count: rsvps.length, rsvps });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Could not load RSVPs.' });
  }
});

// Fallback to index.html for root path
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start listening
app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('✨ LUXURY PAKISTANI WEDDING INVITATION WEB EXPERIENCE ✨');
  console.log('='.repeat(60));
  console.log(`\n  Server is running at:`);
  console.log(`  👉 Localhost: http://localhost:${PORT}`);
  console.log(`\n  Open your web browser and navigate to the address above.`);
  console.log(`  Press Ctrl + C in the terminal to stop the server.\n`);
  console.log('='.repeat(60));
});
