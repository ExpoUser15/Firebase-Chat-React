export default function useTime(){
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const formatHour = hour < 10 ? "0" + hour : hour;
    const formatMin = min < 10 ? "0" + min : min;
    return `${formatHour}.${formatMin}`;
}