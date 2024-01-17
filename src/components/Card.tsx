import { memo } from "react";

import { Button, Card as CardBs } from "react-bootstrap";

import { Link } from "react-router-dom";

type CardProps = {

    id: string;

    todoTitle: string;

    todoDesc: string;

    createdAt: string;

    updatedAt: string;

    deleteTodoByIdAction: (todoId: string) => void; 

    confirmTodoByIdAction: (todoId: string) => void;

    isConfirmed: boolean;

}

export const Card = memo(({ 
  
    id,
    
    todoTitle,
    
    todoDesc,

    createdAt,

    updatedAt,
    
    deleteTodoByIdAction,

    confirmTodoByIdAction,

    isConfirmed

  }: CardProps) => {

  return (

    <CardBs style={{ width: '100%', opacity: isConfirmed ? 0.5 : 1 }}>

      <CardBs.Header className="d-flex justify-content-between align-items-center">

        <CardBs.Title className="mb-0">{ todoTitle }</CardBs.Title>

        <div className="actions">

          {/* REACT SVG ICONS */}

          <Button

            onClick={ () => confirmTodoByIdAction(id) }
            
            className="me-2 btn btn-info"
          
          >

            <svg viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em">
              <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
            </svg>

          </Button>

          <Link to={ `/updateTask/${ id }` }>

            <Button className="btn btn-success">

              <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M1.903 7.297c0 3.044 2.207 5.118 4.686 5.547a.521.521 0 11-.178 1.027C3.5 13.367.861 10.913.861 7.297c0-1.537.699-2.745 1.515-3.663.585-.658 1.254-1.193 1.792-1.602H2.532a.5.5 0 010-1h3a.5.5 0 01.5.5v3a.5.5 0 01-1 0V2.686l-.001.002c-.572.43-1.27.957-1.875 1.638-.715.804-1.253 1.776-1.253 2.97zm11.108.406c0-3.012-2.16-5.073-4.607-5.533a.521.521 0 11.192-1.024c2.874.54 5.457 2.98 5.457 6.557 0 1.537-.699 2.744-1.515 3.663-.585.658-1.254 1.193-1.792 1.602h1.636a.5.5 0 110 1h-3a.5.5 0 01-.5-.5v-3a.5.5 0 111 0v1.845h.002c.571-.432 1.27-.958 1.874-1.64.715-.803 1.253-1.775 1.253-2.97z"
                  clipRule="evenodd"
                />
              </svg>

            </Button>

          </Link>

          <Button
          
            className="btn btn-danger ms-2" 
            
            onClick={ () => deleteTodoByIdAction(id) }
          
          >

            <svg viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em">
              <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
            </svg>

          </Button>

        </div>

      </CardBs.Header>

      <CardBs.Body>

        <CardBs.Text>{ todoDesc }</CardBs.Text>

      </CardBs.Body>

      <CardBs.Footer className="text-center">

        <div className="d-flex justify-content-between">

          <span className="date">{ createdAt && createdAt.split("T")[0] }</span>

          <span className="date">{ updatedAt && updatedAt.split("T")[0] }</span>

        </div>

      </CardBs.Footer>

    </CardBs>


  );

});
