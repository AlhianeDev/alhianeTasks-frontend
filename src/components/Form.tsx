import { ErrorType } from "../hooks/useError";

import { useInput } from "../hooks/useInput";

import { TodoDto } from "../types/TodoTypes";

type FormProps = {

    type: "add" | "update";

    error: ErrorType;

    handler: (
        
        event: React.FormEvent<HTMLFormElement>,
        
        taskTitle: string,

        taskDesc: string,

        resetTaskTitle: () => void,

        resetTaskDesc: () => void,
        
    ) => void;

    todo?: TodoDto;

}

const Form = ({ type, error, handler, todo }: FormProps) => {

    const [taskTitle, bindTaskTitle, resetTaskTitle] = useInput(todo && todo.todoTitle);

    const [taskDesc, bindTaskDesc, resetTaskDesc] = useInput(todo && todo.todoDesc);

    return (

        <form onSubmit={(e) =>
        
            handler(e, taskTitle, taskDesc, resetTaskTitle, resetTaskDesc)}>

            <div className="mb-3">

                <label
                    
                    htmlFor="InputTaskTitle"
                    
                    className="form-label"
                    
                >Task Title</label>

                <input 
                
                    type="text" 
                    
                    className="form-control" 
                    
                    id="InputTaskTitle" 
                    
                    aria-describedby="TaskTitleHelp"

                    { ...bindTaskTitle }
                
                />

                <div id="TaskTitleHelp" className="form-text">{ error.titleError }</div>

            </div>

            <div className="mb-3">

                <label 
                
                    htmlFor="InputTaskDesc" 
                    
                    className="form-label"
                
                >Task Description</label>

                <textarea
                    
                    className="form-control" 
                    
                    id="InputTaskDesc"

                    aria-describedby="TaskDescHelp"

                    { ...bindTaskDesc }

                    style={{ height: "120px" }}
                
                ></textarea>

                <div id="TaskDescHelp" className="form-text">{ error.descError }</div>

            </div>

            <button type="submit" className="btn btn-primary">{

                type === "add" ? "Add Task" : "Update Task" 

            }</button>

        </form>

    );

}

export default Form;
