const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

let currentYear = new Date().getFullYear();

const yearDisplay = document.getElementById('yearDisplay');
const monthsContainer = document.getElementById('monthsContainer');

function renderCalendar(year) {
  monthsContainer.innerHTML = '';
  yearDisplay.textContent = year;

  const today = new Date();
  const isCurrentYear = today.getFullYear() === year;

  months.forEach((monthName, monthIndex) => {
    const monthDiv = document.createElement('div');
    monthDiv.classList.add('month');

    const monthTitle = document.createElement('h3');
    monthTitle.textContent = monthName;
    monthDiv.appendChild(monthTitle);

    // Weekdays header
    const weekdaysDiv = document.createElement('div');
    weekdaysDiv.classList.add('weekdays');
    weekdays.forEach(day => {
      const dayDiv = document.createElement('div');
      dayDiv.textContent = day;
      weekdaysDiv.appendChild(dayDiv);
    });
    monthDiv.appendChild(weekdaysDiv);

    // Days
    const daysDiv = document.createElement('div');
    daysDiv.classList.add('days');

    const firstDay = new Date(year, monthIndex, 1).getDay();
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();

    // Empty cells before first day
    for(let i = 0; i < firstDay; i++){
      const emptyDiv = document.createElement('div');
      daysDiv.appendChild(emptyDiv);
    }

    for(let day = 1; day <= totalDays; day++){
      const dayDiv = document.createElement('div');
      dayDiv.textContent = day;

      if(isCurrentYear && monthIndex === today.getMonth() && day === today.getDate()){
        dayDiv.classList.add('today');
      }

      daysDiv.appendChild(dayDiv);
    }

    monthDiv.appendChild(daysDiv);
    monthsContainer.appendChild(monthDiv);
  });
}

// Navigation buttons
document.getElementById('prevYear').addEventListener('click', () => {
  currentYear--;
  renderCalendar(currentYear);
});

document.getElementById('nextYear').addEventListener('click', () => {
  currentYear++;
  renderCalendar(currentYear);
});

// Initial render
renderCalendar(currentYear);