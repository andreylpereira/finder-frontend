import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  createUserAction,
  updateUserAction,
} from "../../redux/actions/userActions";
import Bread from "../../components/Bread";
import { toast } from "sonner";
import { Table, Spinner, Container, Button, Col, Badge } from "react-bootstrap/";
import UserModal from "./UserModal"; 

const User = () => {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.user);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
    position: "",
    enable: true,
    forms: []
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleModalCreate = () => {
    setModalMode("create");
    setForm({
      email: "",
      password: "",
      name: "",
      role: "",
      position: "",
      enable: true,
    });
    setModalVisible(true);
  };

  const handleModalEdit = (user) => {
    setModalMode("edit");
    setForm({
      id: user.id,
      email: user.email,
      password: null,
      name: user.name,
      role: user.role,
      position: user.position,
      enable: user.enable,

    });
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
    setForm({
      email: "",
      password: "",
      name: "",
      role: "",
      position: "",
      enable: true,
    });
  };

  const handleSubmit = (userData) => {
    if (modalMode === "create") {
      dispatch(createUserAction(userData))
        .then(() => {
          dispatch(fetchUsers());
          toast.success("Usuário cadastrado com sucesso.");
          handleClose();
        })
        .catch((error) => toast.error(error.message));
    } else if (modalMode === "edit") {
      dispatch(updateUserAction(userData, userData.id))
        .then(() => {
          dispatch(fetchUsers());
          toast.success("Usuário atualizado com sucesso.");
          handleClose();
        })
        .catch((error) => toast.error(error.message));
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center min-vh-100 user-select-none">
        <Col className="w-100">
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
          {users.length > 0 && (
            <div>
              <h5 className="fw-bold mb-5 mt-5">
                <Bread current="Usuários" />
              </h5>
              <Button
                type="button"
                className="fw-bold bg-gradient rounded shadow"
                onClick={handleModalCreate}
              >
                CADASTRAR
              </Button>
              <Table striped bordered hover className="shadow mt-3">
                <thead>
                  <tr className="text-center text-uppercase text-white bg-primary">
                    <th className="text-white bg-primary border-0">NOME</th>
                    <th className="text-white bg-primary border-0">E-MAIL</th>
                    <th className="text-white bg-primary border-0">CARGO</th>
                    <th className="text-white bg-primary border-0">ROLE</th>
                    <th className="text-white bg-primary border-0">HABILITADO</th>
                    <th className="text-white bg-primary border-0"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="text-center">
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.position}</td>
                      <td>{user.role}</td>
                      <td>

                      <Badge
                          className="text-white"
                          bg={user.enable ? "success" : "danger"}
                          variant={user.enable ? "success" : "danger"}
                        >
                          {user.enable ? "Sim" : "Não"}
                        </Badge>
                      </td>
                      <td>
                        {user.id !== 1 ? (
                          <Button
                            type="button"
                            className="fw-bold bg-gradient rounded shadow"
                            onClick={() => handleModalEdit(user)}
                          >
                            EDITAR
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            className="fw-bold bg-gradient rounded shadow"
                            disabled
                          >
                            EDITAR
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
          {!loading && users.length === 0 && !error && (
            <div className="alert alert-warning mt-3" role="alert">
              Não há usuários cadastrados.
            </div>
          )}
        </Col>
      </Container>

      <UserModal
        show={modalVisible}
        handleClose={handleClose}
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        modalMode={modalMode}
      />
    </>
  );
};

export default User;
