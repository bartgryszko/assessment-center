"use strict";

var React = require('react'),
    injectTapEventPlugin = require("react-tap-event-plugin"),
    AssessmentCenterApp = require('./components/AssessmentCenterApp'),
    AssessmentWebApiUtils = require('./utils/AssessmentWebApiUtils'),
    Router = require('react-router'),
    AppNav = require('./components/AppNav'),
    UserLoginStatus = require('./components/UserLoginSection'),
    RouteHandler = Router.RouteHandler,
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    MenuItem = require('material-ui').MenuItem,
    IconButton = require('material-ui').IconButton;

injectTapEventPlugin();

var App = React.createClass({
    render: function () {
        var header = <div className="logo">Assessment Center</div>;
        return (
            <div>
                <AppNav ref="mainNav" />
                <header className="row" id="top-head">
                    <div className="col-xs-12">
                        <IconButton
                            onClick={this._toggleNav}
                            iconClassName="icon-menu" />
                        <UserLoginStatus />
                    </div>
                </header>
                <div className="row">
                    <div className="col-xs-12">
                        <RouteHandler />
                    </div>
                </div>
            </div>
        )
    },

    _toggleNav: function () {
        this.refs.mainNav.toggle();
    }
});

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="assessment" handler={AssessmentCenterApp} />
    </Route>
);

AssessmentWebApiUtils.loadInitialData();

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.getElementById('app'));
});