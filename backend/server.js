const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const MongoStore = require("connect-mongo");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Session Middleware
app.use(
  session({
    secret: "random_string", // You can generate one dynamically if needed
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// User Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["student", "mentor"], required: true },
  expertise: [String]
});

const User = mongoose.model("User", userSchema);

// Modify Idea Schema
const ideaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  domain: { type: String, required: true },
  subDomain: { type: String, required: true },
  tags: [{ type: String }],
  description: { type: String, required: true },
  uid: { type: String, required: true },
  pdf: { type: String }, // Store PDF file path or URL
  status: { type: String, default: "pending" },
  email: { type: String, required: true },
});


  const Idea = mongoose.model("Idea", ideaSchema);

// Handle File Upload (if using Multer)
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Files stored in "uploads" folder

// Middleware to Check Authentication
const requireLogin = (req, res, next) => {
  if (!req.session.user) return res.status(401).json({ message: "Not logged in" });
  next();
};

// User Registration
app.post("/register", async (req, res) => {
  const { name, email, password, role, expertise } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = new User({ name, email, password: hashedPassword, role, expertise });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json({ message: "Invalid password" });

  req.session.user = { _id: user._id, role: user.role };
  res.json({ message: "Login successful" });
});

// User Logout
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out successfully" });
});

// Add Idea (Student Only)
app.post("/idea", requireLogin, async (req, res) => {
  if (req.session.user.role !== "student") return res.status(403).json({ message: "Only students can add ideas" });

  const { title, description } = req.body;
  const newIdea = new Idea({ studentId: req.session.user._id, title, description });
  await newIdea.save();
  res.json({ message: "Idea submitted successfully" });
});

app.post("/ideas", upload.single("pdf"), async (req, res) => {
    try {
      const { title, domain, subDomain, tags, description, uid, email } = req.body;
      const pdfPath = req.file ? req.file.path : null;
  
      const newIdea = new Idea({
        title,
        domain,
        subDomain,
        tags: tags.split(",").map((tag) => tag.trim()), // Convert CSV string to array
        description,
        uid,
        pdf: pdfPath,
        email,
      });
  
      await newIdea.save();
      res.json({ message: "Idea submitted successfully", idea: newIdea });
    } catch (error) {
      res.status(500).json({ error: "Error submitting idea" });
    }
  });

// Delete Idea (Only Owner)
app.delete("/idea/:id", requireLogin, async (req, res) => {
  const idea = await Idea.findById(req.params.id);
  if (!idea || idea.studentId.toString() !== req.session.user._id)
    return res.status(403).json({ message: "Unauthorized or idea not found" });

  await Idea.findByIdAndDelete(req.params.id);
  res.json({ message: "Idea deleted successfully" });
});

// Mentor List
app.get("/mentors", async (req, res) => {
  const mentors = await User.find({ role: "mentor" }, "name expertise");
  res.json(mentors);
});


// Pitch Idea to Mentor
app.post("/pitch", requireLogin, async (req, res) => {
  if (req.session.user.role !== "student") return res.status(403).json({ message: "Only students can pitch ideas" });

  const { ideaId, mentorId } = req.body;
  const newPitch = new Pitch({ ideaId, mentorId });
  await newPitch.save();
  res.json({ message: "Idea pitched to mentor" });
});


// Accept/Reject Pitch (Mentor Only)
app.put("/pitch/:id", requireLogin, async (req, res) => {
  if (req.session.user.role !== "mentor") return res.status(403).json({ message: "Only mentors can modify pitches" });

  const { status, feedback } = req.body;
  await Pitch.findByIdAndUpdate(req.params.id, { status, feedback });
  res.json({ message: "Pitch status updated" });
});

// Start Server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
