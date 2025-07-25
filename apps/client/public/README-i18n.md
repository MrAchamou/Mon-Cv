
# Guide d'Internationalisation pour Templates CV

Ce guide explique comment utiliser le système d'internationalisation créé pour rendre vos templates de CV multilingues.

## Structure des fichiers

```
/
├── i18n/
│   └── translations.json          # Fichier de traductions
├── js/
│   └── i18n.js                   # Module d'internationalisation
├── example-cv-template.html       # Exemple d'usage
└── README-i18n.md               # Ce guide
```

## Comment utiliser

### 1. Inclure le script d'internationalisation

Ajoutez cette ligne avant la fermeture de la balise `</body>` :

```html
<script src="./js/i18n.js"></script>
```

### 2. Marquer les éléments à traduire

Utilisez l'attribut `data-i18n` avec la clé de traduction :

```html
<h2 data-i18n="sections.about.title">À propos de moi</h2>
<p data-i18n="sections.about.description">Description par défaut</p>
```

### 3. Autres attributs supportés

Pour les placeholders :
```html
<input type="text" data-i18n-placeholder="common.search" placeholder="Rechercher...">
```

Pour les attributs title :
```html
<button data-i18n-title="common.close" title="Fermer">×</button>
```

## Ajouter une nouvelle langue

### 1. Modifier le fichier translations.json

Ajoutez votre langue dans le fichier `i18n/translations.json` :

```json
{
  "fr": { ... },
  "en": { ... },
  "es": { ... },
  "de": {
    "nav": {
      "about": "Über uns",
      "experience": "Erfahrung",
      ...
    },
    ...
  }
}
```

### 2. Mettre à jour le sélecteur de langue

Dans le fichier `js/i18n.js`, modifiez :

1. Le tableau `supportedLanguages` :
```javascript
this.supportedLanguages = ['fr', 'en', 'es', 'de'];
```

2. Le HTML du sélecteur dans la méthode `createLanguageSelector()` :
```javascript
<option value="de" ${this.currentLanguage === 'de' ? 'selected' : ''}>🇩🇪 Deutsch</option>
```

## Structure des clés de traduction

Les clés suivent une structure hiérarchique :

```json
{
  "langue": {
    "section": {
      "sous-section": "Traduction"
    }
  }
}
```

Exemples :
- `nav.about` → Navigation "À propos"
- `sections.experience.title` → Titre de la section expérience
- `common.download` → Bouton télécharger

## Fonctionnalités

### ✅ Détection automatique de la langue
- Utilise `navigator.language` par défaut
- Sauvegarde dans `localStorage`
- Fallback vers l'anglais

### ✅ Changement de langue en temps réel
- Sans rechargement de page
- Interface utilisateur fluide
- Sélecteur visuel en haut à droite

### ✅ Responsive
- Adapté aux écrans mobiles
- Sélecteur optimisé pour tous les appareils

### ✅ Extensible
- Facile d'ajouter de nouvelles langues
- Structure modulaire
- Compatible avec n'importe quel template HTML

## Personnalisation

### Modifier le style du sélecteur

Le style est défini dans la méthode `createLanguageSelector()`. Vous pouvez personnaliser :

- Position : `top`, `right`
- Couleurs : `border-color`, `background`
- Taille : `padding`, `font-size`

### Ajouter des traductions dynamiques

Utilisez l'API JavaScript :

```javascript
// Attendre que l'i18n soit initialisé
document.addEventListener('DOMContentLoaded', () => {
  // Traduire dynamiquement
  const translatedText = window.i18n.t('sections.about.title');
  console.log(translatedText);
});
```

## Compatibilité

- ✅ Navigateurs modernes (ES6+)
- ✅ GitHub Pages
- ✅ Tous les templates HTML/CSS/JS
- ✅ Pas de framework requis
- ✅ Responsive design

## Exemple d'intégration

Voir le fichier `example-cv-template.html` pour un exemple complet d'intégration du système d'internationalisation dans un template CV.
