
// Système de validation pour le générateur de CV
class CVValidator {
    static validateBasics(basics) {
        const errors = [];
        
        if (!basics.name || basics.name.trim().length < 2) {
            errors.push('Le nom doit contenir au moins 2 caractères');
        }
        
        if (!basics.email || !this.isValidEmail(basics.email)) {
            errors.push('L\'adresse email n\'est pas valide');
        }
        
        if (basics.phone && !this.isValidPhone(basics.phone)) {
            errors.push('Le numéro de téléphone n\'est pas valide');
        }
        
        return errors;
    }
    
    static validateExperience(experience) {
        const errors = [];
        
        experience.forEach((exp, index) => {
            if (!exp.company || exp.company.trim().length < 2) {
                errors.push(`Expérience ${index + 1}: Le nom de l'entreprise est requis`);
            }
            
            if (!exp.position || exp.position.trim().length < 2) {
                errors.push(`Expérience ${index + 1}: Le poste est requis`);
            }
            
            if (!exp.date || exp.date.trim().length < 4) {
                errors.push(`Expérience ${index + 1}: La période est requise`);
            }
        });
        
        return errors;
    }
    
    static validateSkills(skills) {
        const errors = [];
        
        if (skills.length === 0) {
            errors.push('Au moins une compétence est requise');
        }
        
        skills.forEach((skill, index) => {
            if (!skill || skill.trim().length < 2) {
                errors.push(`Compétence ${index + 1}: Nom de compétence invalide`);
            }
        });
        
        return errors;
    }
    
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    static isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    static validateComplete(formData) {
        const allErrors = [
            ...this.validateBasics(formData.basics || {}),
            ...this.validateExperience(formData.experience || []),
            ...this.validateSkills(formData.skills || [])
        ];
        
        return {
            isValid: allErrors.length === 0,
            errors: allErrors
        };
    }
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CVValidator;
}
