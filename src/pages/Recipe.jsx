import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { FaRegArrowAltCircleLeft, FaRegHeart, FaRegClock, FaUsers } from "react-icons/fa";
import Menu from "../components/Menu";
import { auth } from "../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { favorite } from "../components/firebase";

function Recipe() {
  let params = useParams();
  const [user, loading, error] = useAuthState(auth);
  const [details, setDetails] = useState();
  const [activeTab, setActiveTab] = useState("instructions");
  const [servings, setServings] = useState();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const detailData = await data.json();
      setDetails(detailData);
      setServings(detailData.servings);
      setIngredients(detailData.extendedIngredients);
      console.log(detailData);
    };
    fetchDetails();
  }, [params.name]);

  const updatedIngredients = ingredients.map(ingredient => {
    return {
      ...ingredient,
      amount: (ingredient.amount * servings) / details.servings
    };
  });

  const handleChange = event => {
    const value = event.target.value;
    // only allow positive integers with no more than 2 digits
    if (/^\d{1,2}$/.test(value)) {
      setServings(value);
    }
  }

  const handleFav = event => {
    favorite(user, params.name)
  }

useEffect(() => {
  if (loading) {
      // maybe trigger a loading screen
      return;
  }
  if (!user) window.location.href = '/login';
  ;
}, [user, loading]);


  return (
    <DetailWrapper>
      <button className="bg-transparent hover focus:outline-none" onClick={homePage}><FaRegArrowAltCircleLeft id="left"></FaRegArrowAltCircleLeft>
      </button>
      <button className="bg-transparent hover focus:outline-none" onClick={handleFav}><FaRegHeart id="right"></FaRegHeart>
      </button>
      <div className="imageWrapper">
        <h2>{details?.title}</h2>
        <h4>By {details?.sourceName}</h4>
        <div className="flex flex-wrap justify-center space-x-2">
          <span
            className="info px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-none active:bg-gray-300 transition duration-300 ease">
            <FaRegClock></FaRegClock>
            {details?.readyInMinutes} Mins
            <button className="bg-transparent hover focus:outline-none">
            </button>
          </span>
          <span
            className="info capitalize px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-none active:bg-gray-300 transition duration-300 ease">
            <img src="../hat.png" alt="" />
            {details?.diets[0]}
            <button className="bg-transparent hover focus:outline-none">
            </button>
          </span>
        </div>
        <img id="pic" src={details?.image} alt="" />
      </div>

      <div className="flex space-x-2 justify-center">
        <button id="startCooking" type="button" onClick={startCooking}>Start Cooking</button>
      </div>
      <div className="container">
        <FaUsers></FaUsers>
        <h4>Servings</h4>
        <button className="servings" type="button" onClick={() => setServings(Math.max(parseInt(servings, 10) - 1, 1))}>-</button>
        <input
          type="text"
          className="servings focus:outline-none"
          id="servings"
          value={servings}
          onChange={handleChange}
        />
        <button className="servings" type="button" onClick={() => setServings(parseInt(servings, 10) + 1)}>+</button>
      </div>

      <div id="extraContainer">
        <div id="toggle">
          <button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Summary
          </button>
          <button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </button>
        </div>
        <div id="output">
          {activeTab === "instructions" && (
            <div>
              <p dangerouslySetInnerHTML={{ __html: details?.summary }}></p>
              <p dangerouslySetInnerHTML={{ __html: details?.instructions }}></p>
            </div>
          )}
          {activeTab === "ingredients" && (
                  <table>
                    <tbody>
                      {updatedIngredients.map((ingredient) => {
                        return (
                          <tr key={ingredient.id}>
                            <td>{ingredient.nameClean}</td>
                            <td>{ingredient.amount} {ingredient.unit}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
        </div>
      </div>
      <Menu></Menu>
    </DetailWrapper>
  );
  function homePage(event) {
    event.preventDefault();
    window.history.replaceState({}, '', `/`);
    window.location.reload();
  }
  function startCooking(event) {
    event.preventDefault();
    window.history.replaceState({}, '', `/steps/${params.name}/1`);
    window.location.reload();
  }
}

const DetailWrapper = styled.div`
color: black;
display: grid;
text-align: -webkit-center;
margin-top: 60px;

p {
    line-height: 1.25rem;
}

h2 {
  font-family: 'Rockwell';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  color: #222222;
}

h4 {
  font-family: 'Rockwell';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  
  color: #000000;
  align-self: center;
  display: grid;
}

#left {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 10px;
  top: 10px;
}
#right {
  width: 50px;
  height: 50px;
  position: absolute;
  right: 10px;
  top: 10px;
}
.info {
  background: #FFE58A;
  border-radius: 11px;
  align-items: center;
  color: black;
  margin: 15px;
}

#picture {
  border-radius: 22px;
}

#startCooking {
  background: #FFE58A;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 11px;
  padding: 10px;
  margin: 20px;
  font-family: 'Rockwell';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #000000;
}
.container {
  width: 330px;
  height: 51px;
  justify-self: center;
  background: #EAE9E9;
  border-radius: 11px;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}
svg {
  align-self: center;
  display: grid;
}
.servings {
  background: #FFFEF9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  height: fit-content;
  margin: 5px;
  width: 20px;
  display: grid;
  align-self: center;
  text-align: center;
}
#pic {
  border-radius: 22px;
}
#servings {
  height: -webkit-fill-available;
  width: 30px;
  font-family: 'Rockwell';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
}

#extraContainer {
  background: rgba(234, 233, 233, 0.5);
  border-radius: 11px;
  padding: 20px;
  max-width: 50%;
  width: fit-content;
  justify-self: center;
  border-radius: 11px;
  margin-bottom: 50px;
  display: inline-table;
}

#output {
  margin-top: 50px;
}
table {
  border-collapse: separate;
  border-spacing: 0;
}
td, th {
  border-top: 3px solid rgba(133, 133, 133, 0.5);
  text-align: left;
  padding: 8px;
  text-transform: capitalize;
}
tr:first-child td:nth-child(1), tr:first-child td:nth-child(2) {
  border:1px transparent;    
}
td:nth-child(2) {
  text-align: right;    
}
#toggle {
  width: 330px;
  height: 51px;
  justify-self: center;
  background: #EAE9E9;
  border-radius: 11px;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

#toggle button{
  font-family: 'Rockwell';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #000000;
  height: 30px;
  place-self: center;
  padding: 0 10px;
  margin: 6px;
}

.active {
  background: #FFFEF9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 11px;
}
button:focus {
  outline: none;
}
`;

export default Recipe;
