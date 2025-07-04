import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { company, title, location, from, to, current, description } = formData;

  const handleOnChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleCheckboxOnChange = (e) => {
    setFormData({ ...formData, current: !current });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, navigate);
  };

  return (
    <section className="container">
      <div className="large text-primary">Add An Experience</div>

      <p className="lead">
        <i className="fas fa-code"></i> Add any developer/programming positions
        that you have had in the past
      </p>

      <small>
        <span className="text-danger">*</span> = required field
      </small>

      <form className="form" onSubmit={handleOnSubmit}>
        <div className="form-group">
          <div className="label">
            Job Title <span className="text-danger">*</span>
          </div>
          <input
            type="text"
            placeholder="Job Title"
            name="title"
            value={title}
            onChange={handleOnChange}
          />
        </div>

        <div className="form-group">
          <div className="label">
            Company <span className="text-danger">*</span>
          </div>
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={handleOnChange}
          />
        </div>

        <div className="form-group">
          <div className="label">Location</div>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={handleOnChange}
            name="location"
          />
        </div>

        <div className="form-group">
          <div className="label">
            From Date <span className="text-danger">*</span>
          </div>
          <input
            type="date"
            name="from"
            value={from}
            onChange={handleOnChange}
          />
        </div>

        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              checked={current}
              onChange={handleCheckboxOnChange}
            />{" "}
            Current Job
          </p>
        </div>

        <div className="form-group">
          <div className="label">To Date</div>
          <input
            type="date"
            name="to"
            value={to}
            onChange={handleOnChange}
            disabled={current}
          />
        </div>

        <div className="form-group">
          <div className="label">Job Description</div>
          <textarea
            name="description"
            style={{ height: 120 }}
            placeholder="Job Description"
            value={description}
            onChange={handleOnChange}
          />
        </div>

        <input
          type="submit"
          style={{ minWidth: 200 }}
          className="btn btn-primary my-1"
        />

        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
