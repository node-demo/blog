const sqlApi={
  'all':'SELECT log_PostTime,log_Title,log_Intro,log_Content FROM zbp_post',
  'admin':{
    'register':{
      'occupied':'SELECT mem_Name AS username FROM zbp_admin WHERE mem_Name=?',
      'success':'INSERT INTO zbp_admin(mem_Name,mem_Password) VALUES( ? , ? )'
    },
    'login':{
      'success':'SELECT mem_ID AS id,mem_Name AS username,mem_Password AS password FROM zbp_admin WHERE mem_Name=?'
    }
  }
};

module.exports = sqlApi;