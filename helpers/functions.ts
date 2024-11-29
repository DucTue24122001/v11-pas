import { NavItemEnum } from "@/constants/enum";
import { RecordFormEnum, RecordStatusEnum } from "@/constants/enum";

export const checkIsLiveGame = (game: NavItemEnum) => {
  switch (game) {
    case "LIVEARENA":
      return true;
    case "LIVE":
      return true;
    case "SPORTS":
      return true;
    case "LOTTERY":
      return true;
    case "FH":
      return false;
    case "SLOT":
      return false;
    case "ARCADE":
      return false;
    case "RNGTABLE":
      return false;
    default:
      return true;
  }
}

export const convertDecimalNum = (num: number | undefined) => {
  if (num) {
    return Number(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  } else {
    return 0
  }
};

export function numberWithCommas(x: any) {
  if (typeof x !== "undefined") {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return "";
}

export const convertMoney = (num: string) => {
  return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export function toNormalNum(x: string) {
  return x.split(",").join("");
}

export const getBase64 = (file: any) => {
  return new Promise((resolve) => {
    let baseURL: any = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

export const convertTime = (date: any) => {
  function padTo2Digits(num: number) {
    return String(num).padStart(2, "0");
  }

  const timestamp = Date.parse(date);
  const dateFormat = new Date(timestamp);
  let time: any =
    padTo2Digits(dateFormat.getHours()) +
    ":" +
    padTo2Digits(dateFormat.getMinutes());
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
    time[0] = padTo2Digits(time[0]);
  }
  return time.join(""); // return adjusted time or original string
};

export const checkStatusColor = (status: string) => {
  const checkStatus = status.split(/_| /)
  switch (true) {
    case checkStatus.some(status => (status === RecordStatusEnum.ACCEPT || status === RecordFormEnum.PROMOTION || status === RecordFormEnum.DEPOSIT || status === RecordFormEnum.AFFILIATE)):
      return "#36c96c";
    case checkStatus.some(status => status === RecordStatusEnum.REJECT):
      return "#ce4242";
    case checkStatus.some(status => status === RecordStatusEnum.PENDING):
      return "#aeaeae";
    case checkStatus.some(status => status === RecordFormEnum.WITHDRAW):
      return "#ce4242";
  }
};

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}