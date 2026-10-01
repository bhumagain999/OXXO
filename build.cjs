const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, 'dashboard.html'), 'utf8');
const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="referrer" content="no-referrer">
<title>OXXO USA Leadership Dashboard Concept — Bijaya Humagain</title>
<style>
html,body{margin:0}
body{padding:16px;background:#f3f5f7;color-scheme:light}
@media(prefers-color-scheme:dark){body{background:#141a20;color-scheme:dark}}
@media(max-width:480px){body{padding:0}}
</style>
</head>
<body>
${source}
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), page);
