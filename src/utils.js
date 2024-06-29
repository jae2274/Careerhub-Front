export function convertDateTimeFormat(unixMilli) {
  const time = new Date(unixMilli);
  return `${time.getFullYear()}/${
    time.getMonth() + 1
  }/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
}
