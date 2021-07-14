import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { initializeLogger } from "common/logger";
import { setAuthHeaders } from "apis/axios";
import Container from "./components/Container";
import Dashboard from "./components/Dashboard";
import CreatePoll from "./components/Polls/CreatePoll";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Container} />
        <Route exact path="/polls/create" component={CreatePoll} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
