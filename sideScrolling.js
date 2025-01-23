document.addEventListener("DOMContentLoaded", () => {
    const usernameHash = "49202b16fa24d594cedbdeb1111373546a664155207e01f5b41072f78e7fe357";
    const passwordHash = "e391bfc3730373692ba0af0009bd5c212adfead71c1a342be8728da8cb4ab621";

    // Input Fields
    const loginArea = document.getElementById("loginArea");
    const loginButton = document.getElementById("loginButton");
    const adminControls = document.getElementById("adminControls");
    const benefitsText = document.getElementById("benefitsText");

    let loginVisible = false;

    // Hide Admin Controls & Log In
    adminControls.style.display = "none";
    loginArea.style.display = "none";

    async function hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

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
            }, 150000);
        }
    });

    // Login Button Functionality
    loginButton.addEventListener("click", async () => {
        const enteredUsername = document.getElementById("username").value;
        const enteredPassword = document.getElementById("password").value;

        // Hash The Creds
        const enteredUsernameHash = await hashString(enteredUsername);
        const enteredPasswordHash = await hashString(enteredPassword);

        // Compare Creds
        if (enteredUsernameHash === usernameHash && enteredPasswordHash === passwordHash) {
            alert("Login successful");

            // Show Admin Controls
            adminControls.style.display = "block";
            loginArea.style.display = "none";

            benefitsText.style.display = "block"; // Show the benefits text

            // Logout Visuals
            const logoutButton = document.createElement("button");
            logoutButton.textContent = "Logout";
            document.body.appendChild(logoutButton);

            // Styling for the Logout Button
            logoutButton.style.position = "fixed";
            logoutButton.style.bottom = "20px";  // Position at the footer
            logoutButton.style.left = "50%";
            logoutButton.style.transform = "translateX(-50%)";  // Center it horizontally
            logoutButton.style.backgroundColor = "#dc3545";
            logoutButton.style.color = "white";
            logoutButton.style.padding = "10px 20px";
            logoutButton.style.border = "none";
            logoutButton.style.borderRadius = "5px";
            logoutButton.style.cursor = "pointer";
            logoutButton.style.zIndex = "1000";  // Ensure it appears above other elements

            logoutButton.addEventListener("click", () => {
                adminControls.style.display = "none";
                loginArea.style.display = "none";
                benefitsText.style.display = "none";
                loginVisible = false;
                logoutButton.remove();
                alert("You have been logged out.");
            });
        } else {
            alert("Incorrect username or password");
        }
    });

    // Dragging Admin
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


    // Password Toggle Switch
    const togglePassowrd = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');

    togglePassowrd.addEventListener('click', () => {
        // Toggle The Type Between Password And Text
        const type = passwordField.type === 'password' ? 'text' : 'password';
        passwordField.type = type;

        // Change Eye Icon To Show The State
        togglePassowrd.textContent = type === 'password' ? '👁️' : '🙈';
    })
});
