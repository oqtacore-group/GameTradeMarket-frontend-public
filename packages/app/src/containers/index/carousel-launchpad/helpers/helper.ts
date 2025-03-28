export function showRemainingTime(date: any, hours: any, minutes: any) {
  const eventDate = new Date(date);
  eventDate.setHours(hours);
  eventDate.setMinutes(minutes);

  const formatNumber = (number: any) => {
    return number.toString().padStart(2, '0');
  };

  const currentDate = new Date();

  const timeDifference = eventDate.getTime() - currentDate.getTime();

  if (timeDifference > 0) {
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    const formattedHours = formatNumber(hours);
    const formattedMinutes = formatNumber(minutes);
    const formattedSeconds = formatNumber(seconds);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
}
