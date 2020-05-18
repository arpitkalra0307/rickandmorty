// @flow
import React from 'react'

// styles
import styles from './Tiles.module.css'

// utils
import { extractYear } from '../../utils/commonUtils'

type TilesProps = {
  // lists the open service requests
  concertData: Array<Object>
}

function renderProductTile (concertData) {
  return concertData.map((concert) =>
    <li key={concert.id} className={styles.productItem}>
      <div className={styles.imageContainer}>
        <img  alt={concert.name} className={styles.productImage} src={concert.image}></img>
        <div className={styles.textContainer}>
          <div> {concert.name}</div>
          <div> id: {concert.id} - created {extractYear(concert.created)} </div>
        </div>
      </div>
      {renderRowDetails('status', concert.status)}
      {renderRowDetails('species', concert.species)}
      {renderRowDetails('gender', concert.gender)}
      {renderRowDetails('origin', concert.origin.name, concert.origin.url)}
      {renderRowDetails('last location', concert.location.name, concert.location.url)}
    </li>
  )
}

function renderRowDetails(key, value, anchorLink = '') {
  return (
    <div className={styles.detailContainer}>
      <div>{key}</div>
      <div>{anchorLink ? <a target='_blank' href={anchorLink}>{value}</a>: value}</div>
    </div>
  )
}

const Tiles = ({ concertData }: TilesProps) => (
  concertData && concertData.length ?
      <ul className={styles.productTiles}>
        {renderProductTile(concertData)}
      </ul>
  : <div>No items found</div>
)

export default Tiles
