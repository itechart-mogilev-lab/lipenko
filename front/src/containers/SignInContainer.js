import { connect } from "react-redux";
import SignIn from "../components/auth/SignIn/"
import { signInUser, signInExecutor } from "../actions/userActions";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return {
    signInUser: user => dispatch(signInUser(user)),
    signInExecutor: executor => dispatch(signInExecutor(executor))
  };
};

const SignInContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignIn);

export default SignInContainer;
