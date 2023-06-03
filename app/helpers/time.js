// timestamp from firebase Timestamp

export function timeDisplay(timestamp) {
    // Convert the Firestore Timestamp to a JavaScript Date object
    const date = timestamp.toDate();
  
    // Extract the hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Format the hours and minutes as a string in H:M format
    const timeString = `${hours}:${minutes.toString().padStart(2, '0')}`;
  
    return timeString;
}