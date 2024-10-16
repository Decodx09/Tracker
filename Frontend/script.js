async function fetchAndDisplayData() {
  try {
    // Fetch all data concurrently using Promise.all
    const [response1, response2, response3, response4, response5] = await Promise.all([
      fetch('http://localhost:3000/today-expenditure'),
      fetch('http://localhost:3000/travel'),
      fetch('http://localhost:3000/food'),
      fetch('http://localhost:3000/shopping'),
      fetch('http://localhost:3000/entertainment')
    ]);

    // Convert all responses to JSON concurrently
    const [data1, data2, data3, data4, data5] = await Promise.all([
      response1.json(),
      response2.json(),
      response3.json(),
      response4.json(),
      response5.json()
    ]);

    // Update the UI with fetched data
    const expenditureDataDiv = document.getElementById('expenditure-data');
    expenditureDataDiv.innerHTML = `
      <div class="main-data">
        <div class="main-data-1">
          <div class="outer-data-circle">
            <p class="data-circle">${data1[0]?.money_spent ?? 'N/A'}</p>
          </div>
        </div>
        <div class="main-data-2">
          <p class="data">Travel</p>
          <p class="data">Food</p>
          <p class="data">Shopping</p>
          <p class="data">Entertainment</p>
        </div>
        <div class="main-data-numbers">
         <p>${data2[0]?.Travel_expense ?? 'N/A'}</p>
         <p>${data3[0]?.Food_expense ?? 'N/A'}</p>
         <p>${data4[0]?.Shopping_expense ?? 'N/A'}</p>
         <p>${data5[0]?.Entertainment_expense ?? 'N/A'}</p>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error fetching data:', error);

    // Optional: Update the UI to notify the user of the error
    const expenditureDataDiv = document.getElementById('expenditure-data');
    expenditureDataDiv.innerHTML = `<p class="error-message">Failed to load data. Please try again later.</p>`;
  }
}

fetchAndDisplayData();

const apiEndpoints = {
  Travel: 'http://localhost:3000/travel',
  Food: 'http://localhost:3000/food',
  Shopping: 'http://localhost:3000/shopping',
  Entertainment: 'http://localhost:3000/entertainment'
};


// Colors for each category
const colors = {
  Travel: '#99ccff',         // Red
  Food: '#00e6ac',           // Green
  Shopping: '#ffcc99',       // Blue
  Entertainment: '#ffff80'   // Yellow
};

const chart = document.getElementById('pie-chart');

// Function to create the pie chart after fetching data
async function createPieChart() {
  const data = await fetchExpensesData();
  console.log('Fetched Data:', data); // Debugging log

  if (!data || Object.keys(data).length === 0) {
      console.error('No data fetched');
      return;
  }

  const total = Object.values(data).reduce((sum, value) => sum + value, 0); // Sum of all data
  let cumulativePercent = 0; // To track the cumulative percentage

  Object.entries(data).forEach(([category, value], i) => {
      const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
      cumulativePercent += value / total;
      const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

      // Check if the slice is greater than 50% to draw a large arc
      const largeArcFlag = value / total > 0.5 ? 1 : 0;

      const pathData = [
          `M ${startX} ${startY}`, // Move to start of the slice
          `A 16 16 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Draw arc
          'L 0 0', // Line back to the center
      ].join(' ');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('fill', colors[category]);
      chart.appendChild(path);
  });
}

// Function to fetch all expenses data from the APIs
async function fetchExpensesData() {
  const expenseData = {};

  // Fetch travel data
  await fetch(apiEndpoints.Travel)
      .then(response => response.json())
      .then(data => {
          console.log('Travel Data:', data); // Debugging log
          if (data.length && data[0].Travel_expense) {
              expenseData.Travel = parseFloat(data[0].Travel_expense);
          }
      })
      .catch(error => console.error('Error fetching Travel:', error));

  // Fetch food data
  await fetch(apiEndpoints.Food)
      .then(response => response.json())
      .then(data => {
          console.log('Food Data:', data); // Debugging log
          if (data.length && data[0].Food_expense) {
              expenseData.Food = parseFloat(data[0].Food_expense);
          }
      })
      .catch(error => console.error('Error fetching Food:', error));

  // Fetch shopping data
  await fetch(apiEndpoints.Shopping)
      .then(response => response.json())
      .then(data => {
          console.log('Shopping Data:', data); // Debugging log
          if (data.length && data[0].Shopping_expense) {
              expenseData.Shopping = parseFloat(data[0].Shopping_expense);
          }
      })
      .catch(error => console.error('Error fetching Shopping:', error));

  // Fetch entertainment data
  await fetch(apiEndpoints.Entertainment)
      .then(response => response.json())
      .then(data => {
          console.log('Entertainment Data:', data); // Debugging log
          if (data.length && data[0].Entertainment_expense) {
              expenseData.Entertainment = parseFloat(data[0].Entertainment_expense);
          }
      })
      .catch(error => console.error('Error fetching Entertainment:', error));

  return expenseData;
}

// Helper function to get (x, y) coordinates for a percentage
function getCoordinatesForPercent(percent) {
  const x = Math.cos(2 * Math.PI * percent) * 16;
  const y = Math.sin(2 * Math.PI * percent) * 16;
  return [x, y];
}

// Create the pie chart on page load
createPieChart();