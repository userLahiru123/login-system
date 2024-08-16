const { saveUser } = require("./login.service");
const jwt = require("jsonwebtoken");

let codeVerifier = '';

module.exports = {
    googleAuthentication: (req, res) => {
        codeVerifier = crypto.randomBytes(32).toString('hex');
        const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url');
        const url = oauth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: ['https://www.googleapis.com/auth/userinfo.profile'],
          code_challenge: codeChallenge,
          code_challenge_method: 'S256'
        });
        res.redirect(url);
      },

      callBackFromIdp: async (req, res) => {
        const { code } = req.query;
        const { tokens } = await oauth2Client.getToken({
          code,
          code_verifier: codeVerifier,
          redirect_uri: REDIRECT_URI
        });
        oauth2Client.setCredentials(tokens);
      
        const userInfo = await oauth2Client.request({ url: 'https://www.googleapis.com/oauth2/v1/userinfo' });
        const user = userInfo.data;
      
        // Save user details in PostgreSQL
        saveUser;
      
        res.redirect(`/token?access_token=${tokens.access_token}`);
      },

      getToken: (req, res) => {
        const { access_token } = req.query;
        const payload = { access_token };
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ token });
      }
};