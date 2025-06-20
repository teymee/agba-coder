export const truncateString = (str, length, isBackwards = false) => {
  if (!str || !str.length > length) return str;
  if (isBackwards) {
    return str.slice(str.length - length, str.length);
  } else {
    return str.slice(0, length);
  }
};
