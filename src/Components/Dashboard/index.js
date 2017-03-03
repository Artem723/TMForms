import React, { Component } from "react"
import SearchBar from "../SearchBar"
import FormTile from "../FormTile"
import "./Dashboard.css"


export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: [],
      searchText: ""
    }
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
  }
  componentDidMount() {
    //TODO fetch data from server
    this.setState({
      forms: [
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
    })
  }
  onChangeSearchText(e) {
    console.log(e.target.value)
    this.setState({
      searchText: e.target.value
    })
  }
  render() {
    let renderForms;
    const {searchText, forms} = this.state;
    if (!searchText) {
      renderForms = forms;
    } else {
      const re = new RegExp(searchText)
      renderForms = forms.filter((el) => {
        return re.test(el.title);
      });
    }
    const tiles = renderForms.map((el) => {
      return <FormTile key={el._id} title={el.title} />
    })
    return (
      <div className="Dashboard">
        <SearchBar searchText={this.state.searchText} onChange={this.onChangeSearchText} />
        {tiles}
      </div>
    )
  }
}