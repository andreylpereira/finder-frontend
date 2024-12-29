import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, createItemAction, updateItemAction, } from "../../redux/actions/itemActions";
import Bread from "../../components/Bread";
import { toast } from "sonner";
import { Table, Spinner, Container, Button, Figure, Col, Badge } from "react-bootstrap/";
import ItemModal from "./ItemModal";
import PhotoModal from "./PhotoModal";
import FormsModal from "./FormsModal";
import ObservationModal from "./ObservationModal";

const Item = () => {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.item);

  const [modalPhotoVisible, setModalPhotoVisible] = useState(false);
  const [modalFormsVisible, setModalFormsVisible] = useState(false);
  const [modalObservationVisible, setModalObservationVisible] = useState(false);

  const [modalPhoto, setModalPhoto] = useState("");
  const [modalForms, setModalForms] = useState([]);
  const [modalObservation, setModalObservation] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("create");

  const [form, setForm] = useState({
    title: "",
    description: "",
    localFound: "",
    dateFound: "",
    contentType: "",
    base64Image: "",
    status: "",
    ownerFound: false,
    observation: "",
    userId: "",
  });

  const handleModalPhoto = (photo) => {
    setModalPhoto(photo);
    setModalPhotoVisible(true);
  };

  const handleModalCreate = () => {
    setModalMode("create");
    setForm({
      title: "",
      description: "",
      localFound: "",
      dateFound: "",
      contentType: "",
      base64Image: "",
      status: "",
      ownerFound: false,
      observation: "",
      userId: "",
    });
    setModalVisible(true);
  };

  const handleModalEdit = (item) => {
    setModalMode("edit");
    setForm({
      id: item.id,
      title: item.title,
      description: item.description,
      localFound: item.localFound,
      dateFound: item.dateFound ? item.dateFound.split("T")[0] : "",
      contentType: item.contentType,
      base64Image: item.base64Image,
      status: item.status,
      ownerFound: item.ownerFound,
      observation: item.observation,
      userId: item.userId || "",
    });
    setModalVisible(true);
  };

  const handleModalForms = (forms) => {
    setModalForms(forms);
    setModalFormsVisible(true);
  };

  const handleModalObservation = (observation) => {
    setModalObservation(observation);
    setModalObservationVisible(true);
  };

  const handleClose = (modal) => {
    if (modal === "forms") {
      setModalFormsVisible(false);
    } else if (modal === "photo") {
      setModalPhotoVisible(false);
    } else if (modal === "observation") {
      setModalObservationVisible(false);
    } else {
      setModalVisible(false);
      setForm({
        title: "",
        description: "",
        localFound: "",
        dateFound: "",
        contentType: "",
        base64Image: "",
        status: "",
        ownerFound: false,
        observation: "",
        userId: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.description ||
      !form.localFound ||
      !form.dateFound
    ) {
      toast.error("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    let formattedDateFound = form.dateFound;

    if (!formattedDateFound.includes("T")) {
      formattedDateFound = `${formattedDateFound}T00:00:00`;
    }

    const itemData = {
      title: form.title,
      description: form.description,
      localFound: form.localFound,
      dateFound: formattedDateFound,
      contentType: form.contentType,
      base64Image: form.base64Image,
      status: form.status,
      ownerFound: form.ownerFound,
      observation: form.observation,
      userId: form.userId || "",
    };

    if (modalMode === "create") {
      dispatch(createItemAction(itemData))
        .then(() => {
          dispatch(fetchItems());
          toast.success("Item cadastrado com sucesso.");
          handleClose();
        })
        .catch((error) => toast.error(error.message));
    } else if (modalMode === "edit") {
      const updatedItem = {
        id: form.id,
        ...itemData,
      };

      dispatch(updateItemAction(updatedItem, updatedItem.id))
        .then(() => {
          dispatch(fetchItems());
          toast.success("Item atualizado com sucesso");
          handleClose();
        })
        .catch((error) => toast.error(error.message));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <>
      <Container className="d-flex justify-content-center min-vh-100 item-select-none">
        <Col className="w-100">
          {loading && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "calc(70vh - 50px)" }}
            >
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </Spinner>
            </div>
          )}
          {error && !loading && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
          {items.length > 0 && (
            <div>
              <h5 className="fw-bold mb-5 mt-5">
                <Bread current="Itens" />
              </h5>
              <Button
                type="button"
                className="fw-bold bg-gradient rounded shadow"
                onClick={handleModalCreate}
              >
                CADASTRAR
              </Button>
              <Table bordered hover className="shadow mt-3">
                <thead>
                  <tr className="text-center text-uppercase text-light bg-primary ">
                    <th className="text-light bg-primary border-0"></th>
                    <th className="text-light bg-primary border-0">
                      Descrição
                    </th>
                    <th className="text-light bg-primary border-0">
                      Local Encontrado
                    </th>
                    <th className="text-light bg-primary border-0">Datas</th>
                    <th className="text-light bg-primary border-0">
                      Dono Localizado
                    </th>
                    <th className="text-light bg-primary border-0">Status</th>
                    <th className="text-light bg-primary border-0"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="text-center">
                      <td>
                        <Figure.Caption className="text-dark">
                          <h6>{item.title}</h6>
                        </Figure.Caption>
                        <Figure.Image
                          className="m-0 p-0"
                          style={{ cursor: "pointer" }}
                          width={100}
                          height={100}
                          alt="Imagem"
                          src={`data:${item.contentType};base64,${item.base64Image}`}
                          onClick={() =>
                            handleModalPhoto(
                              `data:${item.contentType};base64,${item.base64Image}`
                            )
                          }
                        />
                      </td>
                      <td>{item.description}</td>
                      <td>{item.localFound}</td>
                      <td>
                        <div className="fw-light fw-italic">
                          Encontrado: {formatDate(item.dateFound)}
                        </div>
                        <div className="fw-light fw-talic">
                          Registrado: {formatDate(item.registrationDate)}
                        </div>
                      </td>
                      <td>
                        <Badge
                          className="text-light"
                          bg={item.ownerFound ? "success" : "danger"}
                          variant={item.ownerFound ? "success" : "danger"}
                        >
                          {item.ownerFound ? "Sim" : "Não"}
                        </Badge>
                      </td>

                      <td>
                        <Badge
                          className="text-light"
                          bg={
                            item.status === "Novo"
                              ? "primary"
                              : item.status === "Em análise"
                              ? "secondary"
                              : item.status === "Recuperado"
                              ? "success"
                              : item.status === "Descartado"
                              ? "danger"
                              : ""
                          }
                        >
                          {item.status}
                        </Badge>
                      </td>
                      <td>
                        <Col className="d-flex flex-column align-items-center">
                          {item.ownerFound !== true ||
                          item.status === "Novo" ||
                          item.status === "Em análise" ? (
                            <Button
                              type="button"
                              className="bg-gradient rounded shadow mb-2"
                              onClick={() => handleModalEdit(item)}
                            >
                              EDITAR
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              className="bg-gradient rounded shadow mb-2"
                              disabled
                            >
                              EDITAR
                            </Button>
                          )}
                          <Button
                            variant="outline-primary"
                            className="bg-gradient rounded shadow mb-2"
                            onClick={() =>
                              handleModalObservation(item.observation)
                            }
                          >
                            OBSERVAÇÃO
                          </Button>
                          <Button
                            variant="outline-secondary"
                            className="bg-gradient rounded shadow mb-2"
                            onClick={() => handleModalForms(item.forms)}
                          >
                            FORMULÁRIOS
                          </Button>
                        </Col>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
          {!loading && items.length === 0 && !error && (
            <div className="alert alert-warning mt-3" role="alert">
              Não há Itens cadastrados.
            </div>
          )}
        </Col>
      </Container>

      <ItemModal
        show={modalVisible}
        handleClose={() => handleClose("items")}
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        modalMode={modalMode}
      />

      <PhotoModal
        show={modalPhotoVisible}
        handleClose={() => handleClose("photo")}
        photo={modalPhoto}
      />

      <FormsModal
        show={modalFormsVisible}
        handleClose={() => handleClose("forms")}
        forms={modalForms}
      />

      <ObservationModal
        show={modalObservationVisible}
        handleClose={() => handleClose("observation")}
        observation={modalObservation}
      />
    </>
  );
};

export default Item;
