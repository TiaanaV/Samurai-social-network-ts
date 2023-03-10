import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { actions } from "../../redux/dialogsReducer";
import { AppStateType } from "../../redux/redux-store";
import Dialogs from "./Dialogs";

let mapStateToProps = (state:AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const DialogsContainer = compose(
  connect(mapStateToProps, {...actions}),
  withAuthRedirect
)(Dialogs);

export default DialogsContainer;
