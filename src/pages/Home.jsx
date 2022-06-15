import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import PersonajeCard from "../components/PersonajeCard";
import { Col, Spinner, Pagination } from "react-bootstrap";
import { FavoritesContext } from "../context/FavoritesContext";

export default function Home({ loading, setLoading }) {
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(56);
  const { setCharacters, setCharactersFavorites } =
    useContext(FavoritesContext);

  const isAnteriorDisabled = page === 1;
  const isSiguienteDisabled = allData.length === 0;

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
  }, [page]);

  //   useEffect(() => {
  //     setLoading(true);
  //     const request = async () => {
  //       try {
  //         let promises = [];
  //         for (let i = 1; i <= 42; i++) {
  //           const promise = axios.get(
  //             `https://rickandmortyapi.com/api/location/`
  //           );
  //           promises = [...promises, promise];
  //         }
  //         const responsesLocation = await Promise.all(promises);

  //         let arrayData = [];
  //         for (let i = 0; i < responsesLocation.length; i++) {
  //           const response = responsesLocation[i];
  //           arrayData.push(response.data.results);
  //         }

  //         let arrayLocation = [];
  //         const arrayDataFlat = arrayData.flat([42]);
  //         for (let i = 0; i < arrayDataFlat.length; i++) {
  //           const response = arrayDataFlat[i];

  //           arrayLocation.push(response);
  //         }

  //         setLocation(arrayLocation);
  //         setLoading(false);
  //       } catch (error) {
  //         console.error(error);
  //         alert("hubo un error en la conexión al servidor de newsApi");
  //       }
  //     };
  //     request();
  //   }, []);

  // Paginado Local
  const limit = 15;
  const inicial = 0 + page * limit - limit;
  const last = inicial + limit;
  const dataPaginated = allData.slice(inicial, last);

  //   let filtroLocation = [];
  //   for (let i = 0; i < location.length; i++) {
  //     const filter = location.filter((data) => data.name === 'Abadango');
  //     console.log("file: Home.jsx ~ line 102 ~ Home ~ filter ", filter )

  //   }

  // mapeo character
  const mapCharacter = dataPaginated.map((data, id) => (
    <PersonajeCard data={data} />
  ));

  return (
    <>
      <h1 className="text-white text-center my-5 personajes-titulo container border-0 p-1">
        Personajes
      </h1>
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
              <Pagination.Prev
                onClick={prevPage}
                disabled={isAnteriorDisabled}
                />
              <Pagination.Item
                onClick={firstPage}
                disabled={isAnteriorDisabled}
              >
                {" "}
                {1}
              </Pagination.Item>
              <Pagination.Ellipsis disabled />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Ellipsis disabled />
              <Pagination.Item onClick={lastPage}> {56}</Pagination.Item>
              <Pagination.Next
                onClick={nextPage}
                disabled={page === 56 && true}
              />
            </Pagination>
          </div>
        </div>
      )}
    </>
  );
}
