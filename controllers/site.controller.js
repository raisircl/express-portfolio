const nodemailer = require('nodemailer');
const path = require('path');
// const { pool } = require('../db');
const {MongoClient} = require('mongodb');
const crypto = require('crypto');

const ejs = require('ejs');

const uri = process.env.URI;
const client = new MongoClient(uri);
function renderPage(res, viewName, title) {  
   
  return res.render(`pages/${viewName}`, { title, page: viewName });
}

exports.home = (req, res) => renderPage(res, 'index', 'Home');
exports.about = (req, res) => renderPage(res, 'about', 'About');
exports.blog = (req, res) => renderPage(res, 'blog', 'Blog');
exports.blogDetails = (req, res) => renderPage(res, 'blog-details', 'Blog Details');
exports.contact = (req, res) => renderPage(res, 'contact', 'Contact');
exports.projects = (req, res) => renderPage(res, 'projects', 'Projects');
exports.projectDetails = (req, res) => renderPage(res, 'project-details', 'Project Details');

exports.submitContact = async (req, res, next) => {
  try {
    var time = new Date();
    const date_time = time.toLocaleString(); 

   const {FirstName,LastName,email,Password,phone  } = req.body;
   
    const ticketid = "TIC"+'-'+Date.now()+'-'+crypto.randomBytes(2).toString('hex').toUpperCase();

    const data ={FirstName:FirstName,LastName:LastName,email:email,password:Password,phone:phone,addon:date_time,tckid:ticketid}


        await client.connect();
        await client.db('portfolio').command({ping:1});
        console.log(" success full connected");
        
        const mydb = client.db('portfolio');
        const mycollection = mydb.collection('user');
        const result =mycollection.insertOne(data);
        console.log(` succes full ${(await result).insertedId}`);
        console.log(result);

    // Send email
    const transporter = nodemailer.createTransport(
      process.env.SMTP_SERVICE
        ? { service: process.env.SMTP_SERVICE, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } }
        : { host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true',
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } }
    );

     const dir = path.join(__dirname,"../views/pages/email-template.ejs");
     const render =await ejs.renderFile(dir,{title:"thanks"});

    const send_mail = {
      from: process.env.SMTP_USER,
      to: email,
      subject:'Thanks for reaching out!,'+'-'+subject,  
      text : "hello",  
      html: render
     }

    await transporter.sendMail(send_mail)
    return res.render('pages/thank',{title:'thank you'})
  } catch (err) {
    return next(err);
  }};