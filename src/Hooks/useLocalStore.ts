import { useState } from "react";

function useLocalStore<type>(identifier: string, Data: any) {
  const getFromStore = (identifier: string) => {
    const propsString: string = localStorage.getItem(identifier)!;
    return JSON.parse(propsString);
  };
  const [state, setState] = useState<type>(getFromStore(identifier));
  const saveState = (Data: any) => {
    if (state !== undefined) { localStorage.setItem(identifier, JSON.stringify(Data)); }
    setState(Data);
  };
  if (!state) {
    saveState(Data)
  }
  return {
    setState: saveState,
    state: state
  }
}

export default useLocalStore;
