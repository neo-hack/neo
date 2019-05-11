import * as React from "react";
import SubRoutes from "./SubRoutes";
import { createHashHistory } from "history";
import { Switch, Router } from "react-router-dom";
import { routesConfig } from "./config";

const RouterViewer = () => {
  return (
    <Router history={createHashHistory()}>
      <Switch>
        {routesConfig.map((route, i) => {
          return SubRoutes(route, i);
        })}
      </Switch>
    </Router>
  );
};

export default RouterViewer;
