import React, { useEffect } from 'react'
import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'


const Auth = () => {

  useEffect(() => {
    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],
    };

    const ui = firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    ui.start(".firebaseui-auth-container", uiConfig)

  }, [])

  return (
    <>
      <h2>Sign in</h2>
      <div className={'firebaseui-auth-container'}></div>
    </>
  )
}

export default Auth