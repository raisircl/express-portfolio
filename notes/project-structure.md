portfolio-express/
│  .env
│  package.json
│  app.js
│
├─ public/                 # Static assets served at / (css, js, images)
│  ├─ assets/
│  │  ├─ css/
│  │  ├─ js/
│  │  └─ images/
│  └─ favicon.ico
│
├─ views/                  # EJS templates
│  ├─ pages/
│  │  ├─ index.ejs
│  │  ├─ about.ejs
│  │  ├─ blog.ejs
│  │  ├─ blog-details.ejs
│  │  ├─ contact.ejs
│  │  ├─ projects.ejs
│  │  └─ project-details.ejs
│  └─ partials/
│     ├─ head.ejs
│     ├─ menu.ejs
│     └─ footer.ejs
│
├─ routes/
│  └─ site.routes.js
│
├─ controllers/
│  └─ site.controller.js
│
└─ db/
   ├─ index.js             # pg pool
   └─ migrations.sql       # create table contact_messages
