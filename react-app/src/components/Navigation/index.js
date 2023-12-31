import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const [onHoverOne, setOnHoverOne] = useState('hidden')
	const [onHoverTwo, setOnHoverTwo] = useState('hidden')
	const [onHoverThree, setOnHoverThree] = useState('hidden')
	const [onHoverFour, setOnHoverFour] = useState('hidden')
	const [onHoverFive, setOnHoverFive] = useState('hidden')

	return (
		<nav className="navbar">

			<div className="nav-container">
				<div className="nav-left">
					<div className='nav-left-top-bar'>
						<div className='nav-left-item' id='nav-left-home-item' onMouseEnter={() => setOnHoverOne('visible')} onMouseLeave={() => setOnHoverOne('hidden')}>
							<NavLink id='nav-bar-home' exact to="/">
							<img className="awn-logo" src="https://res.cloudinary.com/dgxpqnbwn/image/upload/v1693525875/Apocalyptic_Weather_News_1_-PhotoRoom.png-PhotoRoom_qn7xmb.png" alt="Logo"/>
							</NavLink>
							<span id={`first-span-${onHoverOne}`}></span>
						</div>
						<div className='nav-left-item' id='nav-left-forecast-item' onMouseEnter={() => setOnHoverTwo('visible')} onMouseLeave={() => setOnHoverTwo('hidden')}>
							<NavLink id='nav-bar-forecast' to="/forecast">Forecast</NavLink>
							<span id={`second-span-${onHoverTwo}`}></span>
						</div>
						<div className='nav-left-item' id='nav-left-stories-item' onMouseEnter={() => setOnHoverThree('visible')} onMouseLeave={() => setOnHoverThree('hidden')}>
							<NavLink id='nav-bar-stories' to="/stories">Stories</NavLink>
							<span id={`third-span-${onHoverThree}`}></span>
						</div>
						<div className='nav-left-item' id='nav-left-tips-item' onMouseEnter={() => setOnHoverFour('visible')} onMouseLeave={() => setOnHoverFour('hidden')}>
							<NavLink id='nav-bar-tips' to="/tips">Tips</NavLink>
							<span id={`fourth-span-${onHoverFour}`}></span>
						</div>
						<div className='nav-left-item' id='nav-left-quiz-item' onMouseEnter={() => setOnHoverFive('visible')} onMouseLeave={() => setOnHoverFive('hidden')}>
							<NavLink id='nav-bar-quiz' to="/quiz">Quiz</NavLink>
							<span id={`fifth-span-${onHoverFive}`}></span>
						</div>
					</div>
				</div>
				<div className="nav-right">
					<div className="profile-button-container">
					{isLoaded && (
						<div>
							<ProfileButton user={sessionUser} />
						</div>
					)}
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
