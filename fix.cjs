const fs = require('fs');
const file = 'c:/Users/Krystian/clonme/cloneme-frontend/src/index.css';
let content = fs.readFileSync(file, 'utf-8');
const badText = '/ *   F i x';
const index = content.indexOf(badText);
if (index !== -1) {
  content = content.substring(0, index) + `/* Fix autofill in dark mode */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px var(--bg-primary) inset !important;
  -webkit-text-fill-color: white !important;
}
`;
  fs.writeFileSync(file, content, 'utf-8');
  console.log('Fixed index.css');
} else {
  console.log('Could not find bad text');
}
