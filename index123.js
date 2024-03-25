const exp = require('express');
const e = exp();
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require("./robokey.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

e.get("/", function (req, res) {
  // res.send("hello");
  res.sendFile("C:/practise401/hello.html");
});

e.get("/sig", function (req, res) {
  const a = req.query;
  const email = a.email;
  const password = a.password;

  db.collection('project').add({
    Emailad: email,
    Passwordad: password
  });

  res.send("You Signed in Successfully with " + email +"."+"Then go to login you get the dahboard page ");

});

e.get('/log', function (req, res) {
  const a = req.query;
  const imail = a.email;
  const iassword = a.password;
  let dataPresent = false; // Flag to track data presence

  db.collection('project').get().then((docs) => {
    docs.forEach((doc) => {
      if (imail == doc.data().Emailad && iassword == doc.data().Passwordad) {
        dataPresent = true;
      }
    });

    if (dataPresent) {
      // Redirect to the dashboard page upon successful login
      res.redirect("/dashboard");
    } else {
      res.send("Invalid Login, please SignUp");
    }
  });
});

// Dashboard route
e.get("/dashboard", function (req, res) {
  // Assuming you have a dashboard HTML file named dashboard.html
  res.sendFile("C:/practise401/dashboard.html");
});

e.listen(3000, function () {
  console.log("JaiSreeRam");
});
