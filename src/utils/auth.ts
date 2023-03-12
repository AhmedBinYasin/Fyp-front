import axios from "axios";

interface PostResponse {
    errors: string;
    Token: string;
    PayLoad: any;
    Message: string;
}

async function login(api: string, loginPayload: object) {
    try {
        const responce = await axios.post<PostResponse>("http://localhost:5000" + api, loginPayload)
        const { errors, Token, PayLoad } = responce.data
        if (errors) { console.log(errors) }
        else {
            console.log(PayLoad)
            localStorage.setItem("token", Token);
            localStorage.setItem("auth", JSON.stringify({ Name: PayLoad.user.Name, Role: PayLoad.user.Role }));
            return { Name: PayLoad.user.Name, Role: PayLoad.user.Role }
        }
    } catch (error) { console.log(error) }
}

async function veri(api: string) {
    const token: string = localStorage.getItem('token')!
    try {
        const responce = await axios.get<PostResponse>("http://localhost:5000" + api, {
            headers: {
                'authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log('q')
        const { errors, Message, Token } = responce.data

        if (errors === "1") {
            console.log(errors)
            return false
        }
        else { localStorage.setItem("token", Token); }
    } catch (error) {
        localStorage.clear()
        console.log(error)
        return false
    }
}

async function logOut() {
    localStorage.clear()
    return { set: false }
}


export { login, veri, logOut }