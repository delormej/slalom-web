import React from 'react';
import FacebookLoginWithButton from 'react-facebook-login';

const responseFacebook = (response) => {
  console.log(response);
}

const componentClicked = () => {
  console.log( "Clicked!" )
}

export default function App() {
  return (
    <FacebookLoginWithButton
      appId="414107292826370"
      autoLoad
      fields="name,email,picture"
      onClick={componentClicked}
      callback={responseFacebook}
      icon="fa-facebook"
      version="5.0"
      reAuthenticate={true}
      />
    )
}