import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editComment } from "../../../store/tipcomments";
import React, { useState } from "react";
import "./TipUpdateCommentModal.css";



function EditCommentModal(props) {
  const tipComments = useSelector((state) => state.tipcomments);
  const currentUser = useSelector((state) => state.session.user);
  const tipId  = props.props.tipId;
  const userId  = currentUser.id
  const commentId = props.props.id
  const { closeModal } = useModal();
  const commentToEdit = (tipComments[commentId])
  const dispatch = useDispatch();

  console.log(commentToEdit)
  const [body, setComment] = useState('');
  const [errors, setErrors] = useState({});

  let isDisabled = true;
  if (body.length > 0) {
    isDisabled = false;
  }

  const submitComment = async (e) => {
    e.preventDefault();
    const data = await dispatch(editComment(tipId, userId, body, commentId));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      closeModal();
    }
  };


  return (
    <div className="comment-form-modal">
      <h1>Edit your Comment</h1>
      <>{errors.message}</>
      <textarea
        className="post-comment-form-modal"
        onChange={(e) => setComment(e.target.value)}
      >{commentToEdit.body}</textarea>
      <button className='submit-comment-buttom' onClick={submitComment} disabled={isDisabled}>
        Submit Your Comment
      </button>
    </div>
  );
}

export default EditCommentModal;