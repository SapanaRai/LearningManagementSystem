#LMS Frontend

#Setup instruction 

1.Clone the project
``````
         https://github.com/RaiNigam/lms-frontend-hn
``````

2.Move into the directory
``````
cd lms-frontend-hn
``````

3.Install dependencies
``````
    yarn
``````

4.Run the server
``````
yarn dev
``````


###Setup instructions for tailwind

[Tailwind official instruction doc](https://tailwindcss.com/docs/guides/vite)

1.Install Tailwind 
``````
npx tailwindcss init -p
``````
2.Configure your template paths
``````
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
``````
3.Add the tailwind directive to your CSS
``````
@tailwind base;
@tailwind components;
@tailwind utilities;
``````
4.Run the server
``````
yarn run dev
``````
#Adding Plugins and Dependencies
``````
yarn add @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
``````


#Configure auto import sort  eslint
1.Install simple import sort
``````
npm i -D eslint-plugin-simple-import-sort
``````
2.Add rule in '.eslint.cjs'
``````
'simple-import-sort/imports':'error'
``````
3.Add Simple import sort plugin in `.eslint.cjs`
``````
plugins:[...,'simpe-import-sort']
``````
4.To enable auto import sort on file save in vscode
 -Open `settings.json`
 -Add the following config
``````
"editor.codeActionsOnSave":{
  "source.fixAll.eslint":true
}
``````
5.Add the following details in the plugin property of tailwind config
``````
[require('daisyui'),require('@tailwindcss/line-clamp')]
``````