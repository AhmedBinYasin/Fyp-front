import { useState } from 'react';

function useLocalAuth() {
    const getFromStore = () => {
        let propsString:string = localStorage.getItem('auth')!;
        return  JSON.parse(JSON.stringify(propsString));
      };
    const [state,setState]=useState(getFromStore());
    const saveState = (state:object) => {
        if(state!==undefined){localStorage.setItem('auth', JSON.stringify(state));}
        setState(state);
      };
      return {
        setData: saveState,
        loginData:state
      }
}

export default useLocalAuth