const User = require('../Models/user');
const crypto = require('crypto');

// AES-256-CBC requires 32-byte key and 16-byte IV
const ENCRYPTION_KEY = 'wdnewohwekcndkjncdkjncdjkncjk123';
const ALGORITHM = 'aes-256-cbc';

// Derive a 32-byte key from ENCRYPTION_KEY
const KEY_BUF = crypto.createHash('sha256').update(ENCRYPTION_KEY, 'utf8').digest(); // 32 bytes

// Helper: Encrypt colid to create institute code (iv:hex + ':' + ciphertext hex)
function encryptColid(colid) {
  const iv = crypto.randomBytes(16); // 16 bytes for CBC
  const cipher = crypto.createCipheriv(ALGORITHM, KEY_BUF, iv);
  const input = Buffer.from(String(colid), 'utf8');
  const enc1 = cipher.update(input);
  const enc2 = cipher.final();
  const ciphertext = Buffer.concat([enc1, enc2]).toString('hex');
  return iv.toString('hex') + ':' + ciphertext;
}

// Generate Institute Code Controller
exports.generateinstitutecode = async (req, res) => {
  try {
    const { colid } = req.body;

    if (typeof colid !== 'number' || !Number.isFinite(colid)) {
      return res.status(400).json({ success: false, message: 'Valid colid is required' });
    }

    const instituteCode = encryptColid(colid);

    return res.json({
      success: true,
      message: 'Institute code generated successfully',
      data: { colid, instituteCode }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate institute code',
      error: error.message
    });
  }
};





// Login function
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const { colid, name, email: userEmail, regno, role, user: username } = user;

        return res.status(200).json({ 
            colid, 
            name, 
            email: userEmail, 
            regno, 
            role,
            user: username
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Login error',
            error: error.message 
        });
    }
};