import { Button, Container } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

import Form from "../components/Form";

import { useCreateTodo } from "../hooks/useCreateTodo";

import { useState } from "react";

import useError, { ErrorType } from "../hooks/useError";

import Swal from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const AddTask = () => {

    const [createTodo] = useCreateTodo();

    const [errorMsg, setErrorMsg] = useState("");

    const [err, setError] = useError(errorMsg);

    const navigate = useNavigate();

    const handlAddTask = (
        
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

                createTodo({

                    variables: {
        
                        todoInput: {
        
                            todoTitle: taskTitle,
        
                            todoDesc: taskDesc
        
                        }
        
                    }
        
                }).then(() => {
        
                    resetTaskTitle();
        
                    resetTaskDesc();
            
                    navigate("/");

                    MySwal.fire("Added!", "", "success");
        
                }).catch(error => {
        
                    setErrorMsg(error?.graphQLErrors[0].message);

                    MySwal.fire(`Validation Exceptions!`, "", "error");
        
                });

            } else if (result.isDismissed) {

                MySwal.fire("Task Does not added!", "", "info");

            }

        });

    }

    return (

        <section className="my-5">

            <Container>

                <div className="mb-3 d-flex justify-content-between align-items-center">

                    <h2 className="main-heading mb-0">Just Do It</h2>

                    <Link to={"/"}>
                    
                        <Button variant="primary" className="me-2">All Tasks</Button>
                    
                    </Link>

                </div>

                <Form 
                
                    type="add"

                    error={ err }
                    
                    handler={ handlAddTask } 
                
                />

            </Container>
        
        </section>

    );

}

export default AddTask;
