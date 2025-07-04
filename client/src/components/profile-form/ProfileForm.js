import { useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  createProfile,
  getCurrentProfile,
  uploadProfile,
} from "../../actions/profile";
import { Camera } from "lucide-react";

// TODO: Optimize code
/*
  NOTE: declare initialState outside of component
  so that it doesn't trigger a useEffect
  we can then safely use this to construct our profileData
 */
const initialState = {
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubusername: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  reddit: "",
  instagram: "",
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  uploadProfile, // ✅ Add this here
}) => {
  const [formData, setFormData] = useState(initialState);
  const creatingProfile = useMatch("/create-profile");
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // if there is no profile, attempt to fetch one
    if (!profile) getCurrentProfile();

    // if we finished loading and we do have a profile
    // then build our profileData
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      // the skills may be an array from our API response
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(", "); // (or) .join(','),
      // set local state with the profileData
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    reddit,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, profile ? true : false);
  };

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      const formDataImage = new FormData();
      formDataImage.append("profile_image", file);

      try {
        uploadProfile(formDataImage, navigate);
      } catch (err) {
        console.error("File upload failed:", err);
      }
    }
  };

  const currentImage = preview || profile?.user?.userProfileImage || null; // fallback to null if none

  return (
    <section className="container">
      <div className="large text-primary">
        {creatingProfile ? "Create Your Profile" : "Edit Your Profile"}
      </div>

      <p className="lead">
        <i className="fas fa-user" />
        {creatingProfile
          ? ` Let's get some information to make your`
          : " Add some changes to your profile"}
      </p>

      <small>
        {" "}
        <span className="text-danger">*</span> = required field
      </small>

      {/* upload image */}
      <div className="image-upload-container">
        <div className="label">Profile Image</div>
        <label className="image-preview-wrapper">
          <input type="file" onChange={handleFileChange} hidden />
          {currentImage ? (
            <img src={currentImage} alt="Preview" className="image-preview" />
          ) : (
            <div className="placeholder" />
          )}
          <div className="overlay-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#b88017"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-camera-icon lucide-camera"
            >
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>{" "}
          </div>
        </label>
      </div>

      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <div className="label">
            Professional Status <span className="text-danger">*</span>
          </div>
          <select name="status" value={status} onChange={onChange}>
            <option>Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>

          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>

        <div className="form-group">
          <div className="label">Company</div>
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={onChange}
          />

          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>

        <div className="form-group">
          <div className="label">Website</div>
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onChange}
          />

          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>

        <div className="form-group">
          <div className="label">Location</div>
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />

          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>

        <div className="form-group">
          <div className="label">
            Skills <span className="text-danger">*</span>
          </div>
          <input
            type="text"
            placeholder="Skills"
            name="skills"
            value={skills}
            onChange={onChange}
          />

          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>

        <div className="form-group">
          <div className="label">Github Username</div>
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={onChange}
          />

          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>

        <div className="form-group">
          <div className="label">About me</div>
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            style={{
              height: 120,
              fontFamily: "Montserrat, sans-serif",
            }}
            onChange={onChange}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>

          <span>(Optional)</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />

              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />

              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />

              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />

              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-reddit fa-2x" />

              <input
                type="text"
                placeholder="Reddit URL"
                name="reddit"
                value={reddit}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />

              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>
          </>
        )}

        <input
          type="submit"
          className="btn btn-primary my-1 "
          style={{ minWidth: 200 }}
        />

        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  uploadProfile,
})(ProfileForm);
