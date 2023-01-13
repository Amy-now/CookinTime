import React from 'react';
import Home from './Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import Cuisine from './Cuisine';
import Searched from './Searched';
import Recipe from './Recipe';
import Profile from './Profile';
import Steps from './Steps';
import Login from './Login';
import Regester from './Regester';
import Welcome from './Welcome';
import Generator from './Generator';
import Generated from './Generated';
import Forgot from './Forgot';
import Favorites from './Favs';
import { AnimatePresence } from 'framer-motion';

function Pages() {
	const location = useLocation();
	return (
		<AnimatePresence exitBeforeEnter>
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Home />} />
				<Route path="/welcome" element={<Welcome />} />
				<Route path="/forgot" element={<Forgot />} />
				<Route path="/login" element={<Login />} />
				<Route path="/regester" element={<Regester />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route path="/generator" element={<Generator />} />
				<Route path="/generated/:ingredients/:aligens/:time" element={<Generated />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/cuisine/:type" element={<Cuisine />} />
				<Route path="/searched/:search" element={<Searched />} />
				<Route path="/recipe/:name" element={<Recipe />} />
				<Route path="/steps/:name/:step" element={<Steps />} />
			</Routes>
		</AnimatePresence>
	);
}

export default Pages;
