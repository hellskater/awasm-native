# AWASM Native

Run your native apps seamlessly on your browser without any hiccups.

# Run Locally

- Move into the root directory and run `npm install`, `npm run prepare`, `npm run dev`

# Live demo

- Here is the live demo of the project hosted on Vercel. [https://awasm-native.vercel.app/](https://awasm-native.vercel.app/)

# Preview

<img width="1512" alt="image" src="https://user-images.githubusercontent.com/47584722/196999530-9626c8ed-f8c7-4f56-8dbd-9e0fae3e62fa.png">
<img width="1512" alt="image" src="https://user-images.githubusercontent.com/47584722/197186544-9382dc9c-d601-40a2-aa18-4eb673ce4a76.png">
<img width="1512" alt="image" src="https://user-images.githubusercontent.com/47584722/197000009-8bc02645-add0-4a1b-90f3-26cd2013e502.png">
<img width="1512" alt="image" src="https://user-images.githubusercontent.com/47584722/197000060-d46c256c-f28b-4a4c-86af-66c8b3b28a19.png">
<img width="1512" alt="image" src="https://user-images.githubusercontent.com/47584722/197186761-dbe462e2-3b22-4a11-9805-daea21475eae.png">
<img width="1512" alt="image" src="https://user-images.githubusercontent.com/47584722/197000518-b82c7338-0d34-4e97-91f1-1f1ba93d4b96.png">
<img width="1512" alt="image" src="https://user-images.githubusercontent.com/47584722/197000580-97cadf7a-711a-45c4-9785-a61456f04a0d.png">
<img width="1512" alt="image" src="https://user-images.githubusercontent.com/47584722/197000644-031875fb-8f25-40e3-98ae-c607ca2fe4fb.png">

# Tech-Stack

## Frontend

- React, Next.js
- Typescript
- TailwindCSS
- React Query
- Mantine UI
- React icons
- Tremor UI

## Backend and database

- Next.js
- Firebase
- Next Auth

## Additional libraries

- @ffmpeg/ffmpeg
- Monaco editor
- Pyodide
- hash-wasm

# Features and pages

## Dashboard

This page is server side rendered since we are not showing any real data at the moment and just using some static data fetched from firebase database just to test the UI components. This page contains various charts to display user interaction with the platform.

## Video editor

This page has 4 types of video editing tools

1. Video to GIF
2. Video format converter
3. Video to MP3
4. Video trimmer

We are using FFMPEG wasm to execute these functions. [https://ffmpeg.org/](https://ffmpeg.org/)

## Code Editor

This is an online python compiler which uses Pyodide to run python code on the browser. [https://pyodide.org/en/stable/](https://pyodide.org/en/stable/)

We use Monaco Editor for the code editor.

## Hash Generator

This is a tool which generates hash of a given text in real time using different types of hashing algorithms. We use hash-wasm for this. [https://www.npmjs.com/package/hash-wasm](https://www.npmjs.com/package/hash-wasm)

# Scripts

- `npm run dev`: To start the development server on localhost
- `npm run build`: To create a production build
