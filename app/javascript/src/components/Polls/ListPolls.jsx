import React from "react";
import Table from "./Table";

const ListPolls = ({ data, showPoll, updatePoll }) => {
  return <Table data={data} showPoll={showPoll} updatePoll={updatePoll} />;
};

export default ListPolls;
