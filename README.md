# FoodScan - Menu Nutrition Scanner

FoodScan is a mobile application built with React Native and Expo that allows users to scan restaurant menus and get detailed nutritional information about each dish. The app uses OpenAI's image analysis capabilities to extract dishes from menus and provide estimated nutritional facts.

## Features

- 📸 Scan restaurant menus using your phone's camera
- 📊 Get detailed nutritional information for each dish
- 🔍 Filter dishes by nutritional attributes (high protein, low carb)
- 📱 Beautiful, modern UI with intuitive navigation
- 🚀 Real-time progress tracking for menu analysis

## Screenshots

(Screenshots will be added here)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or newer)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- OpenAI API Key - Get yours at [OpenAI Platform](https://platform.openai.com/api-keys)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/LucasAonzo/FoodScan.git
cd FoodScan
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:

```bash
npx expo start
```

## Tech Stack

- React Native & Expo
- TypeScript
- OpenAI API for menu analysis
- React Navigation for routing
- Animated API for animations

## Project Structure

- `/app` - Expo Router app directory
- `/src` - Source code
  - `/config` - Configuration files
  - `/hooks` - Custom React hooks
  - `/services` - API service files
  - `/types` - TypeScript type definitions
- `/assets` - Static assets like images and fonts

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [OpenAI](https://openai.com/) for providing the image analysis API
- [Expo](https://expo.dev/) for making React Native development easier

## Contact

Lucas Aonzo - [@LucasAonzo](https://github.com/LucasAonzo)