import axios from "axios";

const list = () => axios.get("/polls");

const show = slug => axios.get(`/polls/${slug}`);

const create = payload => axios.post("/polls/", payload);

const update = ({ slug, payload }) => axios.put(`/polls/${slug}`, payload);

const destroy = id => axios.delete(`/polls/${id}`);

const pollsApi = {
  list,
  show,
  create,
  update,
  destroy,
};

export default pollsApi;
