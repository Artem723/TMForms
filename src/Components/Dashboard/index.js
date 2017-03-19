import React, { Component } from "react"
import SearchBar from "../SearchBar"
import FormTile from "../FormTile"
import "./Dashboard.css"
import { Row, Col } from "react-bootstrap"
import ErrorAlert from "../ErrorAlert"
// const forms = [
//   {
//     "_id": "58a6e345702e7410f4a33ed6",
//     "title": "Hello"
//   },
//   {
//     "_id": "58a6e349702e7410f4a33eda",
//     "title": "Hello2"
//   },
//   {
//     "_id": "58a6e34c702e7410f4a33ede",
//     "title": "Hello3"
//   },
//   {
//     "_id": "58a6e353702e7410f4a33ee2",
//     "title": "The best title"
//   }
// ]

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: [],
      searchText: "",
      hasResponseObtained: false,
      showErrorAlert: false
    }
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
    this.onNewFormHandler = this.onNewFormHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onHideErrorAlert = this.onHideErrorAlert.bind(this);
  }
  componentDidMount() {
    const headers = {
      "Authorization": `Bearer ${this.props.token}`
    }
    const option = {
      method: "GET",
      headers
    }
    let status;

    fetch("/api/forms", option)
      .then((response) => {
        status = response.status;
        if (status === 401) this.props.onLogOutHandler();
        if (status !== 200) {
          this.setState({
            hasResponseObtained: true,
            showErrorAlert: true
          })
        }
        return response.json();
      })
      .then((body) => {
        const forms = body;
        this.setState({
          forms: forms,
          hasResponseObtained: true,
          showErrorAlert: false
        });
      })
      .catch((err) => {
        throw err;
      })
  }

  onChangeSearchText(e) {
    this.setState({
      searchText: e.target.value
    })
  }
  onNewFormHandler() {
    this.props.router.replace("/forms/new-form/edit");
  }


  onDeleteHandler(e, formId) {
    const headers = {
      "Authorization": `Bearer ${this.props.token}`
    }
    const option = {
      method: "DELETE",
      headers
    }
    let status;
    fetch(`/api/forms/${formId}`, option)
      .then((response) => {
        status = response.status;
        if (status === 200) {
          this.setState((prevState) => {
            const newForm = prevState.forms.filter((el) => {
              return el._id !== formId;
            })
            return {
              forms: newForm
            };
          });
        }
        else if (status === 500)
          this.setState({
            showErrorAlert: true
          });
        else if (status === 404)
          this.props.router.replace("/NOT-FOUND");
        else if (status === 403) {
          alert("Permission denied");
          this.props.onLogOutHandler();
        }
        else if (status === 401) {
          alert("Wrong token");
          this.props.onLogOutHandler();
        }

      })
      .catch((err) => {
        throw err;
      })
  }

  onHideErrorAlert() {
    this.setState({
      showErrorAlert: false
    })
  }
  render() {

    const { searchText, forms, hasResponseObtained, showErrorAlert } = this.state;
    const re = new RegExp(searchText)
    const formList = forms.filter((el) => {
      return re.test(el.title);
    });
    const tiles = formList.map((el, ind) => {
      return (
        <Col key={el._id} lg={2} md={3} sm={4} >
          <FormTile title={el.title}
            formID={el._id}
            onDeleteHandler={(e) => this.onDeleteHandler(e, el._id)} />
        </Col>
      )
    })

    const tilesRow = (
      <Row>
        {tiles}
      </Row>
    )
    let spinner = null, message = null;
    if (hasResponseObtained) {
      message = forms.length ? null : <div>Your dashboard is empty. Click on "NEW" button to create new form</div>
    } else {
      spinner = hasResponseObtained ? null : <div className="Spinner"></div>;
    }
    const errAlert = showErrorAlert ? <ErrorAlert onHide={this.onHideErrorAlert} /> : null;
    return (
      <div className="Dashboard">
        <SearchBar searchText={this.state.searchText} onChange={this.onChangeSearchText} onNewFormHandler={this.onNewFormHandler} />
        {spinner}
        <div className="animated">
          {errAlert}
          {message}
          {tilesRow}
        </div>
      </div>
    )
  }
}
