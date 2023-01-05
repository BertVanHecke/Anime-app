import React from 'react'
import Detail from '../components/Detail'

const MangaDetailsScreen = ({route}) => {
const id = route.params.data.mal_id;
const type = route.params.type;
  return (
    <Detail id={id} type={type}/>
  )
}

export default MangaDetailsScreen