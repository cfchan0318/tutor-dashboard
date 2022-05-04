import * as React from 'react';

export default function AuthService(){
    
    function setToken() {
        fetch('./api/login', { method: 'POST', })
          .then(response => { return response.json() })
          .then(data => {
            localStorage.setItem('token', "Bearer " + data.token)
          })
          .catch()
      }
}