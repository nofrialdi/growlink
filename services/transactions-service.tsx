import axios from "axios";

export const getListTransactions = async () => {
  let response = null;
  let bearer = "";

  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      bearer = `Bearer ${accessToken}`;

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
  } else {
    response = { error: "localStorage not available on the server" };
  }

  return response;
};

export const getListYields = async () => {
  let response = null;
  let bearer = "";

  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      bearer = `Bearer ${accessToken}`;

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
  } else {
    response = { error: "localStorage not available on the server" };
  }

  return response;
};
