export const formatToRupiah = (amount: number) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
    
    return formatter.format(amount).replace('IDR', 'Rp. ');
  };
  

  export const harvestDiffWeek = (harvestDate: string) => {
    const currentDate = new Date();
    const harvestDateUTC = new Date(harvestDate);

    const timeDifference = harvestDateUTC.getTime() - currentDate.getTime();

    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    const weeksDifference = Math.floor(daysDifference / 7);

    return weeksDifference;
};

  
  export const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("id-ID", options as any);
  };

  export const convertISOToDate=(isoDate: string) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    const formattedDate = `${day < 10 ? '0' + day : day}/${
      month < 10 ? '0' + month : month
    }/${year}`;
  
    return formattedDate;
  }