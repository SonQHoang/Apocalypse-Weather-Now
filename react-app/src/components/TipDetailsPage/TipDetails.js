import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom'
import { getTipById } from '../../store/tips'
import TipComments from '../TipComment/TipComments'
import "./TipDetails.css"

function TipDetailsPage() {
    const { tipId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const allTips = useSelector((state) => state.tips.allTips)
    const tip = useSelector((state) => state.tips.singleTip)

    useEffect(() => {
        dispatch(getTipById(tipId))
    }, [dispatch, tipId])

    if (!tip) {
        return <div>Tip Not Found</div>
    }
    return (
        <>
            <section className='tipdetailcontainer'>
            <div className="tip-details-container">
                <div className="tip-details-header">
                    <div className="single-tip-h1-tag">
                        <h1 className="tip-details-title">{tip.title}</h1>
                    </div>
                    <div>
                        <h3 className="tip-details-weather-category">{tip?.weather_category}</h3>
                    </div>
                    <div className="single-tip-author">
                        <p>By: <NavLink exact to={`/survivors/${tip?.author?.id}`} className='author-nav-link'>{tip?.author?.username}</NavLink></p>
                    </div>
                </div>
                <div>
                    <p className="tip-details-body">{tip.body}</p>
                </div>
            </div>
            <div className='tip-comments'>
                <TipComments props={tipId} />
            </div>
            </section>
        </>
    )
}

export default TipDetailsPage
