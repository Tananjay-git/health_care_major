require("dotenv").config();
const express = require("express");
const path = require("path");

// const fs = require("fs");
const sgMail = require("@sendgrid/mail");
const app = express();
var mongoose = require("mongoose");
const bodyparser = require("body-parser");
mongoose
  .connect("mongodb://localhost/appointment", { useNewUrlParser: true })
  .then(() => {
    console.log("DATABASE CONNECTED!!");
  });
const port = 3000;

// Mongoose Stuff

const appointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  date: String,
  doctor_type:Array,
  doctor:Array,
  message: String,
});

const appointment = mongoose.model("appointment", appointmentSchema);

//Express Stuff

app.use(express.urlencoded({ extended: true }));

//File stuff

app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views/about_us/about.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views/contact/contact_hospital.html"));
});
app.get("/appointment", (req, res) => {
  res.sendFile(path.join(__dirname, "views/appointment/appointment.html"));
});
app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "views/services/services.html"));
});
app.get("/services/doctor", (req, res) => {
  res.sendFile(path.join(__dirname, "views/services/doctor/doctor.html"));
});

// app.get("/services/doctor/doctorspage", (req, res) => {
//   res.sendFile(path.join(__dirname, "views/services/doctor/doctorspage/doc.html"));
// });

app.get("/services/ambulance", (req, res) => {
  res.sendFile(
    path.join(__dirname, "views/services/ambulance/ambulance2.html")
  );
});
app.get("/services/medicine", (req, res) => {
  res.sendFile(path.join(__dirname, "views/services/medicine/medicine.html"));
});
app.get("*", (req, res) => {
  res.send("Page Not Found!");
});

app.post("/appointment", async (req, res) => {
  const { email } = req.body;
  const { name } = req.body;
  const { date } = req.body;
  const { doctor_type } = req.body;
  const { doctor } = req.body;
  var mydata = new appointment(req.body);
  mydata
    .save()
    .then(async () => {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      //var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      const msg = {
        to: email,
        from: process.env.EMAIL, // Use the email address or domain you verified above
        subject: "Confirmation of Appointment For Health Care",
        // text: "You Appointment Has Been Scheduled at " + Date.now ,
        html: `Hi, <b>${name}</b><br><br>
              Your Appointment Has Been Scheduled On <b>${date}</b>.Please try to arrive 15 minutes early.<br><br>
              <b>Appointment Details</b> :<br>
              Doctor Type : ${doctor_type}<br>
              Doctor Name : ${doctor}<br><br>

              If you have any questions or you need to reschedule, don’t hesitate to call us at <b>+91-9876543210</b>. We’re here [9:00am - 9:00pm] on [Mon - Fri]. See you soon!<br><br>
              Warm regards,<br>
              <b>HEALTH CARE</b>`,
      };
      //ES6
      await sgMail.send(msg).then(
        () => {},
        (error) => {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      );
      //ES8
      (async () => {
        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      })();
      res.redirect("/");
    })
    .catch(() => {
      res.status(400).send("Item was not save to the database");
    });
});

//Server Stuff
app.listen(port, () => {
  console.log(`App Started on ${port}`);
});
