import jwt from 'jsonwebtoken';
const JWT_SECRET = 'mhmkisgood$';

const fetchUser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        console.log(data);
        req.user = data.User;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}

export default fetchUser;