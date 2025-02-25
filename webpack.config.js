const fs = require('fs');
const path = require('path');

// Read the content of the headers.js file and trim it to remove any leading/trailing whitespace
const header = fs.readFileSync(path.resolve(__dirname, 'src', 'headers.js'), 'utf8').trim();

// Read the content of the main script file (index.js) and trim
const script = fs.readFileSync(path.resolve(__dirname, 'src', 'index.js'), 'utf8').trim();

// Read the content of the icons.js file and trim
const icons = fs.readFileSync(path.resolve(__dirname, 'src', 'icons.js'), 'utf8').trim();

// Combine the content (icons, header, script) and wrap it inside the Tampermonkey function
const combinedContent = `${header}
(function() {
${icons}
${script}
})();
`;

// Write the combined content to a new file
fs.writeFileSync(path.resolve(__dirname, 'dist', 'KG_Chat_Empowerment.js'), combinedContent, 'utf8');
