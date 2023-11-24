import axios from "axios";

let response: any;
let bearer = "";

const accessToken = localStorage.getItem("accessToken");
if (accessToken) {
  bearer = `Bearer ${accessToken}`;
}

export const getListTransactions = async () => {
  if (accessToken) {
    const config = {
      headers: {
        Authorization: bearer,
      },
    };

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVICE_BASE}/transactions`,
        config
      );
      response = res.data;
    } catch (error) {
      response = error;
    }
  } else {
    response = { error: "Access token not found" };
  }

  return response;
};

export const getListYields = async () => {
  if (accessToken) {
    const config = {
      headers: {
        Authorization: bearer,
      },
    };

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVICE_BASE}/yields`,
        config
      );
      response = res.data;
    } catch (error) {
      response = error;
    }
  } else {
    response = { error: "Access token not found" };
  }

  return response;
};
