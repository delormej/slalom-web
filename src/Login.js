import React from 'react';
import FacebookLoginWithButton from 'react-facebook-login';

const componentClicked = () => {
  console.log( "Clicked!" )
}

export default function Login(props) {
  return (
    <FacebookLoginWithButton
      appId="414107292826370"
      autoLoad
      fields="name,email,picture"
      onClick={componentClicked}
      callback={props.OnAuthenticate}
      icon="fa-facebook"
      version="5.0"
      reAuthenticate={true}
      />
    )
}