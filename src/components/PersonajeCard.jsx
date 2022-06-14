import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import favorite from "../assets/img/starEmpty.svg";
import Notfavorite from "../assets/img/starFilled.svg";

export default function PersonajeCard({ data }) {
  const {favorites,onClick, chequear, deleteFavorite} = useContext(FavoritesContext)
  const { id, image, name, species, status } = data
  const [chequeado, setChequeado] = useState(false);


  // usamos useEffect para renderizar
  useEffect(() => {
    setChequeado(
      chequear(id) 
    );
  }, [favorites]);

  return (
    <Card className="mx-2 my-2 border-5 card-personajes card-personajes-width paytone-one">
      <Card.Header className="d-flex justify-content-end">
      <div>
          <Button
            aria-controls="example-collapse-text"
            className="boton-favorite"
            variant="outline-light"
              onClick={
                chequeado === false ? () => onClick(id) : () => deleteFavorite(id)
              }
            >
              {chequeado === false ? <Image className="star-favorite" src={favorite} alt="logoFooter" fluid /> : <Image  className="star-not-favorite" src={Notfavorite} alt="logoFooter" fluid />}
            </Button>
        </div>
      </Card.Header>
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
        <div className="personaje-footer">
          <div className="estado efecto-blur-card text-white p-2">
            <span className={status}></span>
            <p className="fs-6 my-1">{status}</p>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
}