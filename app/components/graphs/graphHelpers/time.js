export function timeDisplay(timestamp) {
    const date = timestamp.toDate();
    // Extract the hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Format the hours and minutes as a string in H:M format
    const timeString = `${hours}:${minutes.toString().padStart(2, '0')}`;
    return timeString;
}
export function timeDisplayHourly(timestamp) {
    const date = timestamp.toDate();
    
    // Extract the hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the hours and minutes as a string in H:M format
    const timeString = `${hours}:${minutes.toString().padStart(2, '0')}`;
    const showLabelArray = [0, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

    if (showLabelArray.includes(minutes)) {
        return timeString;
    } else {
        return '';
    }
}
export function timeDisplayMonthly(timestamp) {
    const date = timestamp.toDate();
    const day = date.getDate();
  
    const showLabelArray = [1, 5, 10, 15, 20, 25, 30]

    if (showLabelArray.includes(day)) {
        return timeString;
    } else {
        return '';
    }
}
export function timeDisplayYealy(timestamp) {
    const date = timestamp.toDate();    
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed
    // Define an array of month names
    const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    const monthName = monthNames[month - 1]
    return `${monthName}`;
}