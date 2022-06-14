import axios from "axios";
import React, { useEffect, useState } from "react";
import PersonajeCard from "../components/PersonajeCard";
import { Col, Button,Spinner  } from "react-bootstrap";

export default function Home({ loading, setLoading}) {
  const [allData, setAllData] = useState([]);
    const [page, setPage] = useState(1);
    

  const isAnteriorDisabled = page === 1;
  const isSiguienteDisabled = allData.length === 0;

  const clickPagina = () => {
    setPage(page - 1);
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

  // Paginado Local
  const limit = 15;
  const inicial = 0 + page * limit - limit;
  const last = inicial + limit;
  const newsPaginate = allData.slice(inicial, last);

  // mapeo character
  const mapCharacter = newsPaginate.map((data, id) => (
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
            <Button onClick={clickPagina} disabled={isAnteriorDisabled}>
              Anterior
            </Button>

            {page}
            <Button
              onClick={() => {
                setPage(page + 1);
              }}
              disabled={isSiguienteDisabled}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
