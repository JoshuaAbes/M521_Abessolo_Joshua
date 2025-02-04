/*
### **Module du partie : `Game.js`**

- **Rôle :** Piloter la progression de la partie et gérer l’ensemble des tentatives.
- **Fonctionnalités :**
    - Maintenir l’état global (en cours, terminé, etc.).
    - Organiser et stocker un ensemble de tentatives.
    - Activer et désactiver la tentative courante selon l’avancement du jeu.
    - Déterminer si la partie doit continuer ou s’arrêter (par exemple, après le dernier essai).
    - Diffuser des messages d’information ou d’erreur à l’écran.
- **Interaction avec les autres modules :**
    - Crée plusieurs objets représentant les tentatives (depuis le module des tentatives `Answer.js`).
    - Reçoit des retours des tentatives (propositions, résultats) et gère la suite de la partie en conséquence.
    - Affiche des informations ou avertit en cas d’erreur au travers du DOM (sans s’occuper du détail de la saisie).
*/
"use strict";
import Answer from "./Answer.js";

class Game {}
