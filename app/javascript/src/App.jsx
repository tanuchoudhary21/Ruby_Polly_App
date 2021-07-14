import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Container from "./components/Container";
import Dashboard from "./components/Dashboard";
import CreatePoll from "./components/Polls/CreatePoll";
import ShowPoll from "./components/Polls/ShowPoll";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Container} />
        <Route exact path="/polls/create" component={CreatePoll} />
        <Route exact path="/polls/:slug/show" component={ShowPoll} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
