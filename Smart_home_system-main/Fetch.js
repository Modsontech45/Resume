const esp32_ip = "http://192.168.137.126"; // Replace with your ESP32 IP address

// Function to control the LED state
function controlLED(pin, state) {
  const url = `${esp32_ip}/gpio/${pin}/${state}`; // Construct the URL to control the LED

  fetch(url) // Send a request to the ESP32
    .then((response) => response.text()) // Parse the response as text
    .then((responseState) => {
      // Update the output state for the LED based on the response
      document.getElementById(`output${pin}State`).textContent = responseState;
      document.getElementById(`toggle${pin}`).checked = responseState === "on"; // Set checkbox state
    })
    .catch((error) => console.error("Control LED Error:", error)); // Log errors if any occur
}

// Function to fetch data from ESP32
async function fetchData() {
  try {
    const response = await fetch(`${esp32_ip}/status`); // Fetch status from ESP32
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    // Update the state spans based on the fetched data
    document.getElementById("output12State").textContent = data.output12;
    document.getElementById("output14State").textContent = data.output14;
    document.getElementById("output21State").textContent = data.output21;
    document.getElementById("output18State").textContent = data.output18;
    document.getElementById("output19State").textContent = data.output19;

    // Update the checkbox states based on the fetched data
    document.getElementById("toggle12").checked = data.output12 === "on";
    document.getElementById("toggle14").checked = data.output14 === "on";
    document.getElementById("toggle21").checked = data.output21 === "on";
    document.getElementById("toggle18").checked = data.output18 === "on";
    document.getElementById("toggle19").checked = data.output19 === "on";

    // Update status label based on the response
    const statusLabel = document.getElementById("statusLabel");

    // Update the text content
    statusLabel.textContent = "online";

    // Apply some styles
    statusLabel.style.margin = "20px 0px"
    statusLabel.style.color = "green";        // Change text color
    statusLabel.style.fontSize = "20px";      // Change font size
    statusLabel.style.fontWeight = "bold";    // Make text bold
    statusLabel.style.backgroundColor = "#f0f0f0"; // Add a background color
    statusLabel.style.padding = "10px";       // Add some padding
    statusLabel.style.borderRadius = "5px";   // Add rounded corners


    return {
      temperature: data.temperature,
      humidity: data.humidity,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("statusLabel").textContent = "offline";
    document.getElementById("data").innerHTML = "Error fetching data.";
  }
}

// Function to update gauges and charts with sensor data
function updateGauges(humidity, temperature) {
  drawGauge(document.getElementById("humidity-gauge"), humidity, "%H");
  drawGauge(document.getElementById("temperature-gauge"), temperature, "°C");
  // Update the value displays
  document.getElementById("humidity-value").innerText = `${humidity} %H`;
  document.getElementById("temperature-value").innerText = `${temperature} °C`;
}

// Function to draw a gauge on the specified element
function drawGauge(element, value, unit) {
  element.innerHTML = `
            <svg viewBox="0 0 100 50">
                <path d="M 10 40 Q 50 0 90 40" stroke="#333" stroke-width="10" fill="none"/>
                <path d="M 10 40 Q 50 0 90 40" stroke="${
                  value > 50 ? "#ff0000" : "#00ff00"
                }" stroke-width="10" stroke-dasharray="${(value / 100) * 80} ${
    80 - (value / 100) * 80
  }" fill="none"/>
                <text x="50" y="45" text-anchor="middle" fill="#fff" font-size="10">${value} ${unit}</text>
            </svg>
        `;
}

// Add event listener for DOMContentLoaded to initialize the charts
document.addEventListener("DOMContentLoaded", () => {
  const humidityChartCtx = document
    .getElementById("humidity-chart")
    .getContext("2d"); // Get the chart context
  const temperatureChartCtx = document
    .getElementById("temperature-chart")
    .getContext("2d"); // Get the chart context

  let humidityData = []; // Array to hold humidity data
  let temperatureData = []; // Array to hold temperature data

  // Initialize humidity and temperature charts
  const humidityChart = new Chart(humidityChartCtx, {
    type: "line",
    data: {
      labels: Array(12).fill(""), // Initialize labels for 12 data points
      datasets: [
        {
          label: "Current Humidity",
          data: humidityData,
          borderColor: "#ffcc00",
          backgroundColor: "rgba(255, 204, 0, 0.1)",
          fill: true,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100, // Max value for humidity
        },
      },
    },
  });

  const temperatureChart = new Chart(temperatureChartCtx, {
    type: "line",
    data: {
      labels: Array(12).fill(""), // Initialize labels for 12 data points
      datasets: [
        {
          label: "Current Temperature",
          data: temperatureData,
          borderColor: "#00ff00",
          backgroundColor: "rgba(0, 255, 0, 0.1)",
          fill: true,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 50, // Max value for temperature
        },
      },
    },
  });

  // Function to manually set humidity and temperature values
  function setValues(humidity, temperature) {
    updateGauges(humidity, temperature);
    // update humidity chart
    updateChart(humidityChart, humidityData, humidity);
    //update temp chart
    updateChart(temperatureChart, temperatureData, temperature);
  }

  // Function to update the chart with new data
  function updateChart(chart, data, value) {
    if (data.length >= 12) {
      data.shift(); // Remove the oldest value if we have more than 12
    }
    data.push(value); // Add the new value
    chart.update(); // Update the chart display
  }

  // Example: Manually setting values
  // Replace these values with your own inputs
  setInterval(async () => {
    const result = await fetchData();
    setValues(result.humidity, result.temperature);
    console.log(result);
  }, 2000); // Fetch data every 5 seconds
});


const sideBar = document.getElementById("bar"); // Hamburger icon or button to open sidebar

if (sideBar) {
    sideBar.addEventListener('click', () => {
        const sidebarElement = document.querySelector('.sidebar');
        sidebarElement.style.display = sidebarElement.style.display === 'none' ? 'block' : 'none';
    });
}
