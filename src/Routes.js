import React from "react"
import {
    Router, 
    Route, 
    IndexRoute, 
    browserHistory 
} from "react-router"
import App from "./Components/App"
import Dashboard from "./Components/Dashboard"
import Editor from "./Components/Editor"
import Results from "./Components/Results"
import FormViewer from "./Components/FormViewer"
import LogIn from "./Components/LogIn"
import SignUp from "./Components/SignUp"
import NoMatch from "./Components/NoMatch"

let routes = (
    <Router history={browserHistory} >
        <Route path="/" component={App} >
            <IndexRoute component={Dashboard}/>
            <Route path="/forms/:id/edit" component={Editor}/>
            <Route path="/forms/:id/results" component={Results}/>
            <Route path="/forms/:id" component={FormViewer}/>
            <Route path="/logIn" component={LogIn}/>
            <Route path="/SignUp" component={SignUp}/>
            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
);
export default  routes;