import React, { Component } from "react"
import SearchBar from "../SearchBar"
import FormTile from "../FormTile"

let forms = [
  {
    "_id": "58a6e345702e7410f4a33ed6",
    "title": "title 1"
  },
  {
    "_id": "58a6e349702e7410f4a33eda",
    "title": "title 2"
  },
  {
    "_id": "58a6e34c702e7410f4a33ede",
    "title": "title 3"
  },
  {
    "_id": "58a6e353702e7410f4a33ee2",
    "title": "The best title"
  }
];
export default class Dashboard extends Component {
  render() {
    const tiles = forms.map((el) => {
      return <FormTile key={el._id} title={el.title} />
    })
    return (
      <div>
        <SearchBar />
        {tiles}
      </div>
    )
  }
}