import { ReactNode, useReducer } from "react";
import { createContext } from "react";

interface MenuTypesProviderProps{
    index?: number;
    state?:any;
    children?: ReactNode
}
export const MenuTypes = createContext<number>(1);


function reducer (state:number, action:any){

    return action.type === 'MENU_SELECTED'? state = action.payload: state 
}

export function MenuTypesProvider ( props: MenuTypesProviderProps ){

   const [state, dispatch] = useReducer(reducer, 1)

    return (
        <MenuTypes.Provider value={{ state, dispatch }}>
            {props.children}
        </MenuTypes.Provider>
    );
}
