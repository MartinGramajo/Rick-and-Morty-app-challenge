import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PersonajeCard({ data }) {
    const {id,image, name, species,status} = data
  return (
    <Card className="mx-2 my-2 border-5 card-personajes card-personajes-width paytone-one">
      <Card.Header></Card.Header>
      <Card.Img className="border-card-image" src={image} alt="imagen card" />
      <Card.Body className="text-center text-white efecto-blur-card mt-3">
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Specie : {species}
          <br />
          Status: {status}
          <br />
          <Button className="mb-1 mt-2 efecto-blur-card  boton-color border-0" variant="outline-light" as={Link} to={`character/${id}`} >
          Ver detalle
        </Button>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="border-0">
        {/* <div className="personaje-footer">
          <div className="estado efecto-blur-card text-white p-2">
            <span className={props.status}></span>
            <p className="fs-6 my-1">{props.status}</p>
          </div>
        </div> */}
      </Card.Footer>
    </Card>
  );
}