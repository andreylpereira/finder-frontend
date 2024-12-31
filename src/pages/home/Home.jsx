import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicItems } from "../../redux/actions/itemPublicActions.jsx";
import NavHeader from "../../components/NavHeader.jsx";
import {
  Container,
  Card,
  Button,
  Col,
  Row,
  Spinner,
  Alert,
} from "react-bootstrap";
import PhotoModal from "../item/PhotoModal";
import HomeModal from "./HomeModal.jsx";

const Home = () => {
  const dispatch = useDispatch();

  const { publicItems, loading, error } = useSelector(
    (state) => state.publicItems
  );

  const [modalPhotoVisible, setModalPhotoVisible] = useState(false);
  const [modalPhoto, setModalPhoto] = useState("");
  const [modalHomeVisible, setModalHomeVisible] = useState(false);
  const [itemId, setItemId] = useState(null);

  const handleModalPhoto = (photo) => {
    setModalPhoto(photo);
    setModalPhotoVisible(true);
  };

  const handleHomeModal = (id) => {
    setItemId(id);
    setModalHomeVisible(true);
  };

  const handleClose = () => {
    setModalPhotoVisible(false);
    setModalHomeVisible(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  useEffect(() => {
    dispatch(fetchPublicItems());
  }, [dispatch]);

  return (
    <>
      <div
        style={{ backgroundColor: "#E2EEFF", minHeight: "100vh" }}
        className="user-select-none"
      >
        <NavHeader />
        <Container>
          {loading && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "calc(70vh - 50px)" }}
            >
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden"></span>
              </Spinner>
            </div>
          )}

          {error && !loading && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}

          {publicItems.length > 0 ? (
            <>
              <Row className="g-4 mt-5 ">
                <Alert variant="light shadow-sm">
                  <h5 className="fw-bold">Home</h5>
                </Alert>
                {publicItems.map((item) => (
                  <Col md={3} key={item.id} className="mb-4">
                    <Card className="h-100 shadow" style={{ width: "305px" }}>
                      <Card.Img
                        className="shadow"
                        style={{
                          cursor: "pointer",
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                        alt="Imagem do item"
                        src={`data:${item.contentType};base64,${item.base64Image}`}
                        onClick={() =>
                          handleModalPhoto(
                            `data:${item.contentType};base64,${item.base64Image}`
                          )
                        }
                      />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>{item.title}</Card.Title>
                        <div>
                          <Card.Text>
                            <p className="m-0">
                              <b className="text-secondary">Registrado em: </b>
                              {formatDate(item.registrationDate)}
                            </p>
                            <p className="m-0">
                              <b className="text-secondary">Encontrado em: </b>
                              {formatDate(item.dateFound)}
                            </p>
                            <p className="m-0">
                              <b className="text-secondary">Local: </b>
                              {item.localFound}
                            </p>
                            <p className="m-0 text-secondary">
                              <b className="text-secondary">Descrição: </b>
                            </p>
                            <p className="mt-2 fw-light">{item.description}</p>
                          </Card.Text>
                        </div>
                        <Button
                          variant="primary"
                          className="mt-auto w-100 shadow"
                          onClick={() => handleHomeModal(item.id)}
                        >
                          FORMULÁRIO
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              <PhotoModal
                show={modalPhotoVisible}
                handleClose={handleClose}
                photo={modalPhoto}
              />
              <HomeModal
                show={modalHomeVisible}
                handleClose={handleClose}
                itemId={itemId}
              />
            </>
          ) : (
            <div className="alert alert-warning mt-3" role="alert">
              Não há itens cadastrados.
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default Home;
