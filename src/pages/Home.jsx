import axios from "axios";
import React, { useEffect, useState } from "react";
import PersonajeCard from "../components/PersonajeCard";
import { Col, Button, Spinner, Pagination } from "react-bootstrap";

export default function Home({ loading, setLoading }) {
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(1);

  const isAnteriorDisabled = page === 1;
  const isSiguienteDisabled = allData.length === 0;

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
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert("hubo un error en la conexión al servidor de newsApi");
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
              <Pagination.Ellipsis disabled />
              <Pagination.Item>{page}</Pagination.Item>

              <Pagination.Ellipsis disabled />
              <Pagination.Next
                onClick={nextPage}
                disabled={isSiguienteDisabled}
              />
            </Pagination>
          </div>
        </div>
      )}
    </>
  );
}
