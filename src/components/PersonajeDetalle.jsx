import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function PersonajeDetalle() {
  const params = useParams();
  const [personaje, setPersonaje] = useState({
    id: "",
    name: "",
    image: "",
    origin: "",
    species: "",
    status: "",
    location: "",
    gender: "",
  });

  const { image, name, species, status, location, gender, origin } = personaje;

  useEffect(() => {
    const request = async () => {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${params.id}`
      );
      const personajeUnico = response.data;
      setPersonaje(personajeUnico);
    };
    request();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="mx-2 my-2 border-5 card-personajes card-personajes-width">
      <Card.Header></Card.Header>
      <Card.Img className="border-card-image" variant="top" src={image} />
      <Card.Body className="text-center text-white efecto-blur-card mt-3">
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Specie : {species}
          <br />
          Status: {status}
          <br />
          Gender : {gender}
          <br />
          Origin: {origin.name}
          <br />
          Location: {location.name}
          <br />
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