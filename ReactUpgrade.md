### Upgrade Errors and Resolutions

```
npm outdated
npm update
npx npm-check-updates -u
npm install --legacy-peer-deps
```

#### upgrade render method for React v18

- In client/src/index.js
- REMOVE: import ReactDOM from 'react-dom'
- ADD: import { createRoot } from 'react-dom/client
- const root = createRoot(document.getElementById('root'))
- root.render(Your application component(s))

#### Attempted import error: 'Map' is not exported from 'react-leaflet' (imported as 'LeafletMap').

- Changes Map import to MapContainer

#### TypeError: Cannot read property 'get' of undefined during rendering of asset asset/inline|data:application/x-font-ttf;charset=utf-8;;base64,AAEAAAAOAIAAAwBgT1Mv...

- There is an extra semicolon at line 19990 of semantic.css
- Bug has been fixed in Semantic-UI-CSS but new package has not been published
- Ran into issue only on this project because we are using the package and not CDN
- Pointed package in package.json directly to semantic-ui-css's .git file: "git+https://github.com/Semantic-Org/Semantic-UI-CSS.git"


