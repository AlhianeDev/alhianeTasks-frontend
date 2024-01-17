import { Link, useNavigate, useParams } from "react-router-dom";

import { Button, Container } from "react-bootstrap";

import Form from "../components/Form";

import { useState } from "react";

import useError, { ErrorType } from "../hooks/useError";

import { useUpdateTodoById } from "../hooks/useUpdateTodoById";

import { FIND_TODO_BY_ID } from "../graphql/queries/FindTodoById";

import { useQuery } from "@apollo/client";

import Swal from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const UpdateTask = () => {

    const { todoId } = useParams();

    const { loading, error, data } = useQuery(FIND_TODO_BY_ID, { variables: { todoId } });

    const [updateTodoById] = useUpdateTodoById();

    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");

    const [_error, setError] = useError(errorMsg);

    const handleUpdateTask = (
        
        event: React.FormEvent<HTMLFormElement>,
        
        taskTitle: string,
        
        taskDesc: string,

        resetTaskTitle: () => void,

        resetTaskDesc: () => void
        
    ) => {

        event.preventDefault();

        setError({} as ErrorType);

        setErrorMsg("");

        MySwal.fire({

            title: "Do you want to add a new task?",

            showDenyButton: false,

            showCancelButton: true,

            confirmButtonText: "Add"

          }).then((result) => {

            if (result.isConfirmed) {

                updateTodoById({

                    variables: {
        
                        todoInput: {
        
                            id: todoId,
        
                            todoTitle: taskTitle,
        
                            todoDesc: taskDesc
        
                        }
        
                    }
        
                }).then(() => {
        
                    resetTaskTitle();
        
                    resetTaskDesc();
            
                    navigate("/");

                    MySwal.fire("Updated!", "", "success");
        
                }).catch(error => {
        
                    setErrorMsg(error?.graphQLErrors[0].message);

                    MySwal.fire(`Validation Exceptions!`, "", "error");
        
                });

            } else if (result.isDismissed) {

                MySwal.fire("Task Does not updated!", "", "info");

            }

        });

    }

    return (

        <section className="my-5 home">

            <Container>

                {loading ? 
                
                <div className="spinner-border text-primary spinner" role="status">

                    <span className="sr-only"></span>

                </div> : error ? <h2>Error: { error.message }</h2> : <>

                <div className="mb-3 d-flex justify-content-between align-items-center">
                    
                <h2 className="main-heading mb-0">Just Do It</h2>

                <Link to={"/"}>
                    
                    <Button variant="primary" className="me-2">All Tasks</Button>
                    
                </Link>

                </div>
                
                <Form 
                
                    type="update"

                    error={ _error }

                    handler={ handleUpdateTask }

                    todo={ data.findTodoById }

                /></>}

            </Container>
        
        </section>

    );

}

export default UpdateTask;
