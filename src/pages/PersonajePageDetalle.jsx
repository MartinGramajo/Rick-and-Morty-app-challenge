import React from 'react'
import PersonajeDetalle from '../components/PersonajeDetalle'
import { Spinner  } from "react-bootstrap";

export default function PersonajePageDetalle({ loading}) {
  return (

    <div>
      {loading ? (
        <div className="my-5 text-white spiner d-flex justify-content-center my-5 p-5">
          <Spinner className="fs-1" animation="border" role="status"></Spinner>
        </div>
      ) : (
          <div className='d-flex justify-content-center my-5'>
            <PersonajeDetalle />
          </div>
        
      )}
    </div>
  )
}
