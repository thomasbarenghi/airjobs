export const validateUrl = (url: string) => {
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return regex.test(url);
};
