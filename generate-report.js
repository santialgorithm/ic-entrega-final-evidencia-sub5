const fs = require("fs");
const path = require("path");

console.log("Generando reporte web simplificado de integración continua...");

const publicDir = path.join(__dirname, "public");

if (!fs.existsSync(publicDir)) {
	fs.mkdirSync(publicDir, { recursive: true });
}

// Variables de entorno o valores locales por defecto
const commitSha = process.env.GITHUB_SHA || "dev-local-commit-sha-12345";
const truncatedSha = commitSha.substring(0, 7);
const repo = process.env.GITHUB_REPOSITORY || "usuario/project-ci-cd";
const branch = process.env.GITHUB_REF_NAME || "main";
const runNumber = process.env.GITHUB_RUN_NUMBER || "42";
const actor = process.env.GITHUB_ACTOR || "desarrollador-local";
const dateStr = new Date().toLocaleString("es-ES", {
	timeZone: "America/Bogota",
	dateStyle: "full",
	timeStyle: "medium",
});

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CI/CD Simple Status - ${repo}</title>
</head>
<body style="font-family: sans-serif; max-width: 600px; margin: 2rem auto; padding: 0 1rem;">

  <h1>CI/CD Dashboard</h1>
  <p><strong>Estado:</strong> ✓ Pipeline Exitoso</p>
  <hr>

  <h2>Pruebas del Proyecto</h2>
  <ul>
    <li><strong>Test unitario:</strong> ✓ Aprobado</li>
  </ul>

  <hr>

  <h2>Detalles del Despliegue</h2>
  <ul>
    <li><strong>Repositorio:</strong> ${repo}</li>
    <li><strong>Rama:</strong> <code>${branch}</code></li>
    <li><strong>Commit SHA:</strong> <code>${truncatedSha}</code></li>
    <li><strong>Autor:</strong> ${actor}</li>
    <li><strong>Ejecución Nº:</strong> ${runNumber}</li>
  </ul>

  <hr>

  <footer>
    <p><small>Generado automáticamente el ${dateStr} | <a href="https://github.com/${repo}" target="_blank">Repositorio GitHub</a></small></p>
  </footer>

</body>
</html>
`;

fs.writeFileSync(path.join(publicDir, "index.html"), htmlContent, "utf-8");
console.log("✓ Archivo public/index.html generado exitosamente.");
