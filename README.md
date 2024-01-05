# Neon Memory Game

## React + TypeScript + Vite

## Description

The Neon Memory Game project is a classic card-matching game designed to test and improve your memory skills. It challenges players to find matching pairs of cards within a set of face-down cards.

Disclaimer: I'm including the .env file in the repo since it is private in order to make the initial setup easier but feel free to change it.

## Project Structure

### Source structure `src`

-   `_presentation/`: UI components and screens for the presentation layer.
-   `assest/`: Static assets like images, icons, and fonts.
-   `entities/`: Data entities and models for application logic w/ Validations.
-   `hooks/`: Custom React hooks for reusable logic.
-   `navigation/`: Navigation logic and routing configurations.
-   `store/`: Presisted data
-   `useCases/`: Application use cases and business logic.
-   `utils/`: Utility functions for common tasks.

### 2. Presentation `_presentation`

-   `_components/`: Reusable React components for modularity (global app use intended).
-   `[PageName]`: This contains the page screen and a folder ./components to store related reuseble UI.

### 3. Configuration Files

-   `.gitignore`: List of files/directories to be ignored by Git.
-   `package.json`: Project information, dependencies, and scripts.

### 4. Documentation

-   `README.md`: Project documentation.
-   `docs/`: Other documents or manuals.

## Getting Started

1. Clone the repository: `git clone https://github.com/GoncaloFazenda/Memory-Game`
2. Install dependencies: `yarn install`
3. Run the application: `yarn start`

This Project has Prittier and some ESLint rules enabled.

#### Author: Gonçalo Fazenda
