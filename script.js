document.addEventListener("DOMContentLoaded", () => {
    let taskCount = 6;
    let completedCount = 23;
    const taskCountElement = document.getElementById("task-count");
    const completedCountElement = document.getElementById("completed-count");
    const activityLogElement = document.getElementById("activity-log");
    const completeButtons = document.querySelectorAll(".complete-btn");
    const clearHistoryButton = document.getElementById("clear-history");
    const imageElement = document.querySelector(".bg-blue-100 img");
    const colors = ["#fef3c7", "#d1fae5", "#f3e8ff", "#e0f2fe"];
    let colorIndex = 0;
    completeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const taskName = this.getAttribute("data-task");
            alert(`Board Updated`);
            if (taskCount > 0) {
                taskCount--;
                completedCount++;
                taskCountElement.textContent = taskCount.toString().padStart(2, "0");
                completedCountElement.textContent = completedCount;
                addActivityLog(taskName);
                this.disabled = true;
                this.classList.remove("bg-blue-600");
                this.classList.add("bg-gray-400");
            }
        });
    });

    clearHistoryButton.addEventListener("click", () => {
        activityLogElement.innerHTML = "";
    });

    function addActivityLog(taskName) {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const time = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        const timeString = `${formattedHours}:${minutes} ${time}`;
        const logEntry = document.createElement("div");
        logEntry.className = "text-sm";
        logEntry.innerHTML = `
            <p class="text-gray-700">You have completed the task <span class="font-medium">${taskName}</span></p>
            <p class="text-gray-500 text-xs">at ${timeString}</p>
        `;

        activityLogElement.prepend(logEntry);
    }

    imageElement.addEventListener("click", () => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    });
});


function updateDate() {
    const dateElement = document.getElementById("date");
    const weekdayElement = document.getElementById("weekday");

    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);

    const [weekday, month, day, year] = formattedDate.split(" ");

    weekdayElement.textContent = `${weekday},`;
    dateElement.textContent = `${month} ${day} ${year}`;
}

updateDate();
setInterval(updateDate, 1000 * 60);