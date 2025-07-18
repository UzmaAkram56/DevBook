import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar, userProfileImage },
    company,
    status,
    location,
    skills,
  },
}) => {
  const currentImage = `http://localhost:5000/${userProfileImage}` || null; // fallback to null if none

  return (
    <div className="profile bg-light">
      {userProfileImage ? (
        <img src={userProfileImage} alt="Preview" className="image-preview" />
      ) : (
        <img
          src={avatar}
          alt="Github DP instead of Gravatar"
          className="round-img"
        />
      )}

      <div>
        <h2>{name}</h2>

        <p>
          {status} {company && <span> at {company}</span>}
        </p>

        <p className="my-1">{location && <span>{location}</span>}</p>

        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>

      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
