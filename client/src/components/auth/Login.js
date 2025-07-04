import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  // Redirect Logged in User
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="container">
      <div className="large text-primary">Sign In</div>

      <p className="lead">
        <i className="fas fa-user-ninja"></i> Sign Into Your Account
      </p>

      <form
        className="form"
        onSubmit={handleOnSubmit}
        style={{ marginTop: 40 }}
      >
        <div className="form-group">
          <div className="label">
            Email Address <span className="text-danger">*</span>
          </div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="form-group">
          <div className="label">
            Password <span className="text-danger">*</span>
          </div>
          <input
            type="password"
            placeholder="Password"
            minLength="6"
            name="password"
            value={password}
            onChange={handleOnChange}
            required
          />
        </div>

        <input
          type="submit"
          value="Login"
          style={{ minWidth: 200 }}
          className="btn btn-primary"
        />
      </form>

      <p className="my-1">
        Don't Have an Account?{" "}
        <Link style={{ fontWeight: 600 }} to="/register">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
