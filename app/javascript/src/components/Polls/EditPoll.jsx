import React, { useState, useEffect } from "react";
import pollsApi from "apis/polls";
import usersApi from "apis/users";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import { useParams } from "react-router-dom";

import PollForm from "./Form/PollForm";

const EditPoll = ({ history }) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();
  const [option_1, setOption_1] = useState("");
  const [option_2, setOption_2] = useState("");
  const [option_3, setOption_3] = useState("");
  const [option_4, setOption_4] = useState("");
  const [option_1_id, setOption_1_id] = useState(null);
  const [option_2_id, setOption_2_id] = useState(null);
  const [option_3_id, setOption_3_id] = useState(null);
  const [option_4_id, setOption_4_id] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await pollsApi.update({
        slug,
        payload: {
          poll: {
            title,
            options_attributes: [
              { option: option_1, id: option_1_id },
              { option: option_2, id: option_2_id },
              { option: option_3, id: option_3_id },
              { option: option_4, id: option_4_id },
            ],
          },
        },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await usersApi.list();
      setUsers(response.data.users);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(slug);
      logger.info("Edit Poll", response.data);
      setUserId(response.data.poll.user_id);
      setTitle(response.data.poll.title);
      setOption_1(response.data.options[0].option);
      setOption_2(response.data.options[1].option);
      setOption_3(response.data.options[2].option);
      setOption_4(response.data.options[3].option);
      setOption_1_id(response.data.options[0].id);
      setOption_2_id(response.data.options[1].id);
      setOption_3_id(response.data.options[2].id);
      setOption_4_id(response.data.options[3].id);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const loadData = async () => {
    await fetchPollDetails();
    await fetchUserDetails();
  };

  useEffect(() => {
    loadData();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <PollForm
        type="update"
        title={title}
        setOption_1={setOption_1}
        setOption_2={setOption_2}
        setOption_3={setOption_3}
        setOption_4={setOption_4}
        option_1={option_1}
        option_2={option_2}
        option_3={option_3}
        option_4={option_4}
        setTitle={setTitle}
        setUserId={setUserId}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default EditPoll;
