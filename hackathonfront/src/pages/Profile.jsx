import React, { useEffect, useState } from 'react';
import axios from 'axios'; // або інша бібліотека для запитів

const Profile = () => {
  const [user, setUser] = useState(null);

  const API_URL = "http://localhost:3000/api/v1/profiles/1";

    function getAPIData() {

    return axios.get(API_URL, { headers: {
        "content-type": "application/json",
        "authorization": localStorage.getItem("token")
    }}).then((resp) => resp.data);
    }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getAPIData(); 
        console.log(response)
        setUser(response.data); 
      } catch (error) {
        console.error('Помилка при отриманні даних про користувача:', error);
      }
    };
    let mounted = true;
    if(mounted){
        fetchUser();
    }
    return ()=> (mounted = false);
  }, []); 
  return (
    <main>
      <div className="container-md mt-5">
        <div className="row">
          <div className="col-md-6">
            <img src="user_avatar.jpg" alt="User Avatar" className="img-fluid mb-3 rounded-circle" style={{ maxWidth: '100px' }} />
          </div>
          <div className="col-md-6">
            <a href="/edit_profile" className="btn btn-sm btn-primary">Редагувати профіль</a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="user-info">
              <h1>Ім'я Користувача</h1>
              <p>Email: user@example.com</p>
              <p>Дата народження: 01/01/1990</p>
                {user}
            </div>
          </div>
          <div className="col-md-7">
          <p>Про себе: Додаткові дані про користувача...</p>
              {/* Тут можуть бути інші дані профілю */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
