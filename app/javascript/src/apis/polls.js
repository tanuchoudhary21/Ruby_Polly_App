import axios from "axios";

const list = () => axios.get("/polls");

const pollsapi = {
  list,
};

export default pollsapi;
