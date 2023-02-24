const dashboardView = (req,res)=>{
    console.log(req.user)
    items = [
        {
            id:1,
            name:'paras',
            mobile:9067176935
        },
        {
            id: 2,
            name: 'rakesh',
            mobile: 9067176932
        },
        {
            id: 3,
            name: 'manish',
            mobile: 9067176933
        }
    ]
    res.render('index',{
        user:req.user,
        items:items
    })
}

module.exports = {
    dashboardView
}