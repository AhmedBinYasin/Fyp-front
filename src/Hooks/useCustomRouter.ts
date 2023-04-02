import React, { useReducer, useState } from 'react'

export interface IRouter {
    active: string;
    stack: string[]
}
enum EAction {
    New = 'New',
    Return = 'Return',
}
interface IAction {
    type: EAction;
    payload: string;
}

const reducer = (state: IRouter, action: IAction) => {
    const { type, payload } = action;
    switch (type) {
        case 'New':
            state.active = payload
            state.stack.push(payload)
            return { ...state }
        case 'Return':
            if (state.stack.length > 1) {
                state.active = state.stack[state.stack.length - 2]
                state.stack.pop()
                return { ...state }
            }
            else {
                return { ...state }
            }
        default:
            return state
    }
};
const initialState: IRouter = {
    active: "Home",
    stack: ["Home"],
}

function useCustomRouter() {
    const [Router, dispatch] = useReducer(reducer, initialState);
    const [pullData,pushData]=useState<any>({})
    const open = (relation: string) => { dispatch({ type: EAction.New, payload: relation }) };
    const Return = () => { dispatch({ type: EAction.Return, payload: '' }) };
    const pull=()=>{return pullData};
    const push=(...args:any)=>{return pushData({...args});};
    return {
        Adapter: { open, Return ,pull,push},
        Router: Router
    }
}

export default useCustomRouter

