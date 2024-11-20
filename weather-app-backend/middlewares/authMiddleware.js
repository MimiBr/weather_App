const jwt=require('jsonwebtoken');

async function authenticateToken(req,res,next) {
    const token=req.headers['authorization']?.split(' ')[1];//האיבר השני במערך כי הראשון זה Bearer
    if(!token)
        return res.status(401).send({ message: 'Token required' });
    try{
        const user=jwt.verify(token,process.env.JWT_SECRET);
        req.user=user;
        next()
    }
    catch (err) {
        return res.status(403).send({ message: 'Invalid token' });
    }
}
module.exports = { authenticateToken };