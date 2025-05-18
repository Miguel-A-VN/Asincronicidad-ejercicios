// clima.js
const apis = [
  {
    name: "OpenMeteo",
    url: "https://api.open-meteo.com/v1/forecast?latitude=6.25184&longitude=-75.56359&current_weather=true",
    parse: (data) => {
      return `Clima desde Open-Meteo: ${data.current_weather.temperature}°C, Viento ${data.current_weather.windspeed} km/h`;
    }
  },
  {
    name: "Met.no",
    url: "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=6.25184&lon=-75.56359",
    parse: (data) => {
      const details = data.properties.timeseries[0].data.instant.details;
      return `Clima desde Met.no: ${details.air_temperature}°C, Humedad ${details.relative_humidity}%`;
    }
  }
];

// Ejecutar consulta a todas las APIs, pero mostrar solo la primera que responda
async function obtenerClima() {
  const promesas = apis.map(api =>
    fetch(api.url, {
      headers: {
        'User-Agent': 'clima-app/1.0' // Necesario para Met.no
      }
    })
      .then(res => res.json())
      .then(data => api.parse(data))
      .catch(err => `${api.name} falló: ${err.message}`)
  );

  try {
    const resultado = await Promise.race(promesas);
    console.log("Resultado más rápido:");
    console.log(resultado);
  } catch (err) {
    console.error(" No se pudo obtener el clima:", err);
  }
}

obtenerClima();
