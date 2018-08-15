import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "./../../actions/profileAction";
import Spinner from "../common/Spinner";
class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContant;
    if (profile === null || loading) {
      dashboardContant = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContant = <h1>Working</h1>;
      } else {
        dashboardContant = (
          <div className="row">
            <div className="col-md-6">
              <p className="lead text-muted"> Welcome {user.name}</p>
              <p className>
                You have not yet setup a profile , please add some info
              </p>
            </div>
            <div className="col-md-6">
              <Link to="/create-profile" className="btn btn-lg btn-info">
                Create Profile
              </Link>
            </div>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="display-4">{dashboardContant}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
