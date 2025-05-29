#  Frontend – Gestion des Tâches avec l'IA

##  Présentation

Ce frontend est l’interface utilisateur de l'application **Gestion des Tâches avec l’IA**. Développée avec **React TypeScript**, elle permet à chaque utilisateur :

- De se connecter et gérer plusieurs projets
- De générer automatiquement des listes de tâches avec l’**API OpenAI**
- D’organiser ces tâches dans une **interface Kanban fluide**, avec glisser-déposer

L’interface est moderne, rapide (grâce à **Vite**) et responsive.

---

##  Technologies utilisées

| Fonction                | Librairies / Technologies            |
|------------------------|--------------------------------------|
| Frontend               | React + TypeScript                   |
| Bundler                | Vite                                 |
| Requêtes API           | Axios                                |
| Drag & Drop            | React Beautiful DnD                  |
| Authentification       | JWT (stocké dans le localStorage)    |
| CSS                    | TailwindCSS (ou CSS modules)         |
| Environnement          | Variables via `.env`                 |

---

##  Configuration & Lancement

### Prérequis

- Node.js (v16+)
- npm (ou yarn, ou pnpm)

### Installation

```bash
git clone https://github.com/najlae-echbab/gestion-des-taches-avec-IA-front-end.git
cd gestion-des-taches-avec-IA-front-end
npm install
