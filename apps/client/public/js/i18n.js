class I18n {
  constructor() {
    this.translations = {};
    this.supportedLanguages = ['fr', 'en'];
    this.currentLanguage = this.detectLanguage();
    this.isInitialized = false;
    this.initCallbacks = [];
    this.init();
  }

  async init() {
    try {
      const response = await fetch('./i18n/translations.json');
      this.translations = await response.json();
      console.log('Translations loaded:', this.translations);
      this.isInitialized = true;
      this.translatePage();

      // Execute all pending callbacks
      this.initCallbacks.forEach(callback => callback());
      this.initCallbacks = [];
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }

  onInitialized(callback) {
    if (this.isInitialized) {
      callback();
    } else {
      this.initCallbacks.push(callback);
    }
  }

  detectLanguage() {
    // Vérifier le localStorage d'abord
    const savedLang = localStorage.getItem('cv-language');
    if (savedLang && this.supportedLanguages.includes(savedLang)) {
      return savedLang;
    }

    // Détecter la langue du navigateur
    const browserLang = navigator.language.slice(0, 2);
    return this.supportedLanguages.includes(browserLang) ? browserLang : 'en';
  }

  createLanguageSelector() {
    // Créer le sélecteur de langue
    const languageSelector = document.createElement('div');
    languageSelector.className = 'language-selector';
    languageSelector.innerHTML = `
      <select id="language-select" class="language-select">
        <option value="fr" ${this.currentLanguage === 'fr' ? 'selected' : ''}>🇫🇷 Français</option>
        <option value="en" ${this.currentLanguage === 'en' ? 'selected' : ''}>🇬🇧 English</option>
      </select>
    `;

    // Ajouter les styles
    const style = document.createElement('style');
    style.textContent = `
      .language-selector {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
      }

      .language-select {
        padding: 8px 12px;
        border: 2px solid #333;
        border-radius: 6px;
        background: white;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
      }

      .language-select:hover {
        border-color: #007bff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }

      .language-select:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0,123,255,0.25);
      }

      @media (max-width: 768px) {
        .language-selector {
          top: 10px;
          right: 10px;
        }

        .language-select {
          padding: 6px 10px;
          font-size: 12px;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(languageSelector);

    // Ajouter l'événement de changement de langue
    document.getElementById('language-select').addEventListener('change', (e) => {
      this.changeLanguage(e.target.value);
    });
  }

  changeLanguage(lang) {
    this.currentLanguage = lang;
    localStorage.setItem('cv-language', lang);
    this.translatePage();
  }

  translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      if (translation) {
        element.textContent = translation;
      }
    });

    // Traduire les placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const translation = this.getTranslation(key);
      if (translation) {
        element.placeholder = translation;
      }
    });

    // Traduire les attributs title
    const titleElements = document.querySelectorAll('[data-i18n-title]');
    titleElements.forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      const translation = this.getTranslation(key);
      if (translation) {
        element.title = translation;
      }
    });
  }

  getTranslation(key) {
    const keys = key.split('.');
    let translation = this.translations[this.currentLanguage];

    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        console.warn(`Translation not found for key: ${key}`);
        return key;
      }
    }

    return translation;
  }

  // Méthode utilitaire pour traduire dynamiquement du contenu
  t(key) {
    return this.getTranslation(key);
  }
}

// Initialiser l'internationalisation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  window.i18n = new I18n();
});