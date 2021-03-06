import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Logger from "js-logger";

const TableRow = ({ data, showPoll, updatePoll, destroyPoll }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map(rowData => (
        <tr key={rowData.id}>
          <td
            className="px-6 py-4 text-sm font-medium
            leading-5 text-bb-gray whitespace-no-wrap"
          >
            {rowData.title}
          </td>
          <td className="px-6 py-4 text-sm font-medium leading-5 text-right cursor-pointer">
            <Link
              to={`/polls/${rowData?.slug}/show`}
              className="text-bb-purple"
            >
              Show
            </Link>
          </td>
          <td
            className="px-6 py-4 text-sm font-medium
            leading-5 text-right cursor-pointer"
          >
            <Link
              to={`/polls/${rowData?.slug}/edit`}
              className="text-indigo-600 hover:text-indigo-900"
            >
              Edit
            </Link>
          </td>
          <td
            className="px-6 py-4 text-sm font-medium
            leading-5 text-right cursor-pointer"
          >
            <a
              className=" hover:text-bb-red"
              onClick={() => destroyPoll(rowData.slug)}
            >
              Delete
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
  showPoll: PropTypes.func,
  destroyPoll: PropTypes.func,
  updatePoll: PropTypes.func,
};

export default TableRow;
