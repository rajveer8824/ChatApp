import jwt from 'jsonwebtoken';
 
const createTokenAndSaveCookie =(userId, res) => {
    const token=jwt.sign({id: userId},process.env.JWT_TOKEN,{
        expiresIn:"10d"

});
res.cookie("jwt",token,{
    httpOnly:true,
    secure:false,
    sameSite:"strict",
});
}
export default createTokenAndSaveCookie;