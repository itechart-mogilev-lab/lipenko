import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import { SnackbarProvider } from "notistack";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        {value === 0 && (
          <TabContainer>
            <SnackbarProvider maxSnack={3}>
              <SignIn />
            </SnackbarProvider>
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <SnackbarProvider maxSnack={3}>
              <SignUp />
            </SnackbarProvider>
          </TabContainer>
        )}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

export default withStyles(styles)(Auth);
