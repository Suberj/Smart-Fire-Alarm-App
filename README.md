# Smart Fire Detector System

This is a project for my engineering design class at RPI and is still in progress.

This is a smart fire detector system designed for real-time monitoring and alerting about fire hazards. The system includes features to display air clarity, CO levels, and gas detection. The app is currently in development as part of an engineering design class project.

## Features

- **Real-time Monitoring:** Continuously monitor air quality, CO levels, and gas presence.
- **Dynamic Safety Indicator:** Visual indicators based on safety levels using color coding (Green, Yellow, Red).
- **Multi-language Support:** Available in English, Spanish, French, Mandarin, and Hindi.
- **Profile Management:** Allows users to set and delete profiles, including name, pronouns, and profile picture.
- **Device Linking:** Option to link multiple devices for comprehensive monitoring.
- **Notifications:** Alerts users when the safety variable reaches critical levels.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/smart-fire-detector.git
    cd smart-fire-detector
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Start the application:**
    ```sh
    npm start
    ```

## Usage

Once the application is running, you can navigate through the app using the bottom tab navigator:

- **Home:** Displays the current safety status and allows starting/stopping the safety variable timer.
- **Statistics:** Shows detailed statistics about air clarity, CO levels, and gas presence.
- **Settings:** Manage profile settings, change language, and link devices.

### Home Screen

The Home screen displays the current status of the environment based on the safety variable. Press the power button to start/stop monitoring. 

![](Screenshots/home_green.png)
![](Screenshots/yellow.png)
![](Screenshots/red.png)

### Statistics Screen

The Statistics screen provides detailed information about air clarity, CO levels, and gas presence. The background color and text change dynamically based on the safety status.

![](Screenshots/stats_green.png)

### Settings Screen

The Settings screen allows you to manage your profile, link devices, and select the app language. You can also delete your profile from this screen.

![](Screenshots/settings_green.png)

## Multi-language Support

The app supports multiple languages. You can change the language from the Settings screen. Supported languages include:
- English
- Spanish
- French
- Mandarin
- Hindi

![](Screenshots/language.png)
![](Screenshots/spanish.png)

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [joshsuber3@gmail.com](mailto:your-email@example.com)

Project Link: [https://github.com/your-username/smart-fire-detector](https://github.com/your-username/smart-fire-detector)
