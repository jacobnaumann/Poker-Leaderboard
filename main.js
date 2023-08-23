// The URL of the API (replace this when you have the API details)
const API_URL = 'http://example.com/api/leaderboard';

// Fetch data from the API and populate the leaderboard
async function refreshLeaderboard() {
    const leaderboardBody = document.getElementById('leaderboard-body');

    // Check if the table body has any rows
    const hasExistingRows = leaderboardBody.rows.length > 0;

    for (let i = 0; i < 40; i++) {
        const rowBlank = document.createElement('tr');

        // Create Rank cell
        const rankBlank = document.createElement('td');
        rankBlank.textContent = (i + 1);

        // Create Name cell
        const nameBlank = document.createElement('td');
        nameBlank.className = "nameClass";

        // Add the image only if there are no existing rows in the table body
        if (!hasExistingRows) {
            const image = document.createElement('img');
            image.className = "leaderboard-icon";
            if (i === 0) {
                image.src = 'img/one-new.png';
            } else if (i >= 1 && i <= 8) {
                image.src = 'img/two-nine-new.png';
            } else if (i >= 9 && i <= 18) {
                image.src = 'img/ten-nineteen-new.png';
            } else if (i >= 19 && i <= 34) {
                image.src = 'img/twenty-thirtyfive-new.png';
            } else {
                image.src = 'img/transparent-placeholder.png'; // Transparent placeholder
            }
            nameBlank.appendChild(image);
        }

        const nameText = document.createTextNode(getRandomLastName() + ", " + getRandomFirstName());
        nameBlank.appendChild(nameText);

        //Create Points cell
        const pointsBlank = document.createElement('td');
        pointsBlank.textContent = await generateNumber(39 - i, 40 - i);

        //Create Cashes cell
        const cashesBlank = document.createElement('td');
        cashesBlank.textContent = generateNumberCashes(Math.abs(40 - i)/4, (50 - i)/4).toFixed(0);
        
        //Append rest of cells to row
        rowBlank.appendChild(rankBlank);
        rowBlank.appendChild(nameBlank);
        rowBlank.appendChild(pointsBlank);
        rowBlank.appendChild(cashesBlank);
        leaderboardBody.appendChild(rowBlank);

        const ptsBackBlank = document.createElement('td');
        if (i != 0) {
            ptsBackBlank.textContent = (parseFloat(leaderboardBody.rows[0].cells[2].textContent.trim()) - parseFloat(leaderboardBody.rows[i].cells[2].textContent.trim())).toFixed(1);
        } else {
            ptsBackBlank.textContent = 0;
        }        
        rowBlank.appendChild(ptsBackBlank);
    }
}


// Generate Random names 
function getRandomFirstName() {
    const firstNames = [
      "Kai", "Aria", "Emmett", "Nina", "Bryce", "Isla", "Colton", "Elise", "Griffin", "Hazel",
      "Julian", "Lila", "Maddox", "Nora", "Owen", "Piper", "Quinn", "Rowan", "Sawyer", "Tessa",
      "Uriah", "Violet", "Wyatt", "Xiomara", "Yara", "Zane", "Arlo", "Avery", "Bennett", "Camille",
      "Declan", "Elena", "Felix", "Genevieve", "Hudson", "Harper", "Isaiah", "Ivy", "Jasper", "Jade"
    ];  
    const randomIndex = Math.floor(Math.random() * firstNames.length);
    return firstNames[randomIndex];
  }  
  function getRandomLastName() {
    const lastNames = [
      "Anderson", "Brown", "Carter", "Diaz", "Evans", "Foster", "Gonzalez", "Hernandez", "Irwin",
      "Johnson", "Khan", "Lopez", "Martinez", "Nguyen", "Ortega", "Patel", "Quinn", "Rivera",
      "Smith", "Taylor", "Upton", "Vargas", "Williams", "Xu", "Yang", "Zhang", "Adams", "Baker",
      "Cooper", "Dixon", "Edwards", "Fisher", "Gomez", "Harris", "Ingram", "Jackson", "Kim", "Lee",
      "Mendoza", "Nelson"
    ];  
    const randomIndex = Math.floor(Math.random() * lastNames.length);
    return lastNames[randomIndex];
  }

//   Generate random numbers (by index)
function generateNumber(min, max) {
    if (min > max) {
        throw new Error('Min must be less than max.');
    }
    const newMin = min * 10;
    const newMax = max * 10;
    var randomValue = Math.random() * (newMax - newMin) + newMin;
    return parseFloat(randomValue.toFixed(1));
}
function generateNumberCashes(min, max) {
    if (min > max) {
        throw new Error('Min must be less than max.');
    }
    const newMin = min;
    const newMax = max;
    var randomValue = Math.random() * (newMax - newMin) + newMin;
    return parseFloat(randomValue.toFixed(1));
}
function getCurrentDateFormatted() {
    dateSpan = document.getElementById("updated");
    const date = new Date();

    const day = date.getDate();
    const year = date.getFullYear();

    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];

    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) {
        suffix = "st";
    } else if (day === 2 || day === 22) {
        suffix = "nd";
    } else if (day === 3 || day === 23) {
        suffix = "rd";
    }
    dateSpan.textContent = "";
    dateSpan.textContent = `${month} ${day}${suffix}, ${year}`;
}

// Refresh the leaderboard when the refresh button is clicked
document.getElementById('refresh-button').addEventListener('click', refreshLeaderboard);

// Refresh the leaderboard when the page loads
refreshLeaderboard();
getCurrentDateFormatted();
