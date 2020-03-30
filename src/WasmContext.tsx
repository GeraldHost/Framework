import { useContext, createContext } from "react";

export interface IWasm {
  Deck?: any;
  Hand?: any;
  Game?: any;
}

export const WasmContext = createContext<any>({});
export const useWasm = () => useContext(WasmContext);
