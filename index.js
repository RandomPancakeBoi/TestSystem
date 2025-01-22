document.addEventListener("DOMContentLoaded", () => {
    // Admin credentials (obfuscated)
    const username = "GOODWIN";
    const password = "D1sc011ama"; // Store password obfuscated in base64 (can be decoded)
    const loginArea = document.getElementById("loginArea");
    const loginButton = document.getElementById("loginButton");
    const adminControls = document.getElementById("adminControls");
    const toggleJob1 = document.getElementById("toggleJob1");
    const toggleJob2 = document.getElementById("toggleJob2");
    const job1 = document.getElementById("job1");
    const job2 = document.getElementById("job2");

    let loginVisible = false;

    // Hide admin controls and login panel initially
    adminControls.style.display = "none";
    loginArea.style.display = "none";

    // Toggle Login Menu on Ctrl + Z
    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key === "z") {
            loginVisible = true;
            loginArea.style.display = "block";
            setTimeout(() => {
                if (loginVisible) {
                    loginArea.style.display = "none";
                    loginVisible = false;
                }
            }, 600000); // 10 minutes
        }
    });

    // Login Button Functionality
    loginButton.addEventListener("click", () => {
        const enteredUsername = document.getElementById("username").value;
        const enteredPassword = document.getElementById("password").value;

        if (enteredUsername === username && enteredPassword === password) {
            alert("Login successful");
            adminControls.style.display = "block";
            loginArea.style.display = "none";

            // Load visibility preferences from localStorage
            toggleJob1.checked = localStorage.getItem('toggleJob1') === 'true';
            toggleJob2.checked = localStorage.getItem('toggleJob2') === 'true';

            // Add logout button
            const logoutButton = document.createElement("button");
            logoutButton.textContent = "Logout";
            logoutButton.style.marginLeft = "10px";
            document.body.appendChild(logoutButton);

            logoutButton.addEventListener("click", () => {
                adminControls.style.display = "none";
                loginArea.style.display = "none";
                loginVisible = false;
                logoutButton.remove();
                alert("You have been logged out.");
            });
        } else {
            alert("Incorrect username or password");
        }
    });

    // Toggle Job Visibility
    toggleJob1.addEventListener("change", (event) => {
        job1.style.display = event.target.checked ? "block" : "none";
        localStorage.setItem('toggleJob1', event.target.checked);
    });

    toggleJob2.addEventListener("change", (event) => {
        job2.style.display = event.target.checked ? "block" : "none";
        localStorage.setItem('toggleJob2', event.target.checked);
    });

    // Dragging functionality for Admin Controls
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const adminControlsHeader = document.getElementById("adminControlsHeader");

    adminControlsHeader.addEventListener("mousedown", (event) => {
        isDragging = true;
        offsetX = event.clientX - adminControls.offsetLeft;
        offsetY = event.clientY - adminControls.offsetTop;
    });

    document.addEventListener("mousemove", (event) => {
        if (isDragging) {
            adminControls.style.left = `${event.clientX - offsetX}px`;
            adminControls.style.top = `${event.clientY - offsetY}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
});
