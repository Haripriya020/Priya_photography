const loginForm =
    document.getElementById("loginForm");

const loginResult =
    document.getElementById("loginResult");


loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;


    loginResult.textContent =
        "Signing in...";


    try {

        const response = await fetch(
            "/api/admin/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        );


        if (!response.ok) {
            throw new Error("Login request failed");
        }


        const message =
            await response.text();


        if (message === "Login successful") {

            loginResult.textContent =
                "Login successful!";

            loginResult.style.color =
                "#7CFC98";


            setTimeout(() => {

                window.location.href =
                    "/admin/dashboard.html";

            }, 800);

        } else {

            loginResult.textContent =
                "Invalid username or password.";

            loginResult.style.color =
                "#ff7777";
        }


    } catch (error) {

        console.error(error);

        loginResult.textContent =
            "Unable to connect to server.";

        loginResult.style.color =
            "#ff7777";
    }

});