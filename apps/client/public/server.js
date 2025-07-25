
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Servir les fichiers statiques
app.use(express.static(__dirname));

// Route pour le générateur de CV (page principale)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'cv-generator.html'));
});

// Route pour l'exemple de template
app.get('/template', (req, res) => {
  res.sendFile(path.join(__dirname, 'example-cv-template.html'));
});

// API simulée pour la génération de CV (à remplacer par votre backend)
app.post('/api/resume', (req, res) => {
  // Simuler la création d'un CV avec votre backend
  const mockResponse = {
    id: 'generated-' + Date.now(),
    username: 'user123',
    slug: req.body.title.toLowerCase().replace(/\s+/g, '-'),
    title: req.body.title,
    data: req.body.data,
    template: req.body.template,
    visibility: req.body.visibility
  };
  
  console.log('CV généré:', mockResponse);
  res.json(mockResponse);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌟 CV Template Server running on http://0.0.0.0:${PORT}`);
  console.log(`📄 Access your multilingual CV at: http://0.0.0.0:${PORT}`);
  console.log(`✨ Features available:`);
  console.log(`   • PDF/DOCX Export`);
  console.log(`   • Real-time Preview`);
  console.log(`   • AI Suggestions`);
  console.log(`   • Multiple Templates`);
  console.log(`   • Multilingual Support (FR/EN)`);
});
