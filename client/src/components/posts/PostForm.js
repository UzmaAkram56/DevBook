import { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addPost({ text });
    setText("");
  };

  return (
    <div className="post-form">
      <div
        className="post-form-header bg-primary"
        style={{ borderRadius: 4, padding: "12px 16px" }}
      >
        <div>Say Something...</div>
      </div>

      <form className="form my-1" onSubmit={handleOnSubmit}>
        <textarea
          name="text"
          style={{ height: 120 }}
          placeholder="Create a Post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <input type="submit" value="Submit" className="btn btn-dark my-1" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
