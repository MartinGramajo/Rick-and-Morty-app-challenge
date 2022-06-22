import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { FavoritesContext } from "../context/FavoritesContext";

export default function Favorites() {
  const { favorites, deleteFavorite } = useContext(FavoritesContext);

  return (
    <>
      <div className="container my-2  mx-auto">
        <div className="d-flex justify-content-center">
        {favorites.map((favorite, id) => (
          <Card className="mx-auto my-2 border-5 card-personajes card-personajes-width paytone-one">
            <Card.Header></Card.Header>
            <Card.Img
              className="border-card-image"
              src={favorite.image}
              alt="imagen card"
            />
            <Card.Body className="text-center text-white efecto-blur-card mt-3">
              <Card.Title>{favorite.name}</Card.Title>
              <Card.Text>
                Specie : {favorite.species}
                <br />
                Status: {favorite.status}
                <br />
              </Card.Text>
            </Card.Body>
            <Card.Footer className="mx-auto">
              <Button className="boton-delete border-0"  variant="danger"onClick={() => deleteFavorite(favorite.id)}>
                quitar
              </Button>
            </Card.Footer>
          </Card>
        ))}
          </div>
        </div>
        <div className="mx-auto">
          {!favorites.length && (
            <Card className="card-personajes text-white-50 p-5 mt-5">
              <Card.Title>Aún no tienes ningún favorito</Card.Title>
            </Card>
          )}
      </div>
    </>
  );
}
