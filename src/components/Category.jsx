import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Category() {
  return (
    <List>
      <div className="flex flex-wrap justify-center space-x-2">
      <SLink to="/cuisine/Italian">
				<span
					className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
					Italian
					<button className="bg-transparent hover focus:outline-none">
					</button>
				</span>
      </SLink>
      <SLink to="/cuisine/American">
				<span
					className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
					American
					<button className="bg-transparent hover focus:outline-none">
					</button>
				</span>
      </SLink>
      <SLink to="/cuisine/Thai">
				<span
					className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
					Thai
					<button className="bg-transparent hover focus:outline-none">
					</button>
				</span>
      </SLink>
      </div>
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;

  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const SLink = styled(NavLink)`
  span {
    background: #EAE9E9;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #222222;
    align-items: center;
    margin: 5px;
  }

  svg {
    margin-right: 0.3rem !important;
    margin-left: 0 !important;
  }
`;

export default Category;
