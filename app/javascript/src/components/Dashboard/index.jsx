import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";

import Container from "components/Container";
import ListPolls from "components/Polls/ListPolls";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";

const Dashboard = ({ history }) => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPolls = async () => {
    try {
      const response = await pollsApi.list();
      setPolls(response.data.polls);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const destroyPoll = async slug => {
    try {
      await pollsApi.destroy(slug);
      await fetchTasks();
    } catch (error) {
      logger.error(error);
    }
  };

  const showPoll = slug => {
    history.push(`/polls/${slug}/show`);
  };

  const updatePoll = slug => {
    history.push(`/polls/${slug}/edit`);
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (!either(isNil, isEmpty)(polls)) {
    return (
      <Container>
        <ListPolls
          data={polls}
          showPoll={showPoll}
          updatePoll={updatePoll}
          destroyPoll={destroyPoll}
        />
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-xl leading-5 text-center">
        You have no tasks assigned 😔
      </h1>
    </Container>
  );
};

export default Dashboard;
