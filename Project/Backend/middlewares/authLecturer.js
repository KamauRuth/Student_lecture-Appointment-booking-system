const jwt = require("jsonwebtoken");
const authenticateLecturer = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, 'DEKUT_SLABS'); // Replace 'your_jwt_secret' with your secret key
        const lecturer = await Lecturer.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!lecturer) {
            throw new Error();
        }

        req.token = token;
        req.lecturer = lecturer;
        req.lecturerId = lecturer._id;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = authenticateLecturer;