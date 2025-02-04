/*
### **Module des tentatives : `Answer.js`**

- **Rôle :** Gérer la saisie d’une proposition par l’utilisateur pour un essai précis (une ligne du jeu).
- **Fonctionnalités :**
    - Générer et insérer un formulaire de saisie (un ensemble de champs pour la proposition).
    - Permettre la navigation intuitive dans les champs (déplacement automatique du focus).
    - Vérifier la validité de la saisie (longueur, caractères autorisés).
    - Envoyer la proposition au serveur et traiter la réponse (colorisation, affichage du résultat).
    - Alterner entre un état actif et inactif, selon la progression du jeu.
- **Interaction avec les autres modules :**
    - Est créé et géré par le module du jeu (chaque partie possède un certain nombre de tentatives). Game.js
    - Informe le jeu des résultats après validation (pour savoir si l’essai est correct ou non). Game.js
    - Peut déclencher un message d’erreur ou de victoire, mais l’affichage final est géré par le jeu. Game.js
*/

"use strict";

/*
### **Mettre en place l’interface de saisie**

Générez un formulaire contenant 5 champs `<input>` (un par lettre). Réglez la longueur maximale de chaque champ à 
un caractère pour forcer l’utilisateur à ne saisir qu’une lettre. 
Le formulaire devrait prendre la forme html suivante (pour la première tentative) →

```html
<form class="row" id="row-0">
	<input class="letter" type="text" name="letter-0" id="row-0--0" maxlength="1">
	<input class="letter" type="text" name="letter-1" id="row-0--1" maxlength="1">
	<input class="letter" type="text" name="letter-2" id="row-0--2" maxlength="1">
	<input class="letter" type="text" name="letter-3" id="row-0--3" maxlength="1">
	<input class="letter" type="text" name="letter-4" id="row-0--4" maxlength="1">
	<input type="submit" hidden>
</form>
```
N’oubliez pas d’intégrer un <input> de type submit, ou vous ne pourrez pas soumettre le formulaire.

Ajoutez le formulaire au DOM dans le conteneur prévu à cet effet, soit l’élément hardcodé <main class="board"></main>
*/
class Answer {}

class row {
  constructor({
    title,
    type,
    name,
    id,
    maxlenght,

  }) {
    this.title = title;
    this.type = type;
    this.name = name;
    this.id = id;
    this.maxlenght = 1;
    this.present = false; // Défini à false par défaut
    this.element = this.createUserElement();
  }
  createElementAnswerelement(){
    const AnswerDiv = document.createElement("input");

    AnswerDiv.insertAdjacentHTML(
        "beforeend",
        `

        `
    )
  }
  render() {
    // Création du conteneur du champ
    const fieldContainer = document.createElement("div");
    fieldContainer.classList.add("field-container");

    //ajout de l'élément inert
    const inert = "false";

    // Création du label
    const labelElement = document.createElement("label");
    labelElement.textContent = this.label;
    labelElement.setAttribute("for", this.name);

    return fieldContainer;
  }
}

class Form {
  #fields = [];
  #formElement;

  constructor(title) {
    this.title = title;
    this.#formElement = document.createElement("form");
  }

  addField(field) {
    if (!(field instanceof Field)) {
      throw new Error("Le champ doit être une instance de Field");
    }
    this.#fields.push(field);
  }

  render() {
    // Ajout des champs au formulaire
    this.#fields.forEach((field) => {
      this.#formElement.append(field.render());
    });

    // Création du bouton Submit
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Submit";
    this.#formElement.append(submitButton);

    // Ajout du formulaire au DOM
    document.body.append(this.#formElement);

    // Ajout du gestionnaire d'événement sur le formulaire
    this.#formElement.addEventListener("submit", this.#submit.bind(this));
  }

  #submit(e) {
    e.preventDefault();

    // Récupération des valeurs des champs sous forme d'objet
    const formData = this.#fields.reduce((data, field) => {
      data[field.name] = field.value;
      return data;
    }, {});
  }
}
