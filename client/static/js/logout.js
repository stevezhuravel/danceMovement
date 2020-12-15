const logoutButton = document.getElementById("logout")
const API_URL = "http://localhost:5000/api/logout"

logoutButton.addEventListener("click", async () => {
    await fetch(API_URL, {
        method: "DELETE"
    })
})