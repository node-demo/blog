const sqlMap={
  'index':{
    'total':'SELECT count(log_ID) As count FROM zbp_post',
    'json':'SELECT log_ID AS id,log_PostTime As time,log_Title AS title,log_Intro As info FROM zbp_post WHERE log_ID!=2 LIMIT ?,?'
  },
  'list':{
    'total':'SELECT count(log_ID) As count FROM zbp_post WHERE log_CateID=?',
    'json':'SELECT log_ID AS id,log_Title AS title,log_Intro As info FROM zbp_post WHERE log_ID!=2 AND log_CateID=?  LIMIT ?,?'

  },
  'article':{
    'total':'',
    'json':'SELECT log_ID AS id,log_Title As title,log_Content As content FROM zbp_post WHERE log_ID=?'
  },
  'sidebar':'SELECT cate_ID As id,cate_Name As name,cate_Count As count FROM zbp_category',
  'user':{
    'register':{
      'occupied':'SELECT mem_Name AS username FROM zbp_member WHERE mem_Name=?',
      'success':'INSERT INTO zbp_member(mem_Name,mem_Password) VALUES( ? , ? )'
    },
    'login':{
      'success':'SELECT mem_ID AS id, mem_Name AS username, mem_Password AS password FROM zbp_member WHERE mem_Name = ?'
    }
  }
};

module.exports = sqlMap;