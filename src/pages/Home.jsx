/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import PersonajeCard from "../components/PersonajeCard";
import { Col, Spinner, Pagination, Form } from "react-bootstrap";
import { FavoritesContext } from "../context/FavoritesContext";

export default function Home({ loading, setLoading }) {
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(1);
  const { setCharacters, setCharactersFavorites } =
    useContext(FavoritesContext);
  const [allLocations, setAllLocations] = useState([]); // todas  las localizaciones
  const [locations, setLocations] = useState([]); // array con todas mis localizaciones
  const [input, setInput] = useState("");

  const isPrevDisabled = page === 1;
  const isNextDisabled = page === 56;

  const firstPage = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const lastPage = (e) => {
    e.preventDefault();
    setPage(56);
  };

  const prevPage = (e) => {
    e.preventDefault();
    setPage(page - 1);
  };

  const nextPage = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  //Characters
  useEffect(() => {
    setLoading(true);
    const request = async () => {
      try {
        let promises = [];
        for (let i = 1; i <= 42; i++) {
          const promise = axios.get(
            `https://rickandmortyapi.com/api/character?page=${i}`
          );
          promises = [...promises, promise];
        }
        const responses = await Promise.all(promises);

        let arrayData = [];
        for (let i = 0; i < responses.length; i++) {
          const response = responses[i];
          arrayData.push(response.data.results);
        }

        let arrayCharacters = [];
        const arrayDataFlat = arrayData.flat([42]);
        for (let i = 0; i < arrayDataFlat.length; i++) {
          const response = arrayDataFlat[i];

          arrayCharacters.push(response);
        }

        setAllData(arrayCharacters);
        setCharacters(arrayCharacters);
        setCharactersFavorites(arrayCharacters);
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert("hubo un error en la conexión al servidor");
      }
    };
    request();
  }, [page, input]);

  //locations
  useEffect(() => {
    const request = async () => {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/location`
      );
      const locations = response.data.results;
      setAllLocations(locations);
    };
    request();
  }, []);

  // Armado de array de locations
  const funcion = () => {
    let Locations = [];
    for (let i = 0; i < allLocations.length; i++) {
      Locations.push(allLocations[i].name);
    }
    setLocations(Locations);
  };
  useEffect(() => {
    funcion();
  }, [allLocations]);

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const newInput = value;
    setInput(newInput);
  };



  // Paginado Local
  const limit = 15;
  const inicial = 0 + page * limit - limit;
  const last = inicial + limit;
  const dataPaginated = allData.slice(inicial, last);

    // filtrado por locations
    // const locationFilter = dataPaginated.filter((data) => (
    //     data.location.find(({location}) => location.name === "abadango"))
    //   )



  //map character
  const mapCharacter = dataPaginated.map((data) => (
    <PersonajeCard data={data} />
  ));

  return (
    <>
      <div>
            <h1 className="text-white text-center my-5 personajes-titulo container border-0 p-1">
              Personajes
            </h1>
          </div>
        <div className="mx-auto w-25">
          <Form.Select
            aria-label="Default select example"
            onChange={handleChange}
          >
            <option value="">Locations</option>
            {locations.map((location) => (
              <option value={location}>{location}</option>
            ))}
          </Form.Select>
        </div>
       

      {loading ? (
        <div className="my-5 text-white spiner d-flex justify-content-center my-5 p-5">
          <Spinner className="fs-1" animation="border" role="status"></Spinner>
        </div>
      ) : (
        <div>
          <div
            className="container d-flex flex-wrap justify-content-center mt-5"
            as={Col}
            md="4"
          >
            {mapCharacter}
          </div>
          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev onClick={prevPage} disabled={isPrevDisabled} />
              <Pagination.Item onClick={firstPage} disabled={isPrevDisabled}>
                {" "}
                {1}
              </Pagination.Item>
              <Pagination.Ellipsis disabled />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Ellipsis disabled />
              <Pagination.Item onClick={lastPage}> {56}</Pagination.Item>
              <Pagination.Next onClick={nextPage} disabled={isNextDisabled} />
            </Pagination>
          </div>
        </div>
      )}
    </>
  );
}
