import React from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';

function HomeButton() {
  function homePage(event) {
    event.preventDefault();
    window.history.replaceState({}, '', `/`);
    window.location.reload();
  }

  return (
    <button className="bg-transparent hover focus:outline-none" onClick={homePage}>
      <FaRegArrowAltCircleLeft id="left" />
    </button>
  );
}

export default HomeButton;