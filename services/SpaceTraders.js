const endpoints = {
    userProfile: `https://api.spacetraders.io/my/account?token=`,
    serverState: `https://api.spacetraders.io/game/status`,
    createUser: `https://api.spacetraders.io/users/`,
    claimLoan: `https://api.spacetraders.io/my/loans?token=`
}

export const getUserProfile = async (token) => {
    try {
        const response = await fetch(`${endpoints.userProfile}${token}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getServerState = async () => {
    try {
        const response = await fetch(endpoints.serverState);
        const data = await response.json();

        return data.status == 'spacetraders is currently online and available to play'
    } catch (error) {
        console.error(error)
    }
}

export const createUser = async (user) => {
    try {
        const response = await fetch(`${endpoints.createUser}${user}/claim`, { method : 'POST' });
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error)
    }
}



export const claimLoan = async (token, type) => {

    // pedir loans necesitas lo siguiente:
    // el tipo
    // el token 

    // primero hagarramos un objeto y le metemos la propiedad type con el tipo dentro
    let payload = {
        type: type
    } 

    // segundo serializamos, a multipart o json en este caso JSON

    payload = JSON.stringify(payload)

    // tercero creamos los headers necesarios para enviar la solicitud en formato JSON
    const headers = {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + token
    }

    // cuarto paso seria hacer el request
    try {
        const response = await fetch(`${endpoints.claimLoan}${token}`, { 
            method : 'POST', 
            body: payload, 
            headers: headers
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error)
        return null 
    }
}