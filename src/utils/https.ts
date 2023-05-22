import axios from 'axios';
import { defaultUrihere } from '../App';

interface PostResponse {
    errors: string;
    Message: string;
    PayLoad: object;
    sucess: boolean;
}

async function post(api: string, Payload: any) {
    const token: string = localStorage.getItem('token')!
    const responce = await axios.post<PostResponse>("http://localhost:5000" + api, Payload, {
        headers: {
            'authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const { errors, Message, sucess, PayLoad } = responce.data
    if (errors) { return { errors: errors,Message:Message } }
    else { return { PayLoad, Message, sucess } }
}

async function get(api: string) {
    const token: string = localStorage.getItem('token')!
    const responce = await axios.get<PostResponse>("http://"+defaultUrihere+":5000" + api, {
        headers: {
            'authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const { errors, Message, sucess, PayLoad } = responce.data
    if (errors) { return { errors: errors, } }
    else { return { PayLoad, Message, sucess } }
}

let https = { post, get }
export default https;