export const globalTemplateHtml =
`<!DOCTYPE html>
<html>
<head>
  <title>PDF Template</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Montserrat', Arial, sans-serif; margin: 0; padding: 0; color: #5E5E5E; }
    .content { margin-inline: 60px; }
    h1 { margin-top: 0px; }
    .page-break { page-break-before: always; }
    @page {
      margin: 130px 0;
    }
    @media print {
      .content {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="content">
    <div>{{{content}}}</div>
  </div>
</body>
</html>`
