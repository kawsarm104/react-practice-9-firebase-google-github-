// import logo from './logo.svg';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signOut
} from "firebase/auth";
import { useState } from "react";
import "./App.css";
import initializeAuthentication from "./firebase/firebase.initialize";

initializeAuthentication();
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState({});

  const handleGoggleSignin = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user
        const loggedInUser = {
          name: displayName,
          email: email,
          image: photoURL
        }
        setUser(loggedInUser)
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      const loginUser = result.user;
      console.log(loginUser);
      // ...
      })
      .catch(error => {
      console.log(error.message);
    })
  };
  const handlGithubSignin = () => {
    const auth = getAuth();
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        console.log(user);
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          image: photoURL,
        };
        setUser(loggedInUser);
        // ...
      })
      .catch((error) => {
        console.log(error.message);
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  }
  const handleSignout = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
      setUser({})
      })
      .catch(error => {
      console.log(error.message);
    })

  }
  return (
    <div className="App">
      <h1>React Firebase Simple Auth</h1>
      {!user.name ? <div>
        <button onClick={handleGoggleSignin}> Signin with google</button>
        <button onClick={handlGithubSignin}> Signin with github</button>
        <br />
      </div>:
      <button onClick={handleSignout}>Signout</button>}
      <br />
      {user.name && (
        <div>
          <h2>Welcome {user.name}</h2>
          <h3>{user.email}</h3>
          <img src={user.image} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
