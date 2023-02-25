const endpoints = {
  userProfile: `https://api.spacetraders.io/my/account?token=`,
  serverState: `https://api.spacetraders.io/game/status`,
  createUser: `https://api.spacetraders.io/users/`,
  claimLoan: `https://api.spacetraders.io/my/loans?token=`,
  aviableLoan: `https://api.spacetraders.io/types/loans?token=`,
  ships: `https://api.spacetraders.io/systems/OE/ship-listings?token=`,
};

export const getUser = async (token) => {
  try {
    const response = await fetch(`${endpoints.userProfile}${token}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getShips = async (token) => {
  try {
    const response = await fetch(`${endpoints.ships}${token}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getServerState = async () => {
  try {
    const response = await fetch(endpoints.serverState);
    const data = await response.json();

    return (
      data.status == "spacetraders is currently online and available to play"
    );
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (user) => {
  try {
    const response = await fetch(`${endpoints.createUser}${user}/claim`, {
      method: "POST",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getLoans = async (token) => {
  try {
    const response = await fetch(`${endpoints.aviableLoan}${token}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const takeLoan = async (token, type) => {
  try {
    const data = await fetch(
      `https://api.spacetraders.io/my/loans?token=${token}&type=${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
    return data;
  } catch (error) {
    console.error(error);
  }
};
