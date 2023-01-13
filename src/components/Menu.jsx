import styled from "styled-components";
import { Link } from "react-router-dom";

const Tabs = () => {
    return (
        <Menu>
            <div id="menu">
                <ul className="nav nav-tabs flex flex-row flex-wrap list-none border-b-0 pl-0" id="tabs-tabFill"
                    role="tablist">
                    <li className="nav-item text-center" role="presentation">
                        <Link to={`/`}>
                            <span
                                className="font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max">
                                <img className="w-9 h-9 max-w-none" alt="Home"
                                    src="/1.png" />

                                <button className="bg-transparent hover focus:outline-none">
                                </button>
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item text-center" role="presentation">
                        <Link to={`/generator`}>
                            <span
                                className="font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max">
                                <img className="w-9 h-9 max-w-none" alt="Cook"
                                    src="/2.png" />

                                <button className="bg-transparent hover focus:outline-none">
                                </button>
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item text-center" role="presentation">
                        <Link to={`/favorites`}>
                            <span
                                className="font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max">
                                <img className="w-9 h-9 max-w-none" alt="Favs"
                                    src="/3.png" />

                                <button className="bg-transparent hover focus:outline-none">
                                </button>
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item text-center" role="presentation">
                        <Link to={`/profile`}>
                            <span
                                className="font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max">
                                <img className="w-9 h-9 max-w-none" alt="User"
                                    src="/4.png" />

                                <button className="bg-transparent hover focus:outline-none">
                                </button>
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </Menu>
    )
};

const Menu = styled.div`
    #menu {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #FFE58A;
    }
    li {
        margin: auto;
        padding: 2px;
    }

    ul {
        width: 50%;
        margin: auto;
        padding: 5px;
    }

    span {
        width: fit-content;
        padding: 10px;
        border-radius: 13px;
        margin: 0;
    }

    span:hover {
        background: #FFFEF9;
        transition-duration: 0s;
        border-radius: 13px;
        padding: 10px;
    }

    img {
        width 40px;
        height: 40px;
    }
    @media only screen and (max-width: 600px) {
        ul {
            width: 100%;
        }
    }
    
`;

export default Tabs;