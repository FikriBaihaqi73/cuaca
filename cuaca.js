 // Fungsi untuk mendapatkan tanggal hari ini dalam format yang diinginkan
 function getFormattedDate() {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const date = new Date();
    const day = days[date.getDay()];
    const dayNum = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day}, ${dayNum} ${month} ${year}`;
}

// Tampilkan tanggal saat ini
document.getElementById('date').innerText = getFormattedDate();

// Ganti dengan API key OpenWeatherMap Anda
const apiKey = "e472b38d4b0bca0c24deca327edac5c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=id&q=";

// Fungsi untuk menampilkan ikon cuaca yang sesuai
function getWeatherIcon(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Fungsi untuk mendapatkan data cuaca
async function checkWeather() {
    const cityInput = document.getElementById('city-input').value;
    
    if (!cityInput) {
        alert("Silakan masukkan nama kota!");
        return;
    }
    
    try {
        const response = await fetch(apiUrl + cityInput + `&appid=${apiKey}`);
        const data = await response.json();
        
        if (data.cod === "404") {
            document.getElementById('error').style.display = "block";
            document.querySelector('.weather-info').style.display = "none";
            return;
        }
        
        document.getElementById('error').style.display = "none";
        document.querySelector('.weather-info').style.display = "block";
        
        document.getElementById('location').innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById('description').innerText = data.weather[0].description;
        document.getElementById('humidity').innerText = `${data.main.humidity}%`;
        document.getElementById('wind').innerText = `${data.wind.speed} km/j`;
        
        // Ganti URL placeholder dengan URL icon cuaca sebenarnya
        document.getElementById('weather-icon').src = getWeatherIcon(data.weather[0].icon);
        
        // Ubah background berdasarkan kondisi cuaca
        const weatherCondition = data.weather[0].main.toLowerCase();
        let bgColor;
        
        if (weatherCondition.includes('cloud')) {
            bgColor = "linear-gradient(135deg, #636FA4, #E8CBC0)";
        } else if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
            bgColor = "linear-gradient(135deg, #3C3B3F, #605C3C)";
        } else if (weatherCondition.includes('clear')) {
            bgColor = "linear-gradient(135deg, #56CCF2, #2F80ED)";
        } else if (weatherCondition.includes('snow')) {
            bgColor = "linear-gradient(135deg, #E6DADA, #274046)";
        } else {
            bgColor = "linear-gradient(135deg, #00b4db, #0083b0)";
        }
        
        document.body.style.background = bgColor;
        
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Terjadi kesalahan. Silakan coba lagi nanti.");
    }
}

// Inisialisasi dengan cuaca Jakarta
window.onload = function() {
    document.getElementById('city-input').value = "Jakarta";
    checkWeather();
    
    // Tambahkan event listener untuk tombol Enter
    document.getElementById('city-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkWeather();
        }
    });
};