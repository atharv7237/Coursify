// Client-side interactions
document.addEventListener('DOMContentLoaded', () => {
    // Auto-dismiss flash alerts after 6 seconds
    const alerts = document.querySelectorAll('[class*="border-red-500"], [class*="border-emerald-500"]');
    if (alerts && alerts.length > 0) {
        setTimeout(() => {
            alerts.forEach((alert) => {
                alert.parentElement.style.transition = 'opacity 0.5s ease-out';
                alert.parentElement.style.opacity = '0';
                setTimeout(() => alert.parentElement.remove(), 500);
            });
        }, 6000);
    }
});
