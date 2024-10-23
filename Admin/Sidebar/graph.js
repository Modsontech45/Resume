const canvas = document.getElementById('salesChart');
const ctx = canvas.getContext('2d');

// Adjust canvas size for responsiveness
canvas.width = window.innerWidth < 600 ? window.innerWidth - 40 : 400; // Use 400px width for larger screens

const salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Total Sales', 'Total Expenses', 'Total Income'],
        datasets: [{
            label: 'Amount (Ghc)',
            data: [234908, 23908, 20908],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Update canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth < 600 ? window.innerWidth - 40 : 400;
    salesChart.resize();
});
