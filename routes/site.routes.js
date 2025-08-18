const express = require('express');
const router = express.Router();
const controller = require('../controllers/site.controller');

// Pages
router.get('/', controller.home);
router.get('/about', controller.about);
router.get('/blog', controller.blog);
router.get('/blog-details', controller.blogDetails);
router.get('/contact', controller.contact);
router.get('/projects', controller.projects);
router.get('/project-details', controller.projectDetails);

// Contact form
router.post('/submit-contact', controller.submitContact);

module.exports = router;
