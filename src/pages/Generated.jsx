import styled from 'styled-components';
import Search from "../components/Search";
import Card from "../components/Card";
import { motion } from 'framer-motion';
import { FiArrowRightCircle,FiThumbsUp,FiClock } from "react-icons/fi";
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { auth } from "../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Menu from "../components/Menu";

export function Searched() {
	const [searchedRecipes, setSearchedRecipes] = useState([]);
	const [resultsnumber, setResultsNumber] = useState([]);
	const [idArray, setIdArray] = useState([]);
	const [bulkRecipes, setBulkRecipes] = useState([]);
	const params = useParams();
    const [user, loading, error] = useAuthState(auth);

  
	// use useMemo hook to avoid unnecessary updates
	const getSearched = useCallback(async (ingredients, aligens, time) => {
	  try {
		let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}`;

		if (ingredients !== 'unknown') {
		url += `&includeIngredients=${ingredients}`;
		}

		if (aligens !== 'unknown') {
		url += `&intolerances=${aligens}`;
		}

		if (time !== 'unknown') {
		url += `&maxReadyTime=${time}`;
		}
		const data = await fetch(
			url
		);
		const recipes = await data.json();
		setSearchedRecipes(recipes.results);
		setResultsNumber(recipes.totalResults)
		console.log(recipes);
	  } catch (error) {
		console.error(error);
	  }
	}, []);

	// use useEffect hook to update idArray after searchedRecipes has been updated
	useEffect(() => {
	  setIdArray(searchedRecipes.map(recipe => recipe.id));
	}, [searchedRecipes]);

    useEffect(() => {
      if (loading) {
          // maybe trigger a loading screen
          return;
      }
      if (!user) window.location.href = '/login';
      ;
  }, [user, loading]);

  
	const getBulkRecipes = useCallback(async () => {
	  try {
		const ids = idArray.join(',');
		const data = await fetch(
		  `https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.REACT_APP_API_KEY}&ids=${ids}`
		);
		const bulk = await data.json();
		setBulkRecipes(bulk);
		console.log(bulk);
	  } catch (error) {
		console.error(error);
	  }
	}, [idArray]);
  
	useEffect(() => {
		getSearched(params.ingredients, params.aligens, params.time);
	}, [params.ingredients, getSearched]);
  
	useEffect(() => {
	  if (idArray.length > 0) {
		getBulkRecipes();
	  }
	}, [idArray, getBulkRecipes]);
  
  // use useMemo hook to avoid unnecessary updates
  const searchedRecipesList = useMemo(() => {

	return bulkRecipes.map(recipe => (
		<Card>
		  <Link to={`/recipe/${recipe.id}`}>
			<div className="flex justify-center">
			  <div
				style={{
				  backgroundImage: `url(${recipe.image})`,
				  backgroundSize: "cover",
				  backgroundRepeat: "no-repeat",
				  backgroundPosition: "center center",
				  width: "-webkit-fill-available",
				  borderRadius: "22px"
				}}
				className="shadow-lg bg-white max-w-sm"
			  >
				<div className="p-6">
				  <h3 className="text-gray-900 text-xl font-medium mb-2">
					<FiThumbsUp style={{ float: `left` }}></FiThumbsUp>
					{recipe.aggregateLikes}
				  </h3>
				  <h4 className="text-gray-900 text-xl capitalize font-medium mb-2">
					{recipe.dishTypes[0]}
				  </h4>
				  <h5 className="text-gray-900 text-xl font-medium mb-2">
					{recipe.title}
				  </h5>
				  <button
					type="button"
					className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
				  >
					<FiArrowRightCircle
					  style={{ float: `right`, paddingLeft: `4px` }}
					></FiArrowRightCircle>
					Explore
				  </button>
	  
				  <p
					style={{ float: `right` }}
					className="text-gray-700 text-base mb-4"
				  >
					<FiClock style={{ float: `left` }}></FiClock>
					{recipe.readyInMinutes} Mins
				  </p>
				</div>
			  </div>
			</div>
		  </Link>
		</Card>
	  ));
  }, [bulkRecipes]);  
  console.log(searchedRecipes);
  return (
	<motion.div
	  animate={{ opacity: 1 }}
	  initial={{ opacity: 0 }}
	  exit={{ opacity: 0 }}
	  transition={{ duration: 0.5 }}
	>
	  <Nav>
		<h1 className="text-5xl font-bold mt-0 mb-6">Recipies</h1>
		<h1 className="text-5xl mt-0 mb-6">{resultsnumber} Results (showing {searchedRecipes?.length})</h1>
	  </Nav>
	  <Search />
	  <div>{searchedRecipesList}</div>
	  <Menu></Menu>
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
export default Searched;
