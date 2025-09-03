const nodemailer = require('nodemailer');
const { pool } = require('../db');
const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = `mongodb+srv://codetestst:${process.env.PWD}@cluster-st-codetest.u9esacd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-ST-CodeTest`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
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
          const { name, email, subject, message } = req.body;
          var currentdate = new Date(); 
          var datetime = "Last Sync: " + currentdate.getDate() + "/"
                          + (currentdate.getMonth()+1)  + "/" 
                          + currentdate.getFullYear() + " @ "  
                          + currentdate.getHours() + ":"  
                          + currentdate.getMinutes() + ":" 
                          + currentdate.getSeconds();
          const data={name:name,email:email,subject:subject, message:message,addon:datetime}
            // Connect the client to the server	(optional starting in v4.7)
            client.connect();
            // Send a ping to confirm a successful connection
            client.db("portfolioDB").command({ ping: 1 });

            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            const myDB = client.db("portfolioDB");
            const myColl = myDB.collection("contactUsData");
            const result = myColl.insertOne(data);
            console.log(
            `A document was inserted with the _id: ${result.insertedId}`,
            );
    // Basic validation (can add express-validator later)
    // if (!name || !email || !message) {
    //   return res.status(400).json({ ok: false, error: 'Name, email, and message are required.' });
    // }

    // // Save to Postgres
    // const insertSql = `
    //   INSERT INTO contact_messages (name, email, subject, message)
    //   VALUES ($1, $2, $3, $4)
    //   RETURNING id, created_at
    // `;
    // const result = await pool.query(insertSql, [name, email, subject || null, message]);

    // Send email
    const transporter = nodemailer.createTransport(
      process.env.SMTP_SERVICE
        ? { service: process.env.SMTP_SERVICE, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } }
        : { host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true',
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } }
    );

    const send_mail = {
      from: process.env.SMTP_USER,
      to: email,
      subject: subject || 'Thanks for reaching out!',
      html: `<p>Hi ${name},</p><p>Thanks for contacting us. Our team will get back to you soon.</p><p>— Portfolio Team</p>`
    }

    await transporter.sendMail(send_mail)
    return res.render('pages/thanks',{title:'thank you'})
    // return res.json({ ok: true, msg:'mail sent successfuly.'});
    //return res.json({ ok: true, id: result.rows[0].id, created_at: result.rows[0].created_at });
  } catch (err) {
    return next(err);
  }};