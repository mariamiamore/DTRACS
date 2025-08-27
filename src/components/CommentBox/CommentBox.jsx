// CommentBox.jsx
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAccountCircle } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import './CommentBox.css';

const CommentBox = ({ onSubmit, disabled }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const quillRef = useRef(null);

  // ✅ Load current user from sessionStorage
  useEffect(() => {
    const savedUser = sessionStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSend = () => {
    if (disabled || !quillRef.current) return;

    // ✅ Use custom isEmpty() from RichTextEditor ref
    if (quillRef.current.isEmpty()) {
      toast.error("Please enter a comment");
      return;
    }

    const content = quillRef.current.getHTML();
    onSubmit(content);

    // Reset editor
    setHtmlContent('');
    quillRef.current.clear();
  };

  return (
    <div className="comment-box">
      <div className="comment-input-container">
        {/* ✅ Show user avatar or fallback */}
        <div className="comment-avatar">
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt="Your avatar"
              className="comment-avatar-img"
            />
          ) : (
            <MdAccountCircle size={32} color="#555" />
          )}
        </div>

        <div className="comment-input-wrapper">
          <div className="comment-editor-container">
            <RichTextEditor
              ref={quillRef}
              value={htmlContent}
              onChange={setHtmlContent}
              placeholder="Add comment..."
              readOnly={disabled}
            />
            <button
              type="button"
              className="comment-send"
              onClick={handleSend}
              disabled={disabled}
            >
              <IoSendSharp size={20} color="#2196F3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;