import React from "react";
import Table from "./Table";

const ListPolls = ({ data, showPoll }) => {
  return <Table data={data} showPoll={showPoll} />;
};

export default ListPolls;
