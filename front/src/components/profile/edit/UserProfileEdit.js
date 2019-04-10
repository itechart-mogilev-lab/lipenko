import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import { Formik } from "formik";
import { string, object } from "yup";
import { connect } from "react-redux";
import { editUser } from '../../../actions/auth.actions'

const validationEditProfile = object().shape({
  username: string()
    .required("Username is required")
    .min(2, "Username must contain atleast 2 characters")
    .max(9, "Username must contain less then 9 characters")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9-_.]{1,9}$/,
      "The username can contain letters, numbers, -, ., _"
    ),
  email: string()
    .required("Email is required")
    .min(5, "Email must contain atleast 5 characters")
    .max(20, "Email must contain less then 20 characters")
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "The email is incorrect"
    ),
  phoneNumber: string()
    .required("Phone number is required")
    .min(13, "Phone number is incorrect, example: +375296667788")
    .max(13, "Phone number is incorrect, example: +375296667788")
    .matches(
      /\+375(29|33|44|25)\d{7}$/,
      "Phone number is incorrect, example: +375296667788"
    ),
  adress: string()
    .required("Adress is required")
    .min(6, "Type your city and street atleast")
    .max(26, "Adress is too long")
});

const validationNewPassword = object().shape({
  oldPassword: string()
    .required("Enter your password")
    .min(5, "Password must contain atleast 5 characters")
    .max(18, "Password must contain less then 18 characters")
    .matches(/^[\S]{5,18}$/, "The password cannot contain spaces"),
  newPassword: string()
    .required("Enter your password")
    .min(5, "Password must contain atleast 5 characters")
    .max(18, "Password must contain less then 18 characters")
    .matches(/^[\S]{5,18}$/, "The password cannot contain spaces"),
  confirmNewPassword: string()
    .required("Enter your password again")
    .test("passwords-match", "Passwords must match ya fool", function(value) {
      return this.parent.password === value;
    })
});

class UserProfileEdit extends Component {
  render() {
    const { classes, username, email, phoneNumber, adress } = this.props;
    return (
      <div className={classes.root}>
        <Formik
          initialValues={{ username, email, phoneNumber, adress }}
          validationSchema={validationEditProfile}
          onSubmit={({username, email, phoneNumber, adress}, { setFieldError }) => {
            try {
              this.props.editUser({username, email, phoneNumber, adress  });
            } catch (errors) {
              errors.forEach(err => {
                setFieldError(err.field, err.error);
              });
            }
          }}
          component={this.EditProfileForm}
        />
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationNewPassword}
          onSubmit={(values, { setFieldError }) => {
            try {
              this.props.newPasswordUser(this.props.username, values.password);
            } catch (errors) {
              errors.forEach(err => {
                setFieldError(err.field, err.error);
              });
            }
          }}
          component={this.NewPasswordForm}
        />
      </div>
    );
  }

  EditProfileForm = ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors
  }) => {
    const { classes } = this.props;
    return (
      <form className={classes.container} onSubmit={handleSubmit} noValidate>
        <TextField
          label="Username"
          autoComplete="username"
          className={classes.textField}
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
          label="Email"
          autoComplete="email"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          helperText={errors.email}
          error={Boolean(errors.email)}
        />
        <TextField
          label="Phone number"
          autoComplete="tel"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name="phoneNumber"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.phoneNumber}
          helperText={errors.phoneNumber}
          error={Boolean(errors.phoneNumber)}
        />
        <TextField
          label="Your adress"
          autoComplete="tel"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name="adress"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.adress}
          helperText={errors.adress}
          error={Boolean(errors.adress)}
        />
        <Button
          key="submit"
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          CONFIRM
        </Button>
      </form>
    );
  };

  NewPasswordForm = ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors
  }) => {
    const { classes } = this.props;
    return (
      <form className={classes.container} onSubmit={handleSubmit} noValidate>
        <TextField
          label="Old password"
          autoComplete="new-password"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          type="password"
          name="oldPassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.oldPassword}
          helperText={errors.oldPassword}
          error={Boolean(errors.oldPassword)}
        />
        <TextField
          label="New password"
          autoComplete="new-password"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          type="password"
          name="newPassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.newPassword}
          helperText={errors.newPassword}
          error={Boolean(errors.newPassword)}
        />
        <TextField
          label="Confirm new password"
          autoComplete="new-password"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          type="password"
          name="confirmNewPassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmNewPassword}
          helperText={errors.confirmNewPassword}
          error={Boolean(errors.confirmNewPassword)}
        />
        <Button
          key="submit"
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          CHANGE PASSWORD
        </Button>
      </form>
    );
  };
}

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 20,
    backgroundColor: "whitesmoke",
    boxShadow: "0 1px 7px 1px rgba(0, 0, 0, .25)",
    padding: 25,
    fontSize: "1.2rem"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    flexGrow: 1
  }
});

const mapStateToProps = state => ({
  role: state.profile.role,
  username: state.profile.data.username,
  adress: state.profile.data.adress,
  email: state.profile.data.email,
  phoneNumber: state.profile.data.phoneNumber
});

export default connect(mapStateToProps, {editUser})(withStyles(styles)(UserProfileEdit));
