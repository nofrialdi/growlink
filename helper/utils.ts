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

  export const  convertDateDes=(isoDate: string) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return `${year}-${month}-${day}`;
  }