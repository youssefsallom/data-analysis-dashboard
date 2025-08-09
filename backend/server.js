const express = require("express");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcrypt");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:3000"], // Allow only the frontend to access
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  credentials: true // Allow sending cookies and credentials
}  ));
app.use(express.json()); // Parse JSON request bodies

// Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Add this line

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
  console.error("Error: SUPABASE_URL, SUPABASE_ANON_KEY, or SUPABASE_SERVICE_ROLE_KEY is not defined in .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseServiceRole = createClient(supabaseUrl, supabaseServiceRoleKey); // Add this line
console.log("Supabase client created successfully.");

// Test DB connection route (optional, for testing)
app.get("/test-db", async (req, res) => {
  try {
    const { data, error } = await supabase.from("users").select("*").limit(1);
    if (error) throw error;
    res.status(200).json({ message: "Connected to Supabase successfully!", data });
  } catch (error) {
    console.error("Error connecting to Supabase:", error.message);
    res.status(500).json({ message: "Failed to connect to Supabase.", error: error.message });
  }
});

// Signup Route
app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Check if user already exists
    const { data: existingUsers, error: existingUserError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email);

    if (existingUserError) throw existingUserError;

    if (existingUsers && existingUsers.length > 0) {
      return res.status(409).json({ message: "User with this email already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into Supabase
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([{ email: email, password: hashedPassword }])
      .select(); // Use .select() to return the inserted data

    if (insertError) throw insertError;

    res.status(201).json({ message: "User created successfully!", user: newUser[0] });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "An error occurred during signup." });
  }
});

// Login Route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Check if user exists
    const { data: users, error: selectError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    if (selectError) throw selectError;

    if (!users || users.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Login successful (for now, just send a success message)
    res.status(200).json({ message: "Login successful!", user: { id: user.id, email: user.email } });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "An error occurred during login." });
  }
});

// Save API Key Route
app.post("/api/user/save-api-key", async (req, res) => {
  const { userId, apiKey } = req.body; // Assume userId is sent from frontend after login
  console.log("Received userId from frontend:", userId);

  if (!userId || !apiKey) {
    return res.status(400).json({ message: "User ID and API Key are required." });
  }

  try {
    // Check if API key already exists for this user
    const { data: existingKey, error: selectError } = await supabaseServiceRole // Changed here
      .from("user_api_keys")
      .select("*")
      .eq("user_id", userId);

    if (selectError) throw selectError;

    let result;
    if (existingKey && existingKey.length > 0) {
      // Update existing API key
      const { data, error } = await supabaseServiceRole // Changed here
        .from("user_api_keys")
        .update({ api_key: apiKey, updated_at: new Date().toISOString() })
        .eq("user_id", userId)
        .select();
      if (error) throw error;
      result = data;
    } else {
      // Insert new API key
      const { data, error } = await supabaseServiceRole // Changed here
        .from("user_api_keys")
        .insert([{ user_id: userId, api_key: apiKey }])
        .select();
      if (error) throw error;
      result = data;
    }

    res.status(200).json({ message: "API Key saved successfully!", data: result[0] });
  } catch (error) {
    console.error("Save API Key error:", error.message);
    res.status(500).json({ message: "An error occurred while saving API Key." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
