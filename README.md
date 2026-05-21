# Química de Altura — Landing Page

Sitio web institucional desarrollado para el proyecto universitario **Química de Altura**, una iniciativa escolar enfocada en la divulgación y comercialización de productos químicos de uso cotidiano. La landing page presenta el proyecto, sus productos y el equipo detrás de él.

---

## 🚀 Tech Stack

![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat-square&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white)

---

## ✨ Características

- Diseño responsivo adaptado a móvil, tablet y escritorio
- Arquitectura basada en componentes con Angular
- Estilos personalizados con SCSS
- Optimización de imágenes incluida (`optimize_images.ps1`)
- Contenerización con Docker y servido mediante Nginx

---

## 📦 Instalación y uso local

### Prerrequisitos

- [Node.js](https://nodejs.org/) v18 o superior
- [Angular CLI](https://angular.dev/tools/cli) v20+
- [Docker](https://www.docker.com/) (opcional, para correr con contenedor)

### Opción 1 — Servidor de desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/Rivangel/QuimicaDeAltura_LandingPage.git
cd QuimicaDeAltura_LandingPage

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve
```

Abrir en el navegador: `http://localhost:4200`

---

### Opción 2 — Docker

```bash
# Construir la imagen
docker build -t quimica-de-altura .

# Correr el contenedor
docker run -p 8080:80 quimica-de-altura
```

Abrir en el navegador: `http://localhost:8080`

---

## 🗂️ Estructura del proyecto

```
QuimicaDeAltura_LandingPage/
├── src/
│   ├── app/          # Componentes y módulos de Angular
│   ├── assets/       # Imágenes y recursos estáticos
│   └── styles/       # Estilos globales SCSS
├── public/           # Archivos públicos estáticos
├── Dockerfile        # Configuración de contenedor
├── nginx.conf        # Configuración del servidor Nginx
└── angular.json      # Configuración del proyecto Angular
```

---

## 🔧 Scripts disponibles

| Comando | Descripción |
|---|---|
| `ng serve` | Inicia el servidor de desarrollo |
| `ng build` | Genera el build de producción en `/dist` |
| `ng test` | Ejecuta las pruebas unitarias |
| `./optimize_images.ps1` | Optimiza las imágenes del proyecto |

---

## 👥 Equipo de desarrollo

Proyecto desarrollado en equipo como parte de un proyecto universitario en la **Universidad Tecnológica del Centro de Veracruz**.

| Nombre | GitHub | Email |
|---|---|---|
| **José Ángel López Rivera** | [![GitHub](https://img.shields.io/badge/Rivangel-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Rivangel) | 20233l001142@utcv.edu.mx |
| **Jose Manuel Lara Villalobos** | [![GitHub](https://img.shields.io/badge/JoseVillalobos21-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/JoseVillalobos21) | 20233l001152@utcv.edu.mx |
| **Christian Barragán Páez** | [![GitHub](https://img.shields.io/badge/Christba03-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Christba03) | 20233l001009@utcv.edu.mx |
| **Angel Geovanny Alvarez Ordinola** | [![GitHub](https://img.shields.io/badge/xSE7EN06-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/xSE7EN06) | 20233l001141@utcv.edu.mx |
