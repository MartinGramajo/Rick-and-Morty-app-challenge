import React from "react";
import { Card, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import notfound from "../assets/img/notfound.png";

export default function NotFound() {
  return (
    <div>
      <Card
        style={{ maxWidth: "1100px" }}
        className="efecto-blur-card text-white-50 p-5 mt-5 mx-auto"
      >
        <Image src={notfound} />
        <Button
          as={Link}
          to={`/`}
          className="py-1 btn-lg boton-color border-0"
          variant="outline-light"
        >
          Regresar
        </Button>
      </Card>
    </div>
  );
}