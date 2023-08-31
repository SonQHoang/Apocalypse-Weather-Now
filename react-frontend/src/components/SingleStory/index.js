import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import * as storyActions from '../../store/stories'
import OpenModalButton from '../OpenModalButton'
import DeleteStoryModal from "../DeleteStoryModal";
import UpdateStoryModal from '../UpdateStoryModal'
import './SingleStory.css'
import StoryComments from "../StoryComments";
import StoryLikesComponent from "../StoryLikes";

const SingleStoryComponent = () => {
    const dispatch = useDispatch()
    const currentStory = useSelector((state) => state.stories.singleStory)
    const sessionUser = useSelector((state) => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false)
    const { id } = useParams()
    const[isMenuOpen, setIsMenuOpen] = useState(false)

    let menu

    useEffect(() => {
        dispatch(storyActions.getOneStory(id))
        .then(() => {
            setIsLoaded(true)
        })
    }, [dispatch, isLoaded])

    const handleOutsideClicks = () => {
        if(isMenuOpen) {
            setIsMenuOpen(false)
            return
        } else {
            return
        }
    }

    if(isMenuOpen) {
        menu = (
            <>
                <div className='manage-story-buttons-div-visible'>
                    <OpenModalButton buttonText='Update' modalComponent={<UpdateStoryModal story={currentStory} />} />
                    <OpenModalButton buttonText='Delete' modalComponent={<DeleteStoryModal story={currentStory} />} />
                </div>
            </>
        )
    } else {
        menu = (
            <>
                <div className='manage-story-buttons-div-hidden'>
                    <OpenModalButton buttonText='Update' modalComponent={<UpdateStoryModal story={currentStory} />} />
                    <OpenModalButton buttonText='Delete' modalComponent={<DeleteStoryModal story={currentStory} />} />
                </div>
            </>
        )
    }

    return (
        <div onClick={handleOutsideClicks}>
            <div id='single-story-container'>
                <div id='single-story-header'>
                    <div id='title-and-manage-dots-div'>
                        <h1 id='single-story-h1-tag'>{isLoaded && currentStory && currentStory?.title}</h1>
                        {(sessionUser && sessionUser.id === currentStory?.author?.id) ? (
                        <div id='story-manage-dots-container' onClick={() => isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)}>
                            <div className='story-manage-menu-dot'>.</div>
                            <div className='story-manage-menu-dot'>.</div>
                            <div className='story-manage-menu-dot'>.</div>
                        </div>
                        ) : ''}
                    </div>
                    <p className='story-author-name'>By: {isLoaded && currentStory && currentStory?.author?.first_name} {isLoaded && currentStory && currentStory?.author?.last_name}</p>
                </div>
                <div id='single-story-body'>
                    <p>{isLoaded && currentStory && currentStory?.body}</p>
                    {(sessionUser && sessionUser.id === currentStory?.author?.id) ? (
                        <>
                            {menu}
                        </>
                    ) : ''}
                </div>
                <div>
                    {sessionUser ? (
                        <StoryLikesComponent story={currentStory} />
                    ) : ''}
                </div>
            </div>
            <div className="comments-container">
                <StoryComments props={id}/>
            </div>
        </div>
    )
}

export default SingleStoryComponent;
