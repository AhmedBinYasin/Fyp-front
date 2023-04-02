import { IAdapter } from "./types";

export interface OnClickEventHandle{
    (Active: string, Adapter: IAdapter, To: string): void
}

export function OnClick(Active:string,Adapter:IAdapter,To:string){
    if(Active!==To){
        Adapter.open(To)
    }
}