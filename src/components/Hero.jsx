import axios from 'axios'
import React, { useEffect, useState } from 'react'
import endPoinets, { createImageUrl } from '../services/movieServices'

const Hero = () => {

    const [movie, setMovie] = useState({})

    useEffect(() => {
        axios.get(endPoinets.popular).then((response) => {
            const Movies = response.data.results
            const randomIndex = Math.floor(Math.random() * Movies.length);
            const randomMovie = Movies[randomIndex];
            setMovie(randomMovie);
        })
    }, [])

    if (!movie)
        return (
            <>
                <p>Fetching movies...</p>
            </>
        )

    const { title, backdrop_path, release_date, overview } = movie

    const trancate = (str, length) => {
        if (!str) return ''
        return str.length > length ? str.slice(0, length) + '...' : str;
    }


    return (
        <div className='w-full h-[550px] lg:h-[850p]'>
            <div className='w-full h-full'>
                <div className='absolute w-full h-[550px] lg:h-[850p] bg-gradient-to-r from-black' />
                <img
                    className='w-full h-full object-cover object-top'
                    src={createImageUrl(backdrop_path, 'original')}
                    alt={title} />

                <div className='absolute w-full top-[10%] lg:top-[25%] p-4 md:p-8'>
                    <h1 className='text-3xl md:text-6xl font-nsans-bold' >{title}</h1>
                    <div className='mt-8 mb-4'>
                        <button className='capitalize border bg-gray-300 text-black py-2 px-5'>
                            play
                        </button>
                        <button className='capitalize border border-gray-300 py-2 px-5 ml-4'>
                            watch later
                        </button>
                    </div>
                    <p className='text-gray-400 text-sm'>{release_date}</p>
                    <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
                        {trancate(overview, 165)}
                    </p>
                </div>
            </div>
            {/* <h1 className='text-cyan-500 text-5xl'>{title}</h1> */}
        </div>
    )
}

export default Hero
