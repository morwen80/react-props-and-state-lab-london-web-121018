import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = event => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  onFindPetsClick = () => {
    //decide what url to call
    const apiURL =
      this.state.filters.type === 'all'
        ? "/api/pets"
        : `/api/pets?type=${this.state.filters.type}`;

    //make the api call
    fetch(apiURL).then(res => res.json())
    //update state of pets array
    .then(data => this.setState({ pets: data}))
  }

  onAdoptPet = id => {
    const pets = this.state.pets.map(pet =>
      id === pet.id ? { ...pet, isAdopted: true} : pet
    );
    this.setState({
      pets: pets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
