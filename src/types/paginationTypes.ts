import { TodoDto } from "./TodoTypes";

export type Connection = {

    findTodos: {

        totalTodos: number;

        edges: Edge[];
    
        pageInfo: PageInfo;

    }

}

export const initialCursor: Cursor = { 
    
    first: 3,
    
    after: null,
    
    last: 0,
    
    before: null,
    
    skip: 0

}

export type Cursor = {

    first: number;
  
    after: string | null;
  
    last: number;
  
    before: string | null;

    skip: number;
  
}

export type Edge = {

    cursor: string;

    node: TodoDto;

}

export type PageInfo = {

    startCursor: string;

    endCursor: string;

    hasNextPage: boolean ;

    hasPreviousPage: boolean ;

}
  
export type Direction = {
  
    current: number;
  
    prev: number;
  
}
  