import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import UserContext from "../service/user";
import App from "../App";
import Login from "../login";

interface AppState {
  isLogged: boolean;
}

class AppRouter extends React.Component<any, AppState> {
  static contextType = UserContext;
  context!: React.ContextType<typeof UserContext>;
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      isLogged: false,
    };
  }
  async componentDidMount() {
    const auth = await this.context.authenticateToken();
    let logged = false;
    console.log(auth);
    if (auth) {
      await this.context.initialize();
      logged = true;
    }
    this.setState({
      isLogged: logged,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route path="/user" key="user" component={App} />
            <Route path="/" key="login" component={Login} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default AppRouter;
