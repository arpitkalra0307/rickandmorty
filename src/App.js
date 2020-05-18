import React, { PureComponent } from 'react'
import './App.css';

import { connect } from 'react-redux'
import { actionCreators } from '../src/actions'

import Tiles from './features/tiles/tiles'
import Filter from './features/filter/filter'

import { createFilter } from '../src/utils/filter'

type AppPropTypes = {
  getConcertDetails: Function,
}


export class App extends PureComponent<AppPropTypes> {

  constructor(props: Object) {
    super(props);
    const {
      getConcertDetails,
    } = props
    getConcertDetails()
  }

  state = {
    filters: this.props.filters,
    // sorters: this.props.sorters,
  }

  render() {
    const { concertDetails : { data : { results } , filters }  } = this.props

    let updatedResult = results;

    if (Array.isArray(filters) && filters.length) {
      updatedResult = results.filter(createFilter(...filters));
    }

    return (
      <div className="app">
        <header className="appHeader">
          <h1>Rick and Morty</h1>
        </header>
        <section className="section">
          <div className="filterContainer">
            <Filter filters={filters} />
          </div>
          <div className="tilesContainer">
            <Tiles concertData={updatedResult} ></Tiles>
          </div>
        </section>
      </div>
    );
  }
}

const { getConcertDetails } = actionCreators
export const mapDispatchToProps = { getConcertDetails }

export const mapStateToProps = ({ concertDetails }) => ({
  concertDetails
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
