import { useEffect, useState } from "react";
import styled from "styled-components";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
import { FiArrowRightCircle, FiThumbsUp, FiClock } from "react-icons/fi";
import Card from "../components/Card";

function Popular() {
  const numberOfRandomRecipes = 9;

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      try {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=${numberOfRandomRecipes}`
        );
        const data = await api.json();

        localStorage.setItem("popular", JSON.stringify(data.recipes));
        setPopular(data.recipes);
        console.log(data.recipes);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Wrapper>
        <h3 id="recomend">Recomended</h3>
        <div className="grid grid-rows-2 md:grid-rows-6 md:grid-cols-3 space-x-2">
          {popular.map((recipe) => {
            return (
                <Card>
                  <div className="flex justify-center">
                    
                  <Link to={`/recipe/${recipe.id}`}>
                      <div style={{ backgroundImage: `url(${recipe.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', width: '350px', height: '220px',borderRadius: '22px' }} className="shadow-lg bg-white max-w-sm">
                        <div className="p-6">
                          <h3 className="text-gray-900 text-xl font-medium mb-2"><FiThumbsUp style={{ float: `left` }}></FiThumbsUp>{recipe.aggregateLikes}</h3>
                          <h4 className="text-gray-900 text-xl capitalize font-medium mb-2">{recipe.dishTypes[0]}</h4>
                          <h5 className="text-gray-900 text-xl font-medium mb-2">{recipe.title}</h5>
                          <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"><FiArrowRightCircle style={{ float: `right`, paddingLeft: `4px` }}></FiArrowRightCircle>Explore</button>
                          <p style={{ float: `right` }} className="text-gray-700 text-base mb-4"><FiClock style={{ float: `left` }}></FiClock>{recipe.readyInMinutes} Mins</p>
                        </div>
                      </div>
                      
                    </Link>
                  </div>
                </Card>
            );
          })}
        </div>
      </Wrapper>
    </div>
  );
}

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

export default Popular;
