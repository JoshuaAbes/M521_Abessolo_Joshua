class Answer {
    constructor(rowIndex) {
        this.rowIndex = rowIndex;
        this.form = this.creerFormulaire();
        this.configurerEcouteurs();
    }

    creerFormulaire() {
        const form = document.createElement('form');
        form.classList.add('row');
        form.id = `row-${this.rowIndex}`;

        // Création des 5 champs de saisie
        for (let i = 0; i < 5; i++) {
            const input = document.createElement('input');
            input.classList.add('letter');
            input.type = 'text';
            input.name = `letter-${i}`;
            input.id = `row-${this.rowIndex}--${i}`;
            input.maxLength = 1;
            
            form.appendChild(input);
        }

        // Champ de soumission caché
        const submitInput = document.createElement('input');
        submitInput.type = 'submit';
        submitInput.hidden = true;
        form.appendChild(submitInput);

        return form;
    }

    configurerEcouteurs() {
        const inputs = this.form.querySelectorAll('input.letter');
        
        inputs.forEach((input, index) => {
            // Navigation automatique entre les champs
            input.addEventListener('input', (e) => {
                if (e.target.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });

            // Retour arrière pour revenir au champ précédent
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
                    inputs[index - 1].focus();
                }
            });
        });

        // Gestion de la soumission du formulaire
        this.form.addEventListener('submit', this.traiterSoumission.bind(this));
    }

    async traiterSoumission(e) {
        e.preventDefault();
        const inputs = this.form.querySelectorAll('input.letter');
        const proposition = Array.from(inputs).map(input => input.value.toUpperCase()).join('');

        if (proposition.length !== 5) {
            this.afficherMessage('Veuillez saisir un mot de 5 lettres');
            return;
        }

        try {
            const reponse = await fetch('https://progweb-wwwordle-api.onrender.com/guess', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ guess: proposition })
            });

            const resultat = await reponse.json();
            this.traiterResultat(resultat, inputs);
        } catch (erreur) {
            this.afficherMessage('Erreur lors de la soumission');
        }
    }

    traiterResultat(resultat, inputs) {
        inputs.forEach((input, index) => {
            if (resultat.evaluation[index] === 'CORRECT') {
                input.classList.add('correct');
            } else if (resultat.evaluation[index] === 'PRESENT') {
                input.classList.add('present');
            } else {
                input.classList.add('absent');
            }
        });

        if (resultat.win) {
            this.afficherMessage('Félicitations ! Vous avez gagné !');
            this.form.setAttribute('inert', '');
        }
    }

    afficherMessage(message) {
        const elementMessage = document.querySelector('.message');
        elementMessage.textContent = message;
    }

    afficher() {
        const zoneJeu = document.querySelector('main.board');
        zoneJeu.appendChild(this.form);
        return this;
    }
}

export default Answer;