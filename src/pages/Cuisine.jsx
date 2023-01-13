import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { auth } from "../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiArrowRightCircle, FiThumbsUp, FiClock } from "react-icons/fi";
import Card from "../components/Card";
import Category from "../components/Category";
import Search from "../components/Search";
import Menu from "../components/Menu";
import Popular from '../components/Popular';


function Cuisine() {
  const [user, loading, error] = useAuthState(auth);
  const [cuisine, setCuisine] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState([]);


  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
    console.log(recipes.results);
    const ids = recipes.results.map(recipe => recipe.id);
    fetch(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.REACT_APP_API_KEY}&ids=${ids}`)
      .then(response => response.json())
      .then(data => {
        setRecipeInfo(data);
        console.log(data);
      })
      .catch(error => {
        // handle the error
      });
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) window.location.href = '/login';
    ;
  }, [user, loading]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Nav>
        <h1 id='title' className="text-5xl font-bold mt-0 mb-6">{params.type}</h1>
      </Nav>
      <Search />
      <Category />
      <Wrapper>
        <div className="grid grid-rows-2 md:grid-rows-6 md:grid-cols-3 space-x-2">
          {recipeInfo.map((recipe) => {
            return (
              <Card>
                <div className="flex justify-center">

                  <Link to={`/recipe/${recipe?.id}`}>
                    <div style={{ backgroundImage: `url(${recipe?.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', width: '350px', height: '220px', borderRadius: '22px' }} className="shadow-lg bg-white max-w-sm">
                      <div className="p-6">
                        <h3 className="text-gray-900 text-xl font-medium mb-2"><FiThumbsUp style={{ float: `left` }}></FiThumbsUp>{recipe?.aggregateLikes}</h3>
                        <h4 className="text-gray-900 text-xl capitalize font-medium mb-2">{recipe?.dishTypes[0]}</h4>
                        <h5 className="text-gray-900 text-xl font-medium mb-2">{recipe?.title}</h5>
                        <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"><FiArrowRightCircle style={{ float: `right`, paddingLeft: `4px` }}></FiArrowRightCircle>Explore</button>
                        <p style={{ float: `right` }} className="text-gray-700 text-base mb-4"><FiClock style={{ float: `left` }}></FiClock>{recipe?.readyInMinutes} Mins</p>
                      </div>
                    </div>

                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </Wrapper>
      <Menu />
    </motion.div>
  );
}

const Nav = styled.div`
	h1 {
		font-family: 'Rockwell';
		font-style: normal;
		font-weight: 400;
		font-size: 32px;
		line-height: 38px;
		text-align: center;
		color: #222222;
		margin-top: 50px;
	}

	h5 {
		background: rgba(255, 254, 249, 0.75);
		border-radius: 11px;
		font-family: 'Rockwell';
		font-style: normal;
		font-weight: 400;
		font-size: 15px;
		line-height: 18px;
		width: fit-content;
		padding: 0 10px;
	}
`;

const Wrapper = styled.div`
display: grid;
justify-content: center;
#recomend {
  font-family: 'Rockwell';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: #222222;
}
  @media (max-width: 768px) {
    h3 {
      font-size: 1rem;
    }
  }
`;

export default Cuisine;
