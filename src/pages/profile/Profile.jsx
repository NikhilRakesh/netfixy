import React, { useEffect, useRef, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { userAuth } from '../../context/Authcontext'
import { db } from '../../services/fireBase'
import { createImageUrl } from '../../services/movieServices'

const Profile = () => {

  const [movie, setMovie] = useState([])
  const { user } = userAuth()
  const sliderRef = useRef(null);

  useEffect(() => {

    if (user) {
      onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
        if (doc.data()) setMovie(doc.data().favshows)
      })
    }

  }, [user?.email])

  const slide = (offset) => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollLeft += offset;
    }
  };
  const Handleunlikeshow = async (movie) => {

    const userdoc = doc(db, 'users', user.email)

    await updateDoc(userdoc, {
      favshows: arrayRemove(movie)
    })

  }
  console.log(movie);

  if (!user) return <><p>Fetching Movies...</p></>

  return <>
    <div>
      <div>
        <img
          className='block w-full h-[500px] object-cover'
          src="https://assets.nflxext.com/ffe/siteui/vlv3/16006346-87f9-4226-bc25-a1fb346a2b0c/9662d0fd-0547-4665-b887-771617268815/IN-en-20240115-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="" />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-[500px]' />
        <div className='absolute top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-nsans-bold my-2'>
            my shows
          </h1>
          <p className='font-nsans-light text-gray-400 text-lg'>
            {user.email}
          </p>
        </div>
      </div>
      <h2 className='font-nsans-bold md:text-xl p-4 capitalize'>fav Shows </h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft
          onClick={() => slide(-500)}
          className='bg-white rounded-full left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer'
          size={40}
        />
        <div
          ref={sliderRef}
          id={`slider`}
          className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'
        >
          {movie.map((mov) => (

            <div key={mov.id} className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2 '>
              <img
                className='w-full h-40 block object-cover object-top'
                src={createImageUrl(mov.backdrop_path ?? mov.poster_path, 'w500')}
                alt={mov.title} />
              <div className='absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100'>
                <p className='whitespace-normal text-xs md:text-xs flex justify-center items-center h-full font-nsans-bold'>
                  {mov.title}
                </p>
                <p>
                  <AiOutlineClose
                    onClick={() => Handleunlikeshow(mov)}
                    size={30}
                    className='absolute top-2 right-2'
                  />
                </p>
              </div>
            </div>


          ))}
        </div>
        <MdChevronRight
          onClick={() => slide(500)}
          className='bg-white rounded-full right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer'
          size={40}
        />
      </div>
    </div>
  </>
}

export default Profile
