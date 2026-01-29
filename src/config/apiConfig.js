const config = {
    api: {
        baseUrl: "https://lnfrp.onrender.com/items",
        apiKey: "YOUR_API_KEY_HERE",
        timeout: 1000,
    },
    database: {
        host: "db.example.com",
        port: 5432,
        username: "admin",
        password: "secure_password_placeholder",
        name: "lost_and_found_db"
    },
    admin: {
        dashboardUrl: "/admin/dashboard",
    },

    auth: {
        loginEndpoint: "/auth/login",
        registerEndpoint: "/auth/register"
    }
};

export default config;
