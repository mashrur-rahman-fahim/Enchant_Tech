export const log=(req,res,next)=>{
        console.log(`url: ${req.url} ${req.method} ${new Date()}`);
        next();
}