import React, { Component } from "react"
import SearchBar from "../SearchBar"
import FormTile from "../FormTile"
import "./Dashboard.css"
const forms = [
  {
    "_id": "58a6e345702e7410f4a33ed6",
    "title": "Hello"
  },
  {
    "_id": "58a6e349702e7410f4a33eda",
    "title": "Hello2"
  },
  {
    "_id": "58a6e34c702e7410f4a33ede",
    "title": "Hello3"
  },
  {
    "_id": "58a6e353702e7410f4a33ee2",
    "title": "The best title"
  }
]

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: [],
      searchText: "",
      hasResponseObtained: false
    }
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
    this.onNewFormHandler = this.onNewFormHandler.bind(this);
    this.onGoToFormHandler = this.onGoToFormHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
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
        return response.json();
      })
      .then((body) => {
        if (status === 401) this.props.routes.replace("/login");
        if (status !== 200) {
          const message = body && body.message;
          this.setState({
            hasResponseObtained: true
          })
          alert("Something goes wrong. Status " + status + ". Message: " + message);
        } else {
          let forms = body;
          this.setState({
            forms: forms,
            hasResponseObtained: true
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  onChangeSearchText(e) {
    console.log(e.target.value)
    this.setState({
      searchText: e.target.value
    })
  }
  onNewFormHandler() {
    this.props.router.replace("/forms/new-form/edit");
  }

  onGoToFormHandler(formId) {
    this.props.router.replace(`/forms/${formId}/edit`);
  }
  onDeleteHandler(e, formId) {
    e.stopPropagation();
    const ans = confirm("Do you want to delete form?");
    if (ans) {
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
            this.setState((prevState)=>{
              const newForm = prevState.forms.filter((el)=>{
                return el._id !== formId;
              })
              return {
                forms: newForm
              };              
            });
          }            
          else if (status === 500)
            alert("internal server Error");
          else if (status === 404)
            alert("Form not found!");
          else if (status === 403)
            alert("Permission denied");
          else if (status === 401) {
            alert("Wrong token");
            this.props.onLogOutHandler();
          }
            
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  render() {

    const { searchText, forms, hasResponseObtained } = this.state;
    const re = new RegExp(searchText)
    const formList = forms.filter((el) => {
      return re.test(el.title);
    });

    const tiles = formList.map((el) => {
      return <FormTile key={el._id} title={el.title}
        onGoToFormHAndler={() => this.onGoToFormHandler(el._id)}
        onDeleteHandler={(e) => this.onDeleteHandler(e, el._id)} />
    })
    let spinner = null, message = null;
    if (hasResponseObtained) {
      message = forms.length ? null : <div>Your dashboard is empty. Click on "NEW" button to create new form</div>
    } else {
      spinner = hasResponseObtained ? null : <div className="Spinner">Loading</div>;
    }
    return (
      <div className="Dashboard">
        <SearchBar searchText={this.state.searchText} onChange={this.onChangeSearchText} onNewFormHandler={this.onNewFormHandler} />
        {spinner}
        {message}
        {tiles}
      </div>
    )
  }
}
