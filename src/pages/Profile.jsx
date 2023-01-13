import styled from "styled-components";
import Menu from "../components/Menu";
import { auth } from "../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from 'react';
import { logout, upload } from "../components/firebase";

const ProfilePage = () => {
    const [user, loading, error] = useAuthState(auth);
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (!user) window.location.href = '/login';
        ;
    }, [user, loading]);

    function handleChange(e) {
        if (e && e.target && e.target.files && e.target.files[0]) {
          setPhoto(e.target.files[0]);
          upload(photo, user);
        }
      }

    useEffect(() => {
        if (user?.photoURL) {
            setPhotoURL(user?.photoURL);
        }
    }, [user])
    

    return (
      <Profile>
        <div className="flex justify-center container" id="background">
          <div className="flex justify-center" id="header">
            <h1>Profile</h1>
          </div>
          <div className="flex justify-center container">
            {/* <div style={{ display: 'flex', margin: '20px', alignItems: 'center' }}>
                        <img
                            src={photoURL}
                            className="rounded-lg"
                            alt={`${user?.displayName}'s profile picture`}
                        />

                        <label htmlFor="fileInput">
                            <p style={{ paddingLeft: '15px' }}>Change profile picture</p>
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div> */}{" "}
            
            {/* <h2>username</h2>
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleText0"
              placeholder={user.displayName}
              defaultValue={user?.displayName}
            />{" "} */}
            <h2>email</h2>
            <input
              type="email"
              className="form-control block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleEmail0"
              placeholder={user.email}
              defaultValue={user?.email}
            />
            <h2>Password</h2>
            <input
              type="password"
              className="form-control block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="examplePassword0"
              placeholder="Password"
              defaultValue="*********"
            />
            {/* <div id="change">
                        <h3>Change Mesuring Prefrences</h3>
                    </div>
                    <div className="flex flex-wrap justify-center space-x-2">
                        <span className="mesuring px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                            Grams
                        </span>
                        <span className="mesuring px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                            Cups
                        </span>
                        <span className="mesuring px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                            ML
                        </span>
                        <span className="mesuring px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                            Oz
                        </span>
                    </div> */}
            {/* <button id='save' className="hover focus:outline-none">Save
                    </button> */}
            <button
              onClick={logout}
              id="signOut"
              className="bg-transparent hover focus:outline-none"
            >
              Sign out
            </button>
          </div>
        </div>
        <Menu></Menu>
      </Profile>
    );
};

const Profile = styled.div`
  * {
    color: black;
  }

  label {
    font-family: "Rockwell";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    text-decoration-line: underline;
    color: #a5a5a5;
  }

  #backArrow {
    width: 50px;
    height: 50px;
    position: fixed;
    left: 10px;
    top: 10px;
  }

  h1 {
    font-family: "Rockwell";
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 38px;
    text-align: center;
    color: #222222;
    margin-top: 50px;
  }

  .container {
    background: #fffef9;
    margin: auto;
    display: flex;
    width: inherit;
    flex-direction: column;
    align-items: center;
  }

  #app {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #background {
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    border-radius: 45px 45px 0 0;
    left: 20px;
    background: #ffe58a;
    margin-top: 20px;
  }

  input {
    margin: 10px;
    background: #eae9e9;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    width: 304px;
    height: 45px;
    left: 40px;
    top: 313px;
  }

  .mesuring {
    background: rgba(255, 229, 138, 0.44);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
  }

  .mesuring:hover {
    background: #ffe58a;
  }

  .mesuring:active {
    background: #ffe58a;
  }

  h3 {
    font-family: "Rockwell";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    margin: 20px;
    color: #222222;
  }

  #save {
    background: #ffe58a;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    border-radius: 35px;
    padding: 10px;
    width: 120px;
    margin-top: 30px;
    font-family: "Rockwell";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #222222;
  }

  #signOut {
    font-family: "Rockwell";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */
    text-align: center;
    text-decoration-line: underline;
    margin-top: 15px;
    color: #a5a5a5;
  }

  .rounded-lg {
    width: 69px;
    height: 69px;
  }

  p {
    font-family: "Rockwell";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    text-decoration-line: underline;
    cursor: pointer;
    color: #a5a5a5;
  }

  #header {
    padding: 20px;
  }

  #change {
    margin-right: 6%;
  }
`;

export default ProfilePage;