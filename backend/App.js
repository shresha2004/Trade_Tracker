require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const Portfolio = require("./Models/Portfolio.js");
const UserDetail = require("./Models/UserAuth.js"); 
const JournalSchema = require('./Models/TradingJournal.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const ejsMate = require('ejs-mate');
const app = express();
const session=require('express-session')
const cookieParser=require('cookie-parser')
const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy;
const MongoStore=require('connect-mongo');
const dburl=process.env.DB_URL
const secret=process.env.SECRET




const store=new MongoStore({
  mongoUrl: dburl,
  touchAfter: 24 * 60 * 60,
  crypto: {
      secret,
  }
})

const sessionConfig={
  store,
  name:'session',
  secret,
  resave:false,
  saveUninitialized:true,
  cookie:{
      httpOnly:true,
      expires:Date.now() + 1000*60*60*24*7,
      maxAge:1000*60*60*24*7
  }
}

const corsOptions = {
  origin: "https://trade-tracker-r4xv.vercel.app",
  credentials: true,
  optionSuccessStatus: 200
};



app.use(session(sessionConfig))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy( { usernameField: 'email', passwordField: 'password' },UserDetail.authenticate()))
passport.serializeUser(UserDetail.serializeUser())
passport.deserializeUser(UserDetail.deserializeUser())

async function main() {
  await mongoose.connect(dburl);
}


main().catch(err => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});


app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));




app.post('/login', (req, res, next) => {
  
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      console.error("Error during authentication:", err);
      return res.status(500).send("Server error");
    }
    if (!user) {
      return res.status(400).send(info.message || 'Invalid email or password');
    }

    req.login(user, async (err) => {
      if (err) {
        return res.status(500).send('Login failed');
      }

      try {
        
        req.session.save((err) => {
          if (err) {
           console.error(err)
          }
        });
       
        
        const portfolios = await Portfolio.find({ user: user._id });
        const journals = await JournalSchema.find({ user: user._id });

        return res.status(200).send(
        'Login successful'
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).send("Error fetching user data");
      }
    },
   
  );
  })(req, res, next);  
});


 





app.post('/TradeEntryForm', async (req, res) => {
  
  try {
    const { date, type, instrument, tradeType, entryPrice, exitPrice, quantity, strategy, notes, beforeScreenshotUrl, afterScreenshotUrl,email } = req.body;
    if (!date || !type || !instrument || !tradeType || !entryPrice || !exitPrice || !quantity || !strategy ) {
      return res.status(400).send("Missing required fields");
    }
  
    if(!email){
      console.error("req.user.Email not found")
      return res.status(401).send("Unauthorized")
    }
    
    const user =await UserDetail.findOne({Email:email})

    if(!user){
      console.error("User not found")
      return res.status(404).json({error:"User not found"})
    }

    const newJournal = new JournalSchema({
      user:user._id,
      date,
      type,
      instrument,
      tradeType,
      entryPrice,
      exitPrice,
      quantity,
      strategy,
      notes,
      beforeScreenshotUrl,
      afterScreenshotUrl
    });
    
    await newJournal.save();
    res.status(201).send("Data received and saved successfully");
  } catch (err) {
    console.error("Error saving journal entry:", err);
    res.status(500).send("Error saving data");
  }
});



app.get('/TradeEntryForm', async (req, res) => {
  const email =  req.headers.email;
  

  try {
      if (!email) {
          console.error("Email not found in headers");
          return res.status(401).send("Unauthorized");
      }

      const user = await UserDetail.findOne({ Email: email });
      console.log(user)
      if (!user) {
          console.error("User not found");
          return res.status(404).json({ error: "User not found" });
      }

      const journalEntries = await JournalSchema.find({ user: user._id });
      res.json(journalEntries);
  } catch (err) {
      console.error("Server error:", err);
      res.status(500).send('Server error');
  }
});



app.delete('/TradeEntryForm/:id', async(req,res)=>{
  try{
  const id=req.params.id
 
  await JournalSchema.findOneAndDelete({_id:id})
  res.status(200).json({message:"Trade deleted succesfully"})
  }
  catch(err){
    res.status(500).json({message:"Error in deleting"})
  }
})


app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser=new UserDetail({Email:email})
    await UserDetail.register(newUser,password)
   
 
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).send("Error registering user");
  }
});

app.get('/', (req, res) => {
  res.render('index');
});

app.post("/", async (req, res) => {
  try {
    if(!req.body.email){
      console.error("Req.user.email not found")
      return res.status(401).send("Unauthorized")
    }
    const user =await UserDetail.findOne({Email:req.body.email})
    if(!user){
      console.error("User not found")
      return res.status(404).json({error:"User not found"})
    }
    
    const p = new Portfolio({
      user:user._id,
      Symbol: req.body.symbol,
      EntryPrice: req.body.entryPrice,
      Target: req.body.target,
      Quantity: req.body.quantity,
      StopLoss: req.body.stopLoss
    });
    await p.save();
    res.status(200).send("Data received");
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("Error saving data");
  }
});

app.get("/stocks", async (req, res) => {
  const email=req.headers.email;
  console.log("From get stock:",email)

  try {
    if(!email){
      res.status(401).send("Unauthorized")
    }
    const user= await UserDetail.findOne({Email:email})
    if(!user){
      res.status(404).send("User not found")
    }
    const stocks = await Portfolio.find({user: user._id});
    const stocksInvestment = stocks.map(stock => ({
      symbol: stock.Symbol,
      entryPrice: stock.EntryPrice,
      stoploss: stock.StopLoss,
      target: stock.Target,
      quantity: stock.Quantity,
      investment: stock.EntryPrice * stock.Quantity,
      id:stock._id
    }));
    res.json(stocksInvestment);
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message });
  }
});




app.delete('/stocks/:id',async(req,res)=>{
  try{
    const tradeId=req.params.id
    await Portfolio.findOneAndDelete({_id:tradeId})
    res.status(200).json({message:'Stock deleted successfully'})
  }catch(err){
    res.status(500).json({message:'Error in deleting'})
  }
})

app.get('/favicon.ico', (req, res) => res.status(204));






app.listen(4501, () => {
  console.log("Serving on port 4500");
});
