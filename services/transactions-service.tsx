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

export const updateDataPertanian = async (id: string, data: any) => {
  let response = null;
  let bearer = "";

  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      bearer = `Bearer ${accessToken}`;

      try {
        const config = {
          headers: {
            Authorization: bearer,
            "Content-Type": "application/json",
          },
        };

        const updatedData = {
          productId: data?.productId,
          plantingTime: data?.plantingTime,
          harvestTime: data?.harvestTime,
          description: data?.description,
          quantity: parseInt(data?.quantity),
          imageUrl: data?.imageUrl,
          isHarvested: data?.isHarvested,
        };

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_SERVICE_BASE}/yields/${id}`,
          updatedData,
          config
        );
        return response.data;
      } catch (error) {
        console.error("Error:", error);
        return null;
      }
    } else {
      response = { error: "Access token not found" };
    }
  } else {
    response = { error: "localStorage not available on the server" };
  }

  return response;
};
