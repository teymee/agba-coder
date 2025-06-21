export const truncateString = (str, length, isBackwards = false) => {
  if (!str || !str.length > length) return str;
  if (isBackwards) {
    return str.slice(str.length - length, str.length);
  } else {
    return str.slice(0, length);
  }
};

export const timeConverstion = (time) => {
  if (!time) return "";
  const totalMinutes = Math.floor(time * 60);
  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  let result = '';
  if (hrs > 0) {
    result += `${hrs} hour${hrs !== 1 ? 's' : ''}`;
  }
  if (mins > 0) {
    if (hrs > 0) result += ' '; // Add space between hours and minutes if both exist
    result += `${mins} minute${mins !== 1 ? 's' : ''}`;
  }

  return result || '0 minutes';
};
