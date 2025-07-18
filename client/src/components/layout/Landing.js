import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Book</h1>

          <p className="lead">
            Create developer profile/portfolio, share posts and interact with
            other developers
          </p>

          <div className="buttons">
            <Link
              to="/register"
              style={{ minWidth: 200 }}
              className="btn btn-primary"
            >
              Sign Up
            </Link>

            <Link
              to="/login"
              style={{ minWidth: 200 }}
              className="btn btn-light"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
