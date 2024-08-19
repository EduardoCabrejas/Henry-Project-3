export const validateDate = (dateString) => {
    const currentDate = new Date();
    const selectedDate = new Date(dateString + "T00:00:00");
    currentDate.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    const isFutureDate = selectedDate > currentDate;
    const currentYear = currentDate.getFullYear();
    const selectedYear = selectedDate.getFullYear();
    const isCurrentYear = selectedYear === currentYear;
    const workDays = [1, 2, 3, 4, 5];
    const dayOfWeek = selectedDate.getUTCDay();
    const isWeekDay = workDays.includes(dayOfWeek);
    return isFutureDate && isCurrentYear && isWeekDay;
};

export const validateTime = (time) => {
    if (time.trim() === '') return false;
    const [hour, minute] = time.split(':').map(Number);
    const isValidHour = hour >= 10 && hour < 20;
    const isWholeHour = minute === 0;
    
    return isValidHour && isWholeHour;
};

export const validateActivity = (activity) => {
    return activity.trim() !== '';
};