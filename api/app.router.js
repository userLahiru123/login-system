const { authenticateJWT } = require("../auth/token_validation");
const { googleAuthentication, callBackFromIdp, getToken } = require("./login/login.controller");
const { getUsers } = require("./users/user.controller");

const router = require("express").Router();

router.get("/auth",googleAuthentication);
router.get("/call-back",callBackFromIdp);
router.get("/token",getToken);
router.get("/users",authenticateJWT,getUsers);

module.exports = router;