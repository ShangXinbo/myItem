
'use strict';

exports.showtpl = function(req, res){
    res.render('index',{title:"shang",message:'点我上传'});
};
exports.submit = function(){
    console.log(req.body);
    console.log(req.file);
    /*fs.open(req.file.originalname,'w','0644',function(e,fd){
      if(e) throw e;
      fs.read(req.file.path,function(err,data){
          if(err){
              console.log(err);
          }else{ 
              console.log(data.length);
          }
          fs.write(fd,data,function(e){
              if(e) throw e;
              fs.closeSync(fd);
          });
      })
      
    });*/
    res.end();
};
