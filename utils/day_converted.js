
/**
 * Format current date with Vietnamese day name
 * @returns {string} - Formatted date string
 */
function convertDayToVietnamese() {
    const now = new Date();
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    
    const dayName = days[now.getDay()];
    const day = now.getDate().toString().padStart(2, '0');
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const time = now.toLocaleTimeString('vi-VN', { hour12: false });
    
    return `${dayName}, ${day}/${month}/${year} - ${time}`;
  }
  

module.exports = {
    convertDayToVietnamese
}