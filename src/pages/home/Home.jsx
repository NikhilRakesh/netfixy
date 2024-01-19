import React from 'react'
import Hero from '../../components/Hero'
import MovieRow from '../../components/MovieRow'
import endPoinets from '../../services/movieServices'

const Home = () => {
  return <>
    <Hero />
    <MovieRow title='upcoming' url={endPoinets.upcoming} />
    <MovieRow title='trending' url={endPoinets.trending} />
    <MovieRow title='top rated' url={endPoinets.topRated} />
    <MovieRow title='comedy' url={endPoinets.comedy} />
    <MovieRow title='popular' url={endPoinets.popular} />
  </>
}

export default Home
