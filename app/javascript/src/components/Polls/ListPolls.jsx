import React from "react";
import Table from "./Table";

const ListPolls = ({ data, showPoll, updatePoll, destroyPoll }) => {
  return (
    <Table
      data={data}
      showPoll={showPoll}
      updatePoll={updatePoll}
      destroyPoll={destroyPoll}
    />
  );
};

export default ListPolls;
