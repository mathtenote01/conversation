router.get('/login', (req, res, next) => {
  var data = {
     title:'Users/Login',
     content:'名前とパスワードを入力下さい。'
  }
  res.render('users/login', data);
});

router.post('/login', (req, res, next) => {
  db.User.findOne({
    where:{
      name:req.body.name,
      pass:req.body.pass,
    }
  }).then(usr=>{
    if (usr != null) {
      req.session.login = usr;
      let back = req.session.back;
      if (back == null){
        back = '/';
      }
      res.redirect(back);
    } else {
      var data = {
        title:'Users/Login',
        content:'名前かパスワードに問題があります。再度入力下さい。'
      }
      res.render('users/login', data);
    }
  })
});
