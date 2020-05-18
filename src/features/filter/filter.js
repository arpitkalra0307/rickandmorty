import React, { PureComponent } from 'react'

import { connect } from 'react-redux'
import { actionCreators } from '../../../src/actions'

// styles
import styles from './Filter.module.css'

//filter json
import filterData from './filters.json';


type FilterPropTypes = {
  getConcertDetails: Function,
  filters: Array,
}

export class Filter extends PureComponent<FilterPropTypes> {


renderFilterSection = (filterData) => {
  return (filterData.map(filter =>
    <div key={filter.category} className={styles.filters}>
      <span>{filter.category}</span>
      {this.renderFilterTypes(filter.type, filter.category)}
    </div>
  )
)}

changeHandler = (objFilter) => {
  const { changeFilter, filters } = this.props
  changeFilter(filters.indexOf(objFilter.category) > -1 ? [] : [objFilter.category, objFilter.val])
}

renderFilterTypes = (type, category) => {
  return (
  <div>
      {type.map(val => {
        return (
          <div key={val}>
            <input type="checkbox" value={val} onChange={() => this.changeHandler({category, val})} />
            <label htmlFor={val}> {val} </label>
          </div>
      )}
  )}
  </div>
)}

  render() {
    return (
      <React.Fragment>
        <h2>Filters</h2>
        <div>{this.renderFilterSection(filterData)}</div>
      </React.Fragment>
  )}
}

const { changeFilter } = actionCreators
export const mapDispatchToProps = { changeFilter }

export default connect(
  null,
  mapDispatchToProps
)(Filter)
