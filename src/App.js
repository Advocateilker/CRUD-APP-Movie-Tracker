import React, { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import MovieCard from "./components/MovieCard.jsx";
import CustomButton, { ADD_TYPE, CANCEL_TYPE, DELETE_TYPE, } from "./components/CustomButton.jsx";
import { toast } from 'react-toastify'

function App() {

  const [movieName, setMovieName] = useState("")
  const [movieList, setMovieList] = useState([])
  const [showCase, setShowCase] = useState(false)
  const [idMovie, setIdMovie]= useState()


  const addMovie = (e) => {
    e.preventDefault();

    const newMovie = {
      id: uuidv4(),
      movieTitle: movieName,
      date: new Date().toLocaleString(),
      isWatch: false
    }


    setMovieList([...movieList, newMovie])
    setMovieName('')

    toast.success('New Movie Added', {
      autoClose: 2000
    });

  }

  const handleModal = (id)=>{
    setIdMovie(id)
    setShowCase(!showCase)

  }

  const deleteMovie = (deleteId) => {

    const filteredList = movieList.filter((movie) => movie.id !== deleteId)

    setMovieList(filteredList)
    setShowCase(!showCase)


    toast.error('Movie Deleted', {
      autoClose: 2000
    });
  }

  const handleWatch = (movie) => {

    const updatedMovie = { ...movie, isWatch: !movie.isWatch }

    const cloneMovieList = [...movieList]

    const movieIndex = cloneMovieList.findIndex((i) => i.id === movie.id)

    cloneMovieList.splice(movieIndex, 1, updatedMovie)

    setMovieList(cloneMovieList)



  }

  const handleEdit = (movie, newTitle) => {

    const updatedMovie = { ...movie, movieTitle: newTitle }

    const updatedList = movieList.map((movie) => movie.id !== updatedMovie.id ? movie : updatedMovie)

    setMovieList(updatedList)
    toast.warn('Movie Title Updated', {
      autoClose: 2000
    });
  }

  return (
    <div>
      <header className="bg-dark text-light py-2 text-center fs-3">
        Which movie I watch?
      </header>
      <div className="container border pb-5">
        <form className="d-flex gap-3 mt-3" onSubmit={addMovie}>
          <input
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="Add Movie" className="form-control shadow" type="text" />
          <CustomButton type={ADD_TYPE} title={'Add'} />
        </form>

        <div className="d-flex flex-column gap-3 mt-2">




          {movieList.length < 1 ? <h2 className="text-center mt-5">No movies added yet</h2> : movieList.map((movie) => {
            return <MovieCard
              movieInfo={movie}
              watchUpdateClick={() => handleWatch(movie)}
              handleEdit={handleEdit}
              handleModal={handleModal} />
          })}

        </div>
      </div>


      {showCase ?
        <div className="Delete-Modal">
          <div className="Modal-Box">
            <h5>Are you sure you want to delete?</h5>
            <div className="btn-group">
              <CustomButton type={DELETE_TYPE} title={'DELETE'} onClick={()=> deleteMovie(idMovie)} />
              <CustomButton type={CANCEL_TYPE} title={'CANCEL'} onClick={()=>handleModal()}/>
            </div>
          </div>
        </div> : null

      }



    </div>

  );
}

export default App;
