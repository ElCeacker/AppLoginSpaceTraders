import * as credentials from '../credentials.json'

const endpoints = {
    userProfile: `https://api.spacetraders.io/my/account?token=${credentials.token}`,
    serverState: `https://api.spacetraders.io/game/status`,
}

export const getUserProfile = async () => {
    try {
        const response = await fetch(endpoints.userProfile);
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