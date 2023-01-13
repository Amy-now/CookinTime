import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Search() {
  const [input, setInput] = useState("");

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/searched/${input}`);

    console.log(e);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch />
        <input
          type="text"
          value={input}
          placeholder = "Desserts, Pizza, 15 minuite meals"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  position: relative;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    position: relative;
    width: 500px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    border: none;
    font-size: 1.5rem;
    color: black;
    padding: 1rem 3rem;
    border: none;
    outline: none;
    width: 100%;
    background: #EAE9E9;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    height: 38px;
    left: 18px;
    top: 123px;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: black;
  }
`;

export default Search;
