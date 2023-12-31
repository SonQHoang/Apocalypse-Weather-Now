import { getOneStory} from "./stories";

const GET_COMMENTS = "comments/getComments";
const POST_COMMENTS = "comments/new";
const PUT_COMMENTS = "comments/update";

export const getStoryComments = (data) => {
  return {
    type: GET_COMMENTS,
    comments: data
  };
};

export const addComment = (comment) => {
  return {
    type: POST_COMMENTS,
    comment,
  };
};

//get comments thunk creator
export const getComments = (storyId) => async (dispatch) => {

  const response = await fetch(`/api/story-comments/${storyId}`, {
    method: "GET",
  });
  const data = await response.json();
  if(response.ok) {
    dispatch(getStoryComments(data));
    return response;
  } else if(!response.ok && data.message) {
    dispatch(getStoryComments(storyId.comments = {}))
  }
};

// create comment thunk action creator
export const postComment = (storyId, userId, commentBody) => async (dispatch) => {

  const responseBody = {
    commentBody,
    userId,
    storyId
  }

  const response = await fetch(`/api/story-comments/comments/new`, {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
    },
    body: JSON.stringify(responseBody),
  });

  if (response.ok) {
    const comment = await response.json();
    dispatch(getComments(storyId));
    dispatch(getOneStory(storyId))
    return comment;
  }
};

//need an edit comment thunk action creator
export const editComment = (storyId, userId, commentBody, commentId) => async (dispatch) => {

  const responseBody = {
    commentBody,
    userId,
    storyId
  }
  const response = await fetch(`/api/story-comments/comments/${commentId}`, {
    method: "PUT",
    headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
    },
    body: JSON.stringify(responseBody),
  });
  if (response.ok) {
    const comment = await response.json();
    dispatch(getComments(storyId));
    dispatch(getOneStory(storyId))
    return comment;
  }
};

//delete comment thunk action creator
export const deleteComment = (id, storyId) => async (dispatch) => {
  const response = await fetch(`/api/story-comments/comments/${id}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    const comment = await response.json();
    const waiting = await dispatch(getComments(storyId))
    const stillWaiting = await dispatch(getOneStory(storyId))
    return comment;
  }
}

const initalState = {
  comments: {}
};

const commentsReducer = (state = initalState, action) => {
  let newState;
  switch (action.type) {
    case GET_COMMENTS:
      newState = Object.assign({}, state);
      let newObject = {}

      action.comments.forEach(comment => {
        newObject[comment.id] = comment
      })
      newState = newObject;
      return newState;
    case POST_COMMENTS:
      newState = Object.assign({}, state);
      newState.comments = action.comment;
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
