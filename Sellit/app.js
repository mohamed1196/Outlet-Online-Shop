//requiers express to use it
var express = require("express"),
 app = express(),
 bodyParser = require("body-parser");
 let Cloudant = require("@cloudant/cloudant");
 let cloudantStore = require("connect-cloudant");
 var bodyParser = require("body-parser");
 const passport = require("passport");
 const passportlocal = require("passport-local");



app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
  secret:'mego',
  saveUninitialized: true,
  resave: true
}));
app.use(function(req,res,next){
  res.locals.currentUser = sess;
  res.locals.cart = cartitem || [];
  res.locals.search = searchitam;
  next();
});



//db connection
let db;
cloudant();
async function cloudant(){
  try {
    console.log("creating connection");

    const cloudant = Cloudant({
      url:"https://da59841e-c776-4005-9683-80f64830c32a-bluemix:baa30b313e1c4615d415fefaf37123afdcd2ae3b73a8eb6c4f00163b725154c5@da59841e-c776-4005-9683-80f64830c32a-bluemix.cloudantnosqldb.appdomain.cloud",
        plugins:{
          iamAuth:{
            iamApiKey:"vMQXX6GdRIicch8xvTEfduLP9BcFWUqrqCq39PxQMRh2"
          }
        }
    })
console.log("created connection");



console.log("getting the database");
let allDBS = await cloudant.db.list();
console.log('cloudant DBS'+ " "+allDBS);

db = cloudant.db.use("sell_it");

  } catch (err) {
    console.error('Error'+err);
  }
}

app.get("/",(req,res)=>{

  res.render("Home");
})
app.get("/Home",(req,res)=>{
  res.render("Home");
})
//browse categories
app.get("/men",(req,res)=>{

                  db.list({include_docs:true}, function (err, data) {
                res.render("men",{rows:data.rows});
                });
})
app.get("/women",(req,res)=>{

                  db.list({include_docs:true}, function (err, data) {
                res.render("women",{rows:data.rows});
                });
})
app.get("/kids",(req,res)=>{

                  db.list({include_docs:true}, function (err, data) {
                res.render("kids",{rows:data.rows});
                });
})
//sell items
app.get("/sell",(req,res)=>{
  res.render("SellItem");
})

app.post("/sell",(req,res)=>{
name = req.body.Name;
price = req.body.price;
category = req.body.category;
type= req.body.type;
image = req.body.image;
return new Promise((resolve, reject) => {
    let whenCreated = Date.now();
    let item = {
        name: name,
        type: type,
        price:price ,
        SellerId:sess.email,
        BuyerId:sess.email,
        category: category,
        image:image,
        whenCreated: whenCreated
    };
    db.insert(item, (err, result) => {
        if (err) {
            logger.error('Error occurred: ' + err.message, 'insertItem()');
            reject(err);
        } else {
            resolve({ data: { createdId: result.id, createdRevId: result.rev }, statusCode: 201 });
            res.redirect("/Home");
        }
    });
});
})
//about
app.get("/about",(req,res)=>{
  res.render("about");
})
//profile page
app.get("/profile",(req,res)=>{
  res.render("profile");
})

// cart
app.get("/cart",(req,res)=>{
  db.list({include_docs:true}, function (err, data) {
    rows = data.rows;
  res.render("cart", {rows:rows})
  })


})

var cartitem;
app.post("/cart",(req,res)=>{
 cartitem= req.session
 cartitem.itemid = req.body.id
 res.redirect("/cart");
})
// sign in

app.get("/signin",(req,res)=>{
  res.render("signin");
})
var sess;
app.post("/signin",(req,res)=>{
  sess = req.session;
  email = req.body.email;
  password = req.body.password;
  db.list({include_docs:true}, function (err, data) {
    rows = data.rows;
    rows.forEach((row) => {
      if (row.doc.email == email && row.doc.password == password) {
        res.redirect("/Home");
        sess.email = row.doc.email;
        sess.username = row.doc.name;
        sess.phone = row.doc.phone;
      }
    });
  });
});



//logout user
app.get("/logout",(req,res)=>{
  sess = null;
  req.logout();
  res.redirect("/");
});
//register user
app.get("/signup",(req,res)=>{
  res.render("signup");
})

app.post("/signup",(req,res)=>{
name = req.body.name;
phone = req.body.phone;
email = req.body.email;
password = req.body.password;
return new Promise((resolve, reject) => {
    let whenCreated = Date.now();
    let user = {
        name: name,
        phone: phone,
        email:email,
        password: password,
        whenCreated: whenCreated
    };
    db.insert(user, (err, result) => {
        if (err) {
            logger.error('Error occurred: ' + err.message, 'insertItem()');
            reject(err);
        } else {
            resolve({ data: { createdId: result.id, createdRevId: result.rev }, statusCode: 201 });
            res.redirect("/Home");
        }
    });
});
})

app.get("/search",(req,res)=>{
  db.list({include_docs:true}, function (err, data) {
    rows = data.rows;
  res.render("search", {rows:rows})
  })
})

var searchitam;
app.post("/search",(req,res)=>{
  searchitam= req.session
  searchitam.name = req.body.search
  res.redirect("/search");
})
app.post("/delete",(req,res)=>{
  cartitem=null;
  res.redirect("/Home")
})
app.listen(3000,function(){
	console.log("Sell IT server has started");
});
