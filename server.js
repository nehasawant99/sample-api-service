const express = require("express");
const { validateAuthHeader } = require("@nehasawant99/core-auth-utils");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date() });
});

app.get("/protected", (req, res) => {
  const result = validateAuthHeader(req.headers.authorization);
  if (!result.valid) {
    return res.status(401).json({ error: result.reason });
  }
  res.json({ message: "Access granted", token: result.token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Service listening on port ${PORT}`));