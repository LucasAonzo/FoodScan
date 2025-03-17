# FoodScan

FoodScan is a mobile app that helps users make informed dietary decisions by scanning restaurant menus and providing nutritional information for each dish.

## Features

- **Menu Scanning**: Take a photo of a restaurant menu and get instant nutritional analysis
- **Nutritional Information**: View calories, protein, carbs, and fat content for each menu item
- **Filter Options**: Filter menu items by nutritional criteria (high protein, low calorie, low carb)
- **User Profiles**: Save preferences and track your dietary history

## Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **AI Integration**: OpenAI API for menu analysis
- **UI Components**: Native components with custom styling

## Installation

1. Clone the repository:
```
git clone https://github.com/LucasAonzo/FoodScan.git
cd FoodScan
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the root directory with your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:
```
npx expo start
```

## Project Structure

- `/app`: Expo Router app directory
  - `/(tabs)`: Tab navigation screens
  - `/results.tsx`: Results screen
- `/src`: Main source code
  - `/components`: Reusable UI components
  - `/config`: Configuration files
  - `/hooks`: Custom React hooks
  - `/screens`: Screen components
  - `/services`: API services
  - `/types`: TypeScript type definitions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenAI for providing the API used for menu analysis
- Expo team for the wonderful React Native development tools