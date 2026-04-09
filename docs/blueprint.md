# **App Name**: TorVPN Portal

## Core Features:

- Secure User Authentication: Allow users to register, log in, and manage their authentication status securely using Firebase Authentication.
- VPN Server Browser: Display an interactive list of available VPN servers, showing their current load and latency, fetched in real-time from Firestore. Users can select their preferred server, which will sync across their devices.
- Personalized VPN Settings: Users can manage their VPN client settings (e.g., kill switch, auto-connect, DNS leak protection) from the web interface, with these settings persisted in Firestore.
- Connected Device Monitoring: Show a real-time overview of devices connected to the user's VPN service, their connection status, and basic usage data, leveraging Firebase Realtime Database for cross-device synchronization.
- VPN Configuration Download Tool: Provide a tool that allows users to request or download a personalized WireGuard configuration for their native VPN clients, using the 'generateWgConfig' Firebase Cloud Function which determines optimal IP and server configurations.

## Style Guidelines:

- A sophisticated dark color scheme appropriate for a security and tech-focused application. The primary interactive color is a deep, trustworthy blue (#2259C3).
- The background features a very dark, subtly blue shade (#0A1429), providing a modern and comfortable viewing experience.
- A vibrant cyan (#47D0EB) serves as an accent color, drawing attention to important information, alerts, and calls to action.
- The main typeface for both headlines and body text is 'Inter' (sans-serif), chosen for its excellent readability and neutral, modern aesthetic in digital interfaces.
- For displaying technical configurations, code snippets, or logs, 'Source Code Pro' (monospace) is used to ensure clarity and easy distinction.
- Clean, modern, and minimalistic icons, likely in an outline style, to consistently represent features like connection status, server locations, settings, and security indicators. Use of SVG for scalability and clarity is recommended.
- A structured and intuitive layout, possibly adopting a dashboard approach with clear sectioning for server lists, settings, and device status, prioritizing readability and ease of navigation.
- Subtle and functional animations to provide visual feedback for user interactions, such as state changes for connections, server selections, and data loading indicators, avoiding anything distracting.