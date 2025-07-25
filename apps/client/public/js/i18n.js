
// Système d'internationalisation pour le générateur de CV
class I18n {
    constructor() {
        this.currentLanguage = 'fr';
        this.translations = {};
        this.initialized = false;
        this.callbacks = [];
        this.init();
    }

    async init() {
        try {
            // Détecter la langue du navigateur ou utiliser celle sauvegardée
            const savedLanguage = localStorage.getItem('language');
            const browserLanguage = navigator.language.split('-')[0];
            
            this.currentLanguage = savedLanguage || (browserLanguage === 'en' ? 'en' : 'fr');
            
            // Charger les traductions
            await this.loadTranslations();
            
            // Marquer comme initialisé
            this.initialized = true;
            
            // Traduire la page immédiatement
            this.translatePage();
            
            // Exécuter les callbacks en attente
            this.callbacks.forEach(callback => callback());
            this.callbacks = [];
            
            // Traduire à nouveau après un délai pour s'assurer que tout est traduit
            setTimeout(() => this.translatePage(), 100);
            
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de i18n:', error);
        }
    }

    async loadTranslations() {
        try {
            const response = await fetch('./i18n/translations.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.translations = await response.json();
            console.log('Translations loaded successfully');
            console.log('Available languages:', Object.keys(this.translations));
            console.log('FR generator keys:', Object.keys(this.translations.fr?.generator || {}));
        } catch (error) {
            console.error('Erreur lors du chargement des traductions:', error);
            // Traductions de fallback identiques au fichier JSON
            this.translations = {
                "fr": {
                    "nav": {
                        "about": "À propos",
                        "experience": "Expérience",
                        "education": "Formation",
                        "skills": "Compétences",
                        "contact": "Contact"
                    },
                    "sections": {
                        "about": {
                            "title": "À propos de moi",
                            "description": "Développeur passionné avec une forte expérience en développement web moderne."
                        },
                        "experience": {
                            "title": "Expérience professionnelle",
                            "position": "Poste",
                            "company": "Entreprise",
                            "location": "Lieu",
                            "duration": "Durée"
                        },
                        "education": {
                            "title": "Formation",
                            "degree": "Diplôme",
                            "institution": "Établissement",
                            "year": "Année"
                        },
                        "skills": {
                            "title": "Compétences",
                            "technical": "Compétences techniques",
                            "languages": "Langues"
                        },
                        "projects": {
                            "title": "Projets",
                            "description": "Description",
                            "technologies": "Technologies utilisées"
                        },
                        "contact": {
                            "title": "Contact",
                            "email": "Email",
                            "phone": "Téléphone",
                            "address": "Adresse",
                            "website": "Site web"
                        }
                    },
                    "common": {
                        "download": "Télécharger PDF",
                        "print": "Imprimer",
                        "language": "Langue",
                        "search": "Search...",
                        "close": "Close",
                        "save": "Save",
                        "cancel": "Cancel",
                        "loading": "Loading..."
                    },
                    "generator": {
                        "title": "Générateur de CV Professionnel",
                        "subtitle": "Créez votre CV parfait en quelques minutes avec notre générateur intelligent",
                        "builderTitle": "Créateur de CV Intelligent",
                        "builderSubtitle": "Suivez les étapes pour créer votre CV parfait",
                        "tabs": {
                            "basics": "Informations de base",
                            "experience": "Expérience",
                            "education": "Formation",
                            "skills": "Compétences",
                            "generate": "Générer"
                        },
                        "sections": {
                            "personal": "Informations personnelles",
                            "experience": "Expérience professionnelle",
                            "education": "Formation",
                            "skills": "Compétences",
                            "ai": "Assistant IA",
                            "customization": "Personnalisation avancée",
                            "template": "Choisissez votre template"
                        },
                        "fields": {
                            "firstName": "Prénom",
                            "lastName": "Nom",
                            "email": "Email",
                            "phone": "Téléphone",
                            "location": "Ville",
                            "website": "Site web",
                            "summary": "Résumé professionnel"
                        },
                        "buttons": {
                            "addExperience": "Ajouter une expérience",
                            "addEducation": "Ajouter une formation",
                            "addSkill": "Ajouter une compétence",
                            "generate": "Générer mon CV",
                            "view": "Voir le CV",
                            "download": "Télécharger",
                            "edit": "Modifier"
                        },
                        "templates": {
                            "modern": "Moderne et épuré",
                            "classic": "Classique et professionnel",
                            "creative": "Créatif et coloré"
                        },
                        "messages": {
                            "generating": "Génération de votre CV en cours...",
                            "success": "CV généré avec succès !"
                        }
                    },
                    "preview": {
                        "title": "Aperçu en temps réel"
                    },
                    "theme": {
                        "toggle": "Changer de thème",
                        "light": "Mode clair",
                        "dark": "Mode sombre"
                    },
                    "templates": {
                        "modern": "Moderne et élégant",
                        "classic": "Classique et professionnel",
                        "creative": "Créatif et coloré"
                    },
                    "messages": {
                        "generating": "Génération de votre CV...",
                        "success": "CV généré avec succès !"
                    }
                },
                "en": {
                    "nav": {
                        "about": "About",
                        "experience": "Experience",
                        "education": "Education",
                        "skills": "Skills",
                        "projects": "Projects",
                        "contact": "Contact"
                    },
                    "sections": {
                        "about": {
                            "title": "About me",
                            "description": "Passionate developer with strong experience in modern web development."
                        },
                        "experience": {
                            "title": "Professional Experience",
                            "position": "Position",
                            "company": "Company",
                            "location": "Location",
                            "duration": "Duration"
                        },
                        "education": {
                            "title": "Education",
                            "degree": "Degree",
                            "institution": "Institution",
                            "year": "Year"
                        },
                        "skills": {
                            "title": "Skills",
                            "technical": "Technical Skills",
                            "languages": "Languages"
                        },
                        "projects": {
                            "title": "Projects",
                            "description": "Description",
                            "technologies": "Technologies used"
                        },
                        "contact": {
                            "title": "Contact",
                            "email": "Email",
                            "phone": "Phone",
                            "address": "Address",
                            "website": "Website"
                        }
                    },
                    "common": {
                        "download": "Download PDF",
                        "print": "Print",
                        "language": "Language",
                        "search": "Search...",
                        "close": "Close",
                        "save": "Save",
                        "cancel": "Cancel",
                        "loading": "Loading..."
                    },
                    "generator": {
                        "title": "Professional CV Generator",
                        "subtitle": "Create your perfect CV in minutes with our intelligent generator",
                        "builderTitle": "Intelligent CV Builder",
                        "builderSubtitle": "Follow steps to create your perfect CV",
                        "tabs": {
                            "basics": "Basic Information",
                            "experience": "Experience",
                            "education": "Education",
                            "skills": "Skills",
                            "generate": "Generate CV"
                        },
                        "sections": {
                            "personal": "Personal Information",
                            "experience": "Professional Experience",
                            "education": "Education",
                            "skills": "Skills",
                            "ai": "AI Assistant",
                            "customization": "Advanced Customization",
                            "template": "Choose your template"
                        },
                        "fields": {
                            "firstName": "First Name",
                            "lastName": "Last Name",
                            "email": "Email",
                            "phone": "Phone",
                            "location": "City",
                            "website": "Website",
                            "summary": "Professional Summary"
                        },
                        "buttons": {
                            "addExperience": "Add Experience",
                            "addEducation": "Add Education",
                            "addSkill": "Add Skill",
                            "generate": "Generate my CV",
                            "view": "View CV",
                            "download": "Download PDF",
                            "edit": "Edit"
                        },
                        "templates": {
                            "modern": "Modern and elegant",
                            "classic": "Classic and professional",
                            "creative": "Creative and colorful"
                        },
                        "messages": {
                            "generating": "Generating your CV...",
                            "success": "CV generated successfully!"
                        }
                    },
                    "preview": {
                        "title": "Real-time Preview",
                        "toggle": "Toggle preview"
                    },
                    "theme": {
                        "toggle": "Toggle theme",
                        "light": "Light Mode",
                        "dark": "Dark Mode"
                    },
                    "templates": {
                        "modern": "Modern and elegant",
                        "classic": "Classic and professional",
                        "creative": "Creative and colorful"
                    },
                    "messages": {
                        "generating": "Generating your CV...",
                        "success": "CV generated successfully!"
                    }
                }
            };
        }
    }

    // Obtenir une traduction par clé
    t(key, defaultValue = '') {
        if (!this.translations || !this.translations[this.currentLanguage]) {
            console.log(`Translation not found for key: ${key}`);
            return defaultValue || key;
        }

        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Fallback vers l'anglais si la clé n'existe pas dans la langue courante
                if (this.currentLanguage !== 'en' && this.translations['en']) {
                    let englishValue = this.translations['en'];
                    const keysAgain = key.split('.');
                    let found = true;
                    
                    for (const kEn of keysAgain) {
                        if (englishValue && typeof englishValue === 'object' && kEn in englishValue) {
                            englishValue = englishValue[kEn];
                        } else {
                            found = false;
                            break;
                        }
                    }
                    
                    if (found && typeof englishValue === 'string') {
                        return englishValue;
                    }
                }
                console.log(`Translation not found for key: ${key}`);
                return defaultValue || key;
            }
        }
        
        if (typeof value === 'string') {
            return value;
        }
        
        console.log(`Translation not found for key: ${key}`);
        return defaultValue || key;
    }

    // Changer la langue
    async setLanguage(lang) {
        if (this.currentLanguage !== lang && this.translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('language', lang);
            this.translatePage();
            
            // Mettre à jour le sélecteur de langue
            const languageSelect = document.getElementById('languageSelect');
            if (languageSelect) {
                languageSelect.value = lang;
            }
        }
    }

    // Traduire tous les éléments de la page
    translatePage() {
        if (!this.initialized) return;

        // Traduire les éléments avec data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation !== key) {
                element.textContent = translation;
            }
        });

        // Traduire les placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.t(key);
            if (translation !== key) {
                element.placeholder = translation;
            }
        });

        // Traduire les attributs title
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.t(key);
            if (translation !== key) {
                element.title = translation;
            }
        });

        // Traduire les attributs aria-label
        const ariaElements = document.querySelectorAll('[data-i18n-aria]');
        ariaElements.forEach(element => {
            const key = element.getAttribute('data-i18n-aria');
            const translation = this.t(key);
            if (translation !== key) {
                element.setAttribute('aria-label', translation);
            }
        });

        // Mettre à jour l'attribut lang du document
        document.documentElement.lang = this.currentLanguage;
    }

    // Attendre que l'i18n soit initialisé
    onInitialized(callback) {
        if (this.initialized) {
            callback();
        } else {
            this.callbacks.push(callback);
        }
    }

    // Obtenir la langue courante
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Vérifier si une langue est supportée
    isLanguageSupported(lang) {
        return this.translations.hasOwnProperty(lang);
    }

    // Obtenir toutes les langues supportées
    getSupportedLanguages() {
        return Object.keys(this.translations);
    }
}

// Créer une instance globale
window.i18n = new I18n();

// Export pour compatibilité
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18n;
}
