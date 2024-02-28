export const $fetch = async (route, method = "GET", body) => {
    const url = new URL("http://booksserver/api" + route);
    const headers = {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    };

    if (method === "GET") {
        url.search = new URLSearchParams(body ?? {});
    }

    const response = await fetch(url, method, headers);

    return await handleResponse(response);
}

const handleResponse = async (response) => {
    if (response.status >= 200 && response.status < 400) {
        return await response.json();
    }

    if (response.status >= 400 && response.status < 500) {
        const data = await response.json();
        sendNotification(data);
        return false;
    }

    if (response.status >= 500) {
        alert("Server error!");
    }
}

const sendNotification = (data) => {
    if (data?.error?.errors) {
        const notification = document.createElement("div");
        notification.classList.add("notification");
        notification.id = String(Math.random() * Math.random());
        notification.innerHTML = Object.values(data?.error?.errors).join("<br/>");

        return setTimeout(() => {
            document.getElementById(notification.id).remove();
        }, 3000);
    }

    if (data?.error?.message) {
        const notification = document.createElement("div");
        notification.classList.add("notification");
        notification.id = String(Math.random() * Math.random());
        notification.innerHTML = data?.error?.message;

        return setTimeout(() => {
            document.getElementById(notification.id).remove();
        }, 3000);
    }
}