import { useMutation, useQuery } from "@apollo/client";

import { Button, Col, Container, Row } from "react-bootstrap";

import { Card } from "../components/Card";

import { Link } from "react-router-dom";

import { DELETE_TODO_BY_ID } from "../graphql/mutations/DeleteTodoById";

import { CONFIRM_TODO_BY_ID } from "../graphql/mutations/ConfirmTodo";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Swal from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';

import { Connection, Cursor, Direction, Edge, initialCursor } from "../types/paginationTypes";

import { FIND_TODOS } from "../graphql/queries/FindTodos";

import useLocalStorage from "../hooks/useLocalStorage";

const MySwal = withReactContent(Swal);

const Home = () => {

  const firstUpdate = useRef(false);

  const [cursor, setCursor] = useLocalStorage<Cursor>("cursor", initialCursor);

  const [direction, setDirection] = useLocalStorage<Direction>(
    
    "direction", { prev: 0, current: 1 }
    
  );

  const { loading, error, data } = useQuery<Connection, Cursor>(
    
    FIND_TODOS, { variables: cursor, fetchPolicy: "network-only" }
    
  );

  const [totalTodos, setTotalTodos] = useState(0);

  const [deleteTodoById] = useMutation<void, {todoId: string}>(DELETE_TODO_BY_ID);

  const [confirmTodoById] = useMutation<void, {todoId: string}>(CONFIRM_TODO_BY_ID);

  const deleteTodoByIdAction = useCallback((todoId: string) => {

    MySwal.fire({

      title: "Do you want to delete this task?",

      showDenyButton: false,

      showCancelButton: true,

      confirmButtonText: "Add"

    }).then((result) => {

      if (result.isConfirmed) {

        setDirection({ prev: 0, current: 1 });

        deleteTodoById({
    
          variables: { todoId },

          refetchQueries: [{ query: FIND_TODOS, variables: {initialCursor}}]
        
        }).then(() => {

          setCursor(initialCursor);

          MySwal.fire("Deleted!", "", "success");

        });

      } else if (result.isDismissed) {

          MySwal.fire("Task Does not deleted!", "", "info");

      }

    });

  }, [deleteTodoById, setCursor, setDirection]);

  const confirmTodoByIdAction = useCallback((todoId: string) => {

    confirmTodoById({

      variables: { todoId },
      
      refetchQueries: [ FIND_TODOS ]

    })

  }, [confirmTodoById]);

  const generatePgaesNumbers = useMemo((): number[] => {

    setTotalTodos(data ? data.findTodos.totalTodos : 0);

    const numberOfPages = totalTodos % 3 > 0 ? totalTodos / 3 + 1 : totalTodos / 3;

    const pages = [];

    for (let i = 0; i < Math.floor(numberOfPages); i++) pages.push(i + 1);

    return pages;

  }, [data, totalTodos]);

  useEffect(() => {

    if (firstUpdate.current) {

      if (direction.current > direction.prev) {

        setCursor({ 
        
          first: 3, after: data ? data.findTodos.pageInfo.endCursor : null,
        
          last: 0, before: null, skip: (direction.current - direction.prev) - 1
          
        });

        console.log("skip: " + cursor.skip);

      } else {

        setCursor({ 
        
          first: 0, after: null, skip: ( direction.prev - direction.current) - 1,
        
          last: 3, before: data ? data.findTodos.pageInfo.startCursor : null
          
        });

      }

    } else {

      firstUpdate.current = true;

    }

  }, [direction]);

  return (

    <section className="my-5 home">
      
      <Container>
        
        {loading ? <div className="spinner-border text-primary spinner" role="status">

          <span className="sr-only"></span>
    
        </div> : error ? <p className="msg error">Error: { error.message }</p> : <>

        <div className="mb-3 d-flex justify-content-between align-items-center">

        <h2 className="main-heading mb-0">Just Do It</h2>

        <Link to={"/addTask"}>
          
          <Button variant="primary" className="me-2">Add Task</Button>
          
        </Link>

        </div>

        <div>
        
          <Row className="g-4">{

            totalTodos > 0 ?
          
            data && data.findTodos.edges.map((edge: Edge) => {

              const { node: todo } = edge;
            
              return <Col key={ todo.id } xs={ 12 } md={ 6 } xxl={ 4 }>
            
                <Card

                  id={ todo.id }

                  todoTitle={ todo.todoTitle }

                  todoDesc={ todo.todoDesc }

                  createdAt={ todo.createdAt }

                  updatedAt={ todo.updatedAt }

                  deleteTodoByIdAction={ deleteTodoByIdAction }

                  confirmTodoByIdAction={ confirmTodoByIdAction }

                  isConfirmed={ todo.isConfirmed }

                ></Card>
            
              </Col>
              
            }) : <p className="msg info">No Todos To Show!</p>
              
          }</Row>

          <ul className="d-flex justify-content-center mt-5 pagination gap-3">{
          
            generatePgaesNumbers.map((number) => {

              return <li key={ number }
              
                className="d-flex justify-content-center align-items-center"

                style={{

                  pointerEvents: number === direction.current ? "none" : "initial",

                  backgroundColor: number === direction.current ? "#09CAF0" : "initial",

                  color: number === direction.current ? "white" : "initial",

                }}

                onClick={() => {

                  setDirection({ prev: direction.current, current: number});

                }}
              
              >{ number }</li>

            })
            
          }</ul>

        </div>

        </>}
      
      </Container>
      
    </section>

  );

}

export default Home;
