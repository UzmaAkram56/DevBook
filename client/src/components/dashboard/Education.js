import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deleteEducation } from "../../actions/profile";
import formatDate from "../../utils/formatDate";
import { Trash } from "../../icons/Trash";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>

      <td className="hide-sm">{edu.degree}</td>

      <td className="hide-sm">{edu.fieldofstudy}</td>

      <td>
        {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : "Now"}
      </td>

      <td>
        <div
          onClick={() => deleteEducation(edu._id)}
          style={{ cursor: "pointer" }}
        >
          <Trash />
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="mt-2 mb-1">Education Credentials</h2>

      <table className="table" id="educationTable">
        <thead>
          <tr>
            <th>School</th>

            <th className="hide-sm">Degree</th>

            <th className="hide-sm">Field Of Study</th>

            <th>Years</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
