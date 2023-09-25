import React, { useState } from 'react'
import CustomButton, { CANCEL_TYPE, DELETE_TYPE, EDIT_TYPE, READ_TYPE } from './CustomButton'


const MovieCard = ({ movieInfo, deleteClick, watchUpdateClick, handleEdit, handleModal }) => {

    const [editMode, setEditMode] = useState(false)

    return (
        <div className='container border shadow d-flex justify-content-between align-items-center p-2'>
            <div className='container d-flex flex-column '>

                {editMode ? (
                    <form
                        className='d-flex gap-2'
                        onSubmit={(e) => {
                            e.preventDefault()

                            handleEdit(movieInfo, e.target[0].value)
                            setEditMode(!editMode)

                        }}>
                        <input
                            defaultValue={movieInfo.movieTitle}
                            className='rounded  border px-2'
                            type="text" />
                        <CustomButton
                            title={'Save'}
                            type={EDIT_TYPE}
                        />
                    </form>


                ) :
                    (<h5
                        style={{
                            textDecoration: movieInfo.isWatch ? "line-through" : "none"
                        }
                        }>{movieInfo.movieTitle}

                    </h5>)
                }

                <span>{movieInfo.date}</span>
            </div>
            <div className='btn-group'>
                <CustomButton
                    title={'Delete'}
                    type={DELETE_TYPE}
                    onClick={()=>handleModal(movieInfo.id)} />
                <CustomButton
                    title={editMode ? "Cancel" : "Edit"}
                    type={editMode ? CANCEL_TYPE : EDIT_TYPE}
                    onClick={() => setEditMode(!editMode)} />
                <CustomButton
                    title={movieInfo.isWatch === false ? 'Watched' : 'Unwatched'}
                    type={READ_TYPE}
                    onClick={watchUpdateClick} />
            </div>
        </div>
    )
}

export default MovieCard