/**
 * Application Configuration
 * 
 * This file acts as a placeholder for backend connectivity.
 * In a production environment, these values should be loaded from environment variables (e.g., process.env.REACT_APP_API_KEY).
 */

const config = {
  api: {
    baseUrl: "https://api.example.com/v1", // Placeholder for your API URL
    apiKey: "YOUR_API_KEY_HERE",           // Placeholder for API Key
    timeout: 5000,
  },
  database: {
    host: "db.example.com",                // Placeholder for DB Host
    port: 5432,
    username: "admin",                     // Placeholder for DB User
    password: "secure_password_placeholder", // Placeholder for DB Password
    name: "lost_and_found_db"
  },
  admin: {
    dashboardUrl: "/admin/dashboard",      // Route for future admin dashboard
  }
};

export default config;
