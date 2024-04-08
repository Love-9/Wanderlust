const User=require('../models/user.js');


module.exports.renderSignUpForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup=async(req,res)=>{
    try{
    let{username,email,password}=req.body;
    const newUser=new User({email,username});
    const registerdUser=await User.register(newUser,password);
    console.log(registerdUser);
    
    req.login(registerdUser,(err)=>{
        if(err){
            return next(err);
        }
        else{
            req.flash("success","Welcome To wanderlust");
    res.redirect(req.session.redirectUrl);
        }
    });
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back To Wanderlust");
    let redirectUrl=res.locals.redirectUrl ||"/listings";
    res.redirect(redirectUrl);
}

module.exports.logOut=(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        else{
            req.flash("success","You are logged out!");
            res.redirect("/listings");
        }
    })
}