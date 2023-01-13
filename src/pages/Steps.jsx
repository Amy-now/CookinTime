import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { auth } from "../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Menu from "../components/Menu";

function Steps() {
    let params = useParams();
    const [step, setStep] = useState(parseInt(params.step, 10));
    const [details, setDetails] = useState();
    const [user, loading, error] = useAuthState(auth);


    useEffect(() => {
        const fetchDetails = async () => {
            const data = await fetch(
                `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
            );
            const detailData = await data.json();
            setDetails(detailData);
        };
        fetchDetails();
    }, [params.name]);

    useEffect(() => {
      if (loading) {
          // maybe trigger a loading screen
          return;
      }
      if (!user) window.location.href = '/login';
      ;
  }, [user, loading]);



    if (details) {
        let percentage = ((params.step / details.analyzedInstructions[0].steps.length) * 100) + '%'
        return (

            <Profile>
                <button className="bg-transparent hover focus:outline-none" onClick={recipePage}><FaRegArrowAltCircleLeft></FaRegArrowAltCircleLeft>
                </button>
                <div id="main">
                    <h3>{params.step} of {details.analyzedInstructions[0].steps.length}</h3>
                    <div className="bg-gray-200 h-5 mb-6" style={{ borderRadius: '35px', margin: '0 5% 0 5%' }}>
                        <div className="h-5" style={{ borderRadius: '35px', backgroundColor: '#FFE58A', width: percentage }}></div>
                    </div>
                    <div className="flex justify-center container" id='background'>
                        <img
                            src="../../chef.png"
                            className="rounded-lg"
                        />
                        <div className="flex justify-center" id='header'>
                        </div>
                        <div className="flex justify-center container">
                            <h1>{params.step}.</h1>
                            <p>{details.analyzedInstructions[0].steps[params.step-1].step}</p>
                            {params.step < details.analyzedInstructions[0].steps.length && (
                                <button id='next' className="hover focus:outline-none" onClick={nextPage}>Next Step</button>
                            )}
                            {params.step == details.analyzedInstructions[0].steps.length && (
                                <button id='next' className="hover focus:outline-none" onClick={recipePage}>Completed</button>
                            )}
                            {params.step > 1 && (
                                <button id='back' className="bg-transparent hover focus:outline-none" onClick={prevPage}>Go Back
                                </button>
                            )}

                        </div>

                    </div>
                </div>
                <Menu></Menu>
            </Profile>

        )
    } else {
        return "Loading...";
    }
    function nextPage(event) {
        event.preventDefault();
        window.history.replaceState({}, '', `/steps/${params.name}/${step + 1}`);
        setStep(step + 1);
        window.location.reload();
    }
    function prevPage(event) {
        event.preventDefault();
        window.history.replaceState({}, '', `/steps/${params.name}/${step - 1}`);
        setStep(step - 1);
        window.location.reload();
    }
    function recipePage(event) {
        event.preventDefault();
        window.history.replaceState({}, '', `/recipe/${params.name}`);
        window.location.reload();
    }
}

const Profile = styled.div`
* {
    color: black;
}

#main {
    margin-top: 65px;
}

h1 {
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 38px;
    color: #222222;
    margin-top: 30px;
    margin-right: auto;
    padding-left: 50px;
}

.container {
    background: #FFFEF9;
    margin: auto;
    border-radius: 45px 45px 0 0;
    display: flex;
    width: inherit;
    flex-direction: column;
    align-items: center;
}

h3 {
    text-align: center;
    margin: 0;
    top: 60px;
}

#app {
    display: flex;
    align-items: center;
    justify-content: center;
}

#background {
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    left: 20px;
    background: #FFE58A;
    border-radius: 45px; 
    margin-top: 20px;
}


#next {
    background: #FFE58A;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    border-radius: 35px;
    padding: 10px;
    width: 120px;
    margin-top: 30px;
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #222222;
}

#back {
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    text-decoration-line: underline;
    margin-top: 15px;
    color: #A5A5A5;
}
p {
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: #222222;
    width: 50%;
    padding-top: 20px;
}
svg {
    width: 50px;
    height: 50px;
    position: absolute;
    left: 10px;
    top: 10px;
}
`;

export default Steps;
