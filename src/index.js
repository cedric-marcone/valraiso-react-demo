import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './index.css'

const Card = ({ name, avatar, motto, remove }) => (
  <div className="person">
    <img src={avatar} alt={name}/>
    <div>
      <h1>{name}</h1>
      <h2>{motto}</h2>
    </div>
    <button onClick={remove}/>
  </div>
)

class App extends Component {
  state = {
    persons: []
  }
  componentDidMount() {
    fetch('/data.json')
      .then(data => data.json())
      .then(persons => {
        this.setState({ persons })
      })
  }
  delete = (id) => () => {
    this.setState({
      persons: this.state.persons.filter(p => p.id !== id)
    })
  }
  render() {
    return(
      <div className="persons">
        {
          this.state.persons.map(person =>
            <Card
              name={person.name}
              motto={person.motto}
              avatar={person.avatar}
              remove={this.delete(person.id)}
            />
          )
        }
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
