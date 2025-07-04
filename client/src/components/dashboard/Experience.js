import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deleteExperience } from "../../actions/profile";
import formatDate from "../../utils/formatDate";
import { Trash2 } from "lucide-react";
import { Trash } from "../../icons/Trash";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>

      <td className="hide-sm">{exp.title}</td>

      <td>
        {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : "Now"}
      </td>

      <td>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => deleteExperience(exp._id)}
        >
          <Trash />
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="mt-2 mb-1">Experience Credentials</h2>

      <table className="table" id="educationTable">
        <thead>
          <tr>
            <th>Company</th>

            <th className="hide-sm">Title</th>

            <th>Years</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
