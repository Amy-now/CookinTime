import styled from "styled-components";
import { useParams } from "react-router-dom";
import Menu from "../components/Menu";
// import Home from "../components/Home";
import React, { useEffect, useState, useRef } from "react";
import { auth } from "../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import Searched from "./Searched";

function Recipe() {
  let params = useParams();

  const [ingredients, setIngredients] = useState([]);
  const [time, setTime] = useState([]);
  const [aligens, setAligens] = useState([]);
  const inputRef = useRef();
  const [isVisibleAligen, setIsVisibleAligen] = useState(false);
  const [isVisibleTime, setIsVisibleTime] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const handleTimeChange = () => {
    setTime(inputRef.current.value);
    console.log(time);
  };

  const handleTimeKeyPress = (event) => {
    if (inputRef.current.value.length >= 3) {
      event.preventDefault();
    }
  };

  const handleAddIngredients = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (event.target.value.trim() !== "") {
        setIngredients([...ingredients, event.target.value]);
        event.target.value = "";
      }
    }
  };

  const handleAddIngredientsButton = (event) => {
    const ingredient = event.target.textContent;
    setIngredients((prevIngredients) => {
      if (prevIngredients.includes(ingredient)) {
        // remove the ingredient and remove the "Active" class
        event.target.classList.remove("active");
        return prevIngredients.filter((i) => i !== ingredient);
      } else {
        // add the ingredient and add the "Active" class
        event.target.classList.add("active");
        return [...prevIngredients, ingredient];
      }
    });
  };

  const handleRemoveIngredients = (index) => {
    setIngredients(ingredients.filter((tag, i) => i !== index));
  };

  const handleAligensButton = (event) => {
    const tagName = event.target.textContent;
    if (aligens.includes(tagName)) {
      setAligens(aligens.filter((aligen) => aligen !== tagName));
      event.target.classList.remove("active");
    } else {
      setAligens([...aligens, tagName]);
      event.target.classList.add("active");
    }
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) window.location.href = "/login";
  }, [user, loading]);

  return (
    <DetailWrapper>
      <div className="flex justify-center container" id="background">
        <div className="flex justify-center" id="header">
          {/* <Home></Home> */}
          <h1 id="title" className="text-5xl font-bold mt-0 mb-6">
            Recipe Generator
          </h1>
        </div>
      </div>
      <h4 id="generatorDiscription">
        Not sure what to cook? Let us know what food you have in your cupboards
        and we will take care of the ideas
      </h4>
      <div className="flex justify-center">
        <Tags>
          <div>
            <form>
              <div id="tagContainer">
                {ingredients.map((tag, index) => (
                  <div className="tag" key={index}>
                    <span
                      className="tag-close"
                      onClick={() => handleRemoveIngredients(index)}
                    >
                      X
                    </span>
                    {tag}
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Enter your ingredient"
                  onKeyPress={handleAddIngredients}
                />
              </div>
              <button
                id="searchButton"
                className="bg-transparent hover focus:outline-none"
                onClick={search}
              >
                <p>Search</p>
              </button>
              <h1></h1>
            </form>
          </div>
        </Tags>
      </div>
      <div id="tiles" className="flex flex-wrap justify-center space-x-2">
        <span
          id="Time"
          className="cursor-pointer"
          onClick={() => setIsVisibleTime(!isVisibleTime)}
        >
          Time Preference
        </span>
        <span
          id="Aligens"
          className="cursor-pointer"
          onClick={() => setIsVisibleAligen(!isVisibleAligen)}
        >
          Add Aligens
        </span>
      </div>
      <div className="containers">
        <div
          className={`extraContainer align-info ${
            isVisibleTime ? "is-visible" : ""
          }`}
          style={{
            transform: `translateY(${isVisibleTime ? "0%" : "0"})`,
            display: isVisibleTime ? "inline-table" : "none",
            opacity: isVisibleTime ? 1 : 0,
            transition: "transform 0.3s ease, opacity 0.3s ease",
          }}
        >
          <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
              <label
                for="exampleNumber0"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Time to cook
              </label>
              <input
                type="number"
                ref={inputRef}
                onKeyPress={handleTimeKeyPress}
                onChange={handleTimeChange}
                className="form-control block w-48 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="time"
                placeholder="Minutes"
              />
            </div>
          </div>
        </div>
        <Wrapper>
          <div className="grid grid-rows-2 max-sm:grid-rows-6 sm:grid-cols-3">
            <div
              className={`redButtons extraContainer align-info ${
                isVisibleAligen ? "is-visible" : ""
              }`}
              style={{
                transform: `translateY(${isVisibleAligen ? "0%" : "0"})`,
                display: isVisibleAligen ? "inline-table" : "none",
                opacity: isVisibleAligen ? 1 : 0,
                transition: "transform 0.3s ease, opacity 0.3s ease",
              }}
            >
              <h4 className="label">Allergies:</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAligensButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Dairy
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAligensButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Egg
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAligensButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Gluten
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAligensButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Grain
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAligensButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Peanut
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAligensButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Seafood
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAligensButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Sesame
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAligensButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Shellfish
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAligensButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Soy
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAligensButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Sulfite
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAligensButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Tree Nut
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAligensButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Wheat
                  </button>
                </div>
              </div>
            </div>

            <div className="extraContainer">
              <h4 className="label">Meats:</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Chicken
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Steak
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Mince
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Lamb
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Salmon
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Cod
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Crab
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Duck
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Pork
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Mutton
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Beef
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Turkey
                  </button>
                </div>
              </div>
            </div>

            <div className="extraContainer">
              <h4 className="label">Vegtables:</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Potato
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Garlic
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Tomatos
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Carrot
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Celery
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Onion
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Celery
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Spinach
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Asparagus
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Shallots
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Kale
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Pumpkin
                  </button>
                </div>
              </div>
            </div>

            <div className="extraContainer">
              <h4 className="label">Dairy and eggs:</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Butter
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Eggs
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Cream
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Yogurt
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Ice Cream
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Custard
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Oat Milk
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Duck Egg
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Ghee
                  </button>
                </div>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={handleAddIngredientsButton}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Chocolate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      <Menu></Menu>
    </DetailWrapper>
  );
  function search(event) {
    event.preventDefault();
    let url = `/generated`;
    if (Object.keys(ingredients).length === 0) {
      url += `/unknown`;
    } else {
      url += `/${ingredients}`;
    }
    if (Object.keys(aligens).length === 0) {
      url += `/unknown`;
    } else {
      url += `/${aligens}`;
    }
    if (Object.keys(time).length === 0) {
      url += `/unknown`;
    } else {
      url += `/${time}`;
    }
    console.log(url);
    window.history.replaceState({}, "", url);
    window.location.reload();
  }
}

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  #recomend {
    font-family: "Rockwell";
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

const DetailWrapper = styled.div`
color: black;
display: grid;
text-align: -webkit-center;

.containers {
  display: grid;
}

p {
    line-height: 1.25rem;
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
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  width: 30%;
  color: #8C8C8C;
  margin-top: 15px;
}
#generatorDiscription{
  text-align: center;
    margin: auto;
  width: 640px; 
  padding: 0px 50px 0px 50px;
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
#tiles span {
  background: #EAE9E9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 11px;
  margin: 0 25px 20px 0;
  font-family: 'Rockwell';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: #222222;
  padding: 8px;
}

#picture {
  border-radius: 22px;
}
#searchButton{
    background: rgba(255,229,138,0.44);
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    border-radius: 11px;
    color: black;
    padding: 10px;
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    width: 100%;
    color: #222222;
    text-align: center;
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
  margin 5px;
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

.extraContainer {
  height: 51px;
  background: rgba(234, 233, 233, 0.5);
  border-radius: 11px;
  padding: 20px;
  width: fit-content;
  justify-self: center;
  border-radius: 11px;
  margin-bottom: 50px;
  display: inline-table;
  width: 330px;
  margin: 10px;
}


@media screen and (max-width: 600px) {
  .extraContainer {
    max-width: 100%;
  }
  h4 {
    width: 80%
  }
}

.output {
  width: 330px;
  height: 51px;
  justify-self: center;
  background: #EAE9E9;
  border-radius: 11px;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
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

button:focus {
  outline: none;
}

.extraContainer button{
  background: rgba(255, 229, 138, 0.44);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 11px;
color: black;
padding: 10px;
font-family: 'Rockwell';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 18px;
width: 100%;
color: #222222;
text-align: center;
}

.extraContainer button:hover{
  background: #FFE58A;
}

.aligen-info {
  background-color: white;
  overflow: auto;
  z-index: 1;
}
.aligen-info.is-visible {
  transform: translateY(0);
  opacity: 1;
}

.redButtons {
  background: red;
}


.extraContainer button.active{
  background: #d2b520;
}

#time{
    text-align: center;
    width: 200px;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: inherit;
    left: 13px;
    top: 202px;
    background: #EAE9E9;
    padding: 10px;
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #AAAAAA;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-top: 2px;
}
#time:focus {
  outline: none;
}

.label {
  font-family: 'Rockwell';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #222222;
  display: block;
  text-align: left;
  position: absolute;
  margin-top: initial;
}
  #background {
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    left: 20px;
    border-radius: 45px 45px 0 0;
    background: #ffe58a;
    margin-top: 20px;
  }
  #header {
    padding: 20px;
  }

.grid-cols-3 {
  margin-top: 25px;

`;

const Tags = styled.div`
  #tagContainer {
    width: 357px;
    height: fit-content;
    left: 13px;
    top: 202px;
    background: #eae9e9;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    padding: 10px;
    margin: 20px;
    font-family: "Rockwell";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 10px;
    color: #aaaaaa;
    display: flex;
    flex-wrap: wrap;
  }
  #tagContainer:focus {
    outline: none;
  }

  input {
    width: 357px;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: inherit;
    left: 13px;
    top: 202px;
    background: #eae9e9;
    padding: 10px;
    font-family: "Rockwell";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #aaaaaa;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-top: 2px;
  }
  input:focus {
    outline: none;
  }

  .tag {
    display: flex;
    align-items: center;
    height: 35px;
    margin-right: 5px;
    padding: 0 8px;
    color: #fff;
    background: #ffe58a;
    cursor: pointer;
    margin-bottom: 2px;
    font-family: "Rockwell";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #222222;
    text-transform: capitalize;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
  }

  .tag-close {
    display: inline-block;
    margin-right: 0;
    width: 0;
    transition: 0.2s all;
    overflow: hidden;
    weight: 600;
  }

  .tag:hover .tag-close {
    margin-right: 5px;
    width: 10px;
    font-weight: 500;
  }
`;

export default Recipe;
