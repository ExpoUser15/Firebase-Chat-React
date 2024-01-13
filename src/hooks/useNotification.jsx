export const useNotification = (capt) => {
    const notif = document.getElementById('notif');
    const p = document.getElementById('capt');
    notif.style.top = "50px";
    p.textContent = capt;
    setTimeout(() => {
        notif.style.top = "-70px";
    }, 2500)

}