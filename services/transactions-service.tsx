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

export const harvestDiffTime = async (harvestDate: string) => {
  const currentDate = new Date(); // Tanggal hari ini
  const harvestDateUTC = new Date(harvestDate); // Tanggal harvestTime dalam format UTC

  // Menghitung selisih waktu dalam milidetik
  const timeDifference = harvestDateUTC.getTime() - currentDate.getTime();

  // Menghitung jumlah hari dalam selisih waktu
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  // Menghitung berapa bulan dan sisa hari dalam selisih waktu
  const monthsDifference = Math.floor(daysDifference / 30); // Estimasi 30 hari per bulan
  const weeksDifference = Math.floor((daysDifference % 30) / 7); // Sisa hari dalam minggu

  return { monthsDifference, weeksDifference };
};

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("id-ID", options as any);
};
