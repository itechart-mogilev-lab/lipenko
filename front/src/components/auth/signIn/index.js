import React, { Component } from "react";
import { Formik } from "formik";
import { string, object } from "yup";
import { withStyles } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import VerificationCodeField from "../VerificationCodeField";
import GoogleAuthButton from "./GoogleAuthButton";

const validationSchema = object().shape({
  username: string()
    .required("Username is required")
    .min(2, "Username must contain atleast 2 characters")
    .max(9, "Username must contain less then 9 characters")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9-_.]{1,9}$/,
      "The username can contain letters, numbers, -, ., _"
    ),
  password: string()
    .required("Enter your password")
    .min(5, "Password must contain atleast 5 characters")
    .max(18, "Password must contain less then 18 characters")
    .matches(/^[\S]{5,18}$/, "The password cannot contain spaces")
});

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verificationCode: "",
      selectedForm: "user"
    };
  }

  handleVerificationCodeChange = verificationCode => {
    this.setState({ verificationCode });
  };

  handleNewVerificationCode = () => {
    if (this.state.selectedForm === "user") {
      this.props.userNewVerificationCode(this.props.username);
    } else {
      this.props.executorNewVerificationCode(this.props.username);
    }
  };

  handleChangeRadioButton = event => {
    this.setState({ selectedForm: event.target.value });
  };

  handleConfirm = () => {
    this.props.confirmUser({
      username: this.props.username,
      verificationCode: this.state.verificationCode
    });
  };

  render() {
    return (
      <>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setFieldError }) => {
            try {
              if (this.state.selectedForm === "user") {
                this.props.signInUser(values.username, values.password);
              } else if (this.state.selectedForm === "executor") {
                this.props.signInExecutor(values.username, values.password);
              }
            } catch (errors) {
              console.log(errors);
              errors.forEach(err => {
                setFieldError(err.field, err.error);
              });
            }
          }}
          component={this.form}
        />
      </>
    );
  }

  form = ({ handleSubmit, handleChange, handleBlur, values, errors }) => {
    const { classes } = this.props;
    return (
      <form className={classes.container} onSubmit={handleSubmit}>
        {!this.props.isSended && (
          <>
            <RadioGroup
              row
              aria-label="Gender"
              name="type"
              className={classes.group}
              value={this.state.selectedForm}
              onChange={this.handleChangeRadioButton}
            >
              <FormControlLabel
                value="user"
                control={<Radio />}
                labelPlacement="end"
                label="User"
              />
              <FormControlLabel
                value="executor"
                control={<Radio />}
                labelPlacement="end"
                label="Executor"
              />
            </RadioGroup>
            <TextField
              label="Username"
              autoComplete="username"
              className={classes.textField}
              disabled={this.props.isSended}
              margin="normal"
              variant="outlined"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              helperText={errors.username}
              error={Boolean(errors.username)}
            />
            <TextField
              label="Password"
              autoComplete="current-password"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              disabled={this.props.isSended}
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              helperText={errors.password}
              error={Boolean(errors.password)}
            />
          </>
        )}
        <div className={classes.VerifyAndConfirmContainer}>
          {this.props.isSended && (
            <>
              <VerificationCodeField
                value={this.state.verificationCode}
                handleChange={this.handleVerificationCodeChange}
              />
              <Button
                onClick={this.handleConfirm}
                key="submit"
                variant="contained"
                color="primary"
                size="large"
                className={classes.confirmButton}
              >
                CONFIRM
              </Button>
              <Button
                size="small"
                onClick={this.handleNewVerificationCode}
                className={classes.margin}
              >
                Отправить ещё раз
              </Button>
            </>
          )}
          {!this.props.isSended && (
            <>
              <Button
                onClick={handleSubmit}
                type="submit"
                key="submit"
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
              >
                SIGN IN
              </Button>
              {this.state.selectedForm === "user" ? (
                <GoogleAuthButton
                  authSocial={this.props.authSocial}
                  returnError={this.props.authSocial}
                />
              ) : null}
            </>
          )}
        </div>
      </form>
    );
  };
}

const styles = theme => ({
  margin: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap"
  },
  group: {
    display: "flex"
  },
  button: {
    margin: theme.spacing.unit
  },
  confirmButton: {
    margin: theme.spacing.unit,
    backgroundColor: teal[500],
    "&:hover": {
      backgroundColor: teal[300]
    }
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250
  },
  VerifyAndConfirmContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  close: {
    padding: theme.spacing.unit / 2
  }
});

export default withStyles(styles)(SignIn);
