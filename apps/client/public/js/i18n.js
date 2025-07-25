
// Système d'internationalisation pour le générateur de CV
class I18nSystem {
    constructor() {
        this.currentLanguage = 'fr';
        this.translations = {};
        this.callbacks = [];
        this.loadTranslations();
    }

    async loadTranslations() {
        try {
            const response = await fetch('./i18n/translations.json');
            const data = await response.json();
            this.translations = data;
            console.log('Translations loaded:', this.translations);
            this.notifyCallbacks();
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback translations
            this.translations = {
                fr: {
                    generator: {
                        title: "Générateur de CV Professionnel",
                        subtitle: "Créez votre CV parfait en quelques minutes",
                        builderTitle: "Créateur de CV Intelligent",
                        builderSubtitle: "Suivez les étapes pour créer votre CV parfait",
                        tabs: {
                            basics: "Informations de base",
                            experience: "Expérience",
                            education: "Formation",
                            skills: "Compétences",
                            generate: "Générer"
                        },
                        sections: {
                            personal: "Informations personnelles",
                            experience: "Expérience professionnelle",
                            education: "Formation",
                            skills: "Compétences",
                            ai: "Assistant IA",
                            customization: "Personnalisation avancée",
                            template: "Choisissez votre template"
                        },
                        fields: {
                            firstName: "Prénom",
                            lastName: "Nom",
                            email: "Email",
                            phone: "Téléphone",
                            location: "Ville",
                            website: "Site web",
                            summary: "Résumé professionnel"
                        },
                        buttons: {
                            addExperience: "Ajouter une expérience",
                            addEducation: "Ajouter une formation",
                            addSkill: "Ajouter une compétence",
                            generate: "Générer mon CV",
                            view: "Voir le CV",
                            download: "Télécharger PDF",
                            edit: "Modifier"
                        },
                        messages: {
                            generating: "Génération de votre CV en cours...",
                            success: "CV généré avec succès!"
                        },
                        templates: {
                            modern: "Moderne et élégant",
                            classic: "Classique et professionnel",
                            creative: "Créatif et coloré"
                        }
                    },
                    preview: {
                        title: "Aperçu en temps réel"
                    }
                },
                en: {
                    generator: {
                        title: "Professional CV Generator",
                        subtitle: "Create your perfect CV in minutes",
                        builderTitle: "Intelligent CV Builder",
                        builderSubtitle: "Follow the steps to create your perfect CV",
                        tabs: {
                            basics: "Basic Information",
                            experience: "Experience",
                            education: "Education",
                            skills: "Skills",
                            generate: "Generate"
                        },
                        sections: {
                            personal: "Personal Information",
                            experience: "Professional Experience",
                            education: "Education",
                            skills: "Skills",
                            ai: "AI Assistant",
                            customization: "Advanced Customization",
                            template: "Choose your template"
                        },
                        fields: {
                            firstName: "First Name",
                            lastName: "Last Name",
                            email: "Email",
                            phone: "Phone",
                            location: "City",
                            website: "Website",
                            summary: "Professional Summary"
                        },
                        buttons: {
                            addExperience: "Add Experience",
                            addEducation: "Add Education",
                            addSkill: "Add Skill",
                            generate: "Generate my CV",
                            view: "View CV",
                            download: "Download PDF",
                            edit: "Edit"
                        },
                        messages: {
                            generating: "Generating your CV...",
                            success: "CV generated successfully!"
                        },
                        templates: {
                            modern: "Modern and elegant",
                            classic: "Classic and professional",
                            creative: "Creative and colorful"
                        }
                    },
                    preview: {
                        title: "Real-time Preview"
                    }
                }
            };
            this.notifyCallbacks();
        }
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        this.translatePage();
        localStorage.setItem('language', lang);
    }

    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation not found for key: ${key}`);
                return key;
            }
        }
        
        return value || key;
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else if (element.hasAttribute('placeholder')) {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
    }

    onInitialized(callback) {
        if (this.translations && Object.keys(this.translations).length > 0) {
            callback();
        } else {
            this.callbacks.push(callback);
        }
    }

    notifyCallbacks() {
        this.callbacks.forEach(callback => callback());
        this.callbacks = [];
    }
}

// Initialize i18n system
window.i18n = new I18nSystem();

// Auto-translate when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load saved language
    const savedLang = localStorage.getItem('language') || 'fr';
    window.i18n.setLanguage(savedLang);
    
    // Set language selector
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = savedLang;
    }
});
