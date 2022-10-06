const generateKey = (id) => {
  return `${id}-${new Date().getTime()}`;
};
export default generateKey;
