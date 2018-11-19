import { connect } from "react-redux";
import ProfileScreen from "./components";
import profileReducer from "./reducer";

export default connect(
  state => ({
      name:state.profile.name
  }),
  dispatch => ({
    onUpdateName: () => {
      dispatch(profileReducer.updateName());
    },
  })
)(ProfileScreen);