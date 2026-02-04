# Notes-App

## Set Up:

Download the latest version of Node.js: https://nodejs.org/en/download

### Install Vite (built tool)

`npm create vite@latest notes-app -- --template react-ts`

### Change Directory 

`cd notes-app` 

### Install Tailwind using Vite

`npm install tailwindcss @tailwindcss/vite`

### Configure the Vite Plugin

<li>Import TailwindCSS</li>

`import tailwindcss from '@tailwindcss/vite'`

<li>Include TailwindCSS as a plugin in defineConfig</li>

`tailwindcss()`

### Import TailwindCSS in index.css

`@import "tailwindcss";`

## Run:

`npm run dev`