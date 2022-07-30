import React from 'react';

const Profile = () => {
    return  <div className='content'>
    <div><img  className='wall-picture' src='https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YWxvbmV8ZW58MHx8MHx8&w=1000&q=80'/>
  </div>
  <div><img className='avatar' src='https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=717&q=80'/></div>
  <div className='posts'>
    Posts
  </div>
  </div>
}

export default Profile;