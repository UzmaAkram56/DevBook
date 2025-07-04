import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { addLike, removeLike, deletePost } from "../../actions/post";
import formatDate from "../../utils/formatDate";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: {
    _id,
    text,
    name,
    avatar,
    userProfileImage,
    user,
    likes,
    comments,
    date,
  },
  showActions,
}) => (
  <div className="post bg-white my-1 p-1">
    <div>
      <Link to={`/profile/${user}`}>
        {userProfileImage ? (
          <img
            src={`http://localhost:5000/${userProfileImage}`}
            alt="Preview"
            className="image-preview"
          />
        ) : (
          <img
            src={avatar}
            alt="Github DP instead of Gravatar"
            className="round-img"
          />
        )}

        <h4>{name}</h4>
      </Link>
    </div>

    <div>
      <p className="my-1">{text}</p>

      <p className="post-date">Posted on {formatDate(date)}</p>

      {showActions && (
        <>
          <button
            onClick={(e) => addLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-up" />{" "}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>

          <button
            onClick={(e) => removeLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down" />
          </button>

          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion{" "}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>

          {!auth.loading && user === auth.user._id && (
            <button
              onClick={(e) => deletePost(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
