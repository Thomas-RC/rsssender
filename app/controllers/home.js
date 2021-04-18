exports.getHome = (req, res, next)=>{
    res.render('home',{title:'RSS Sender App - Homepage', home:'active'});
}