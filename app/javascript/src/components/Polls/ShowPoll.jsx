import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFromLocalStorage } from "helpers/storage";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
// import votesApi from "apis/votes";
import Button from "components/Button";

const ShowPoll = () => {
  const { slug } = useParams();
  //   const { id } = useParams();
  const userId = getFromLocalStorage("authUserId");
  const [pollDetails, setPollDetails] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [option_1, setOption_1] = useState("");
  const [option_2, setOption_2] = useState("");
  const [option_3, setOption_3] = useState("");
  const [option_4, setOption_4] = useState("");
  const [voteOption, setvoteOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState([]);

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(slug);
      logger.info("Data", response.data);
      const userVotes = response.data.votes.find(v => v.user_id == userId);
      setPollDetails(response.data.poll);
      setOption_1(response.data.options[0]);
      setOption_2(response.data.options[1]);
      setOption_3(response.data.options[2]);
      setOption_4(response.data.options[3]);
      setVotes(response.data.votes);
      setvoteOption(userVotes ? userVotes.option_id : userVotes);
      setVoted(Boolean(userVotes));
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await votesApi.create({
        vote: { poll_id: id, option_id: voteOption },
      });
      fetchPollDetails();
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const getVotePercent = optionId => {
    if (!votes.length) {
      return "0";
    }

    const filteredVotes = votes.filter(v => v.option_id == optionId);
    const votePercent = (filteredVotes.length / votes.length) * 100;
    if (votePercent % 1) return votePercent.toFixed(2);
    else return votePercent;
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <h1 className="pb-3 pl-3 mt-3 mb-3 text-2xl leading-5 text-bb-gray border-b border-bb-gray">
        <span className="text-blue-500">Poll Title :</span> {pollDetails?.title}
      </h1>

      <h1 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray">
        <div className="cursor-pointer hover:text-blue-500">
          <h1>
            <span
              className={`p-2 w-3/4 inline-block rounded cursor-pointer hover:text-blue-500 ${
                option_1?.id === voteOption ? "text-blue-500" : ""
              } 
                ${voted ? "pointer-events-none" : ""}`}
              onClick={() => setvoteOption(option_1?.id)}
            >
              {" "}
              {option_1?.option}{" "}
            </span>
            {voted ? (
              <span className="w-1/4 flex-end pl-4">
                {getVotePercent(option_1?.id)}%
              </span>
            ) : (
              ""
            )}
          </h1>
        </div>
      </h1>

      <h1 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray">
        <div className="cursor-pointer hover:text-blue-500">
          <h1>
            <span
              className={`p-2 w-3/4 inline-block rounded cursor-pointer hover:text-blue-500 ${
                option_2?.id === voteOption ? "text-blue-500" : ""
              } 
                ${voted ? "pointer-events-none" : ""}`}
              onClick={() => setvoteOption(option_2?.id)}
            >
              {" "}
              {option_2?.option}{" "}
            </span>
            {voted ? (
              <span className="w-1/4 flex-end pl-4">
                {getVotePercent(option_2?.id)}%
              </span>
            ) : (
              ""
            )}
          </h1>
        </div>
      </h1>

      <h1 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray">
        <div className="cursor-pointer hover:text-blue-500">
          <h1>
            <span
              className={`p-2 w-3/4 inline-block rounded cursor-pointer hover:text-blue-500 ${
                option_3?.id === voteOption ? "text-blue-500" : ""
              } 
                ${voted ? "pointer-events-none" : ""}`}
              onClick={() => setvoteOption(option_3?.id)}
            >
              {" "}
              {option_3?.option}{" "}
            </span>
            {voted ? (
              <span className="w-1/4 flex-end pl-4">
                {getVotePercent(option_3?.id)}%
              </span>
            ) : (
              ""
            )}
          </h1>
        </div>
      </h1>

      <h1 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray">
        <div className="cursor-pointer hover:text-blue-500">
          <h1>
            <span
              className={`p-2 w-3/4 inline-block rounded cursor-pointer hover:text-blue-500 ${
                option_4?.id === voteOption ? "text-blue-500" : ""
              } 
                ${voted ? "pointer-events-none" : ""}`}
              onClick={() => setvoteOption(option_4?.id)}
            >
              {" "}
              {option_4?.option}{" "}
            </span>
            {voted ? (
              <span className="w-1/4 flex-end pl-4">
                {getVotePercent(option_4?.id)}%
              </span>
            ) : (
              ""
            )}
          </h1>
        </div>
      </h1>

      <div className=" w-3/4 inline-block justify-center px-6">
        {voted ? (
          <p className="py-2 font-medium animate-pulse">
            Voted, Congratulations! ✅
          </p>
        ) : (
          <Button
            loading={loading}
            onClick={handleSubmit}
            buttonText="Submit your vote"
          />
        )}
      </div>
    </Container>
  );
};

export default ShowPoll;
