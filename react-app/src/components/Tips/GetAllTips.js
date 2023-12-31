import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom';
import { getAllTips } from '../../store/tips'
import { useEffect, useState } from 'react';
import './tips.css'

function GetAllTips() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [showModal, setShowModal] = useState(false)
    const [selectedTip, setSelectedTip] = useState(null)
    const user = useSelector(state => state.session.user)

    const tips = Object.values(useSelector(state => state.tips.allTips))

    useEffect(() => {
        dispatch(getAllTips());
    }, [dispatch]);

    const handleDeleteClick = (tip) => {
        setSelectedTip(tip)
        setShowModal(true) 
    }

    return (
        <>
            <div className="all-tips-header-container">
                <h1>All Tips</h1>
                {user !== null ? (
                    <NavLink exact to='/tips/new'>
                        <button className="create-new-tip-button">Create a New Tip</button>
                    </NavLink>
                ) : null}
            </div>

            <div className="all-single-tips-container">

            {tips.map(tip => (
                <div
                    key={tip.id}
                >
                    {/* <div className="user-info-container">
                        <div className="user-info-section">
                            <p>{formatDate(tip.date_created)}</p>
                        </div>
                    </div> */}
                    <div className="single-tip-container" onClick={() => {
                        if (user !== null) {
                            history.push(`/tips/${tip.id}`)
                        }
                    }} >
                        <div className="single-tip-header">
                            <NavLink className="remove-nav-link-underline" exact to={`/tips/${tip.id}`}>
                                <h2 className="single-tip-title">{`${tip.title}`}</h2>
                            </NavLink>
                            <h3 className="single-tip-weather-category">{`${tip.weather_category}`}</h3>
                            <NavLink className="remove-nav-link-underline" exact to={`survivors/${tip.author.id}`}>
                                <p className="single-tip-author">{tip?.author?.username ? <p> By: {tip?.author?.username}</p> : null}</p>
                            </NavLink>
                        </div>
                        <div className="tip-body-container">
                            <p className="tip-body">{`${tip.body}`}</p>
                        </div>
                    </div>
                </div>
            ))}
                        </div>
        </>
    );
}

export default GetAllTips
