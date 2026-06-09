# EcoTrack - Carbon Footprint Awareness Platform

**PromptWars Virtual - Main Challenge 3 Submission**

EcoTrack is a modern, personalized web platform designed to help individuals understand, track, and reduce their carbon footprint through simple actions and personalized AI-driven insights. 

## Chosen Vertical / Persona
**Persona**: The Eco-conscious individual looking for actionable, everyday insights.
**Logic**: The application uses standard conversion metrics to calculate a daily carbon footprint based on Transport, Energy, and Food habits. It then leverages the Gemini API to provide an intelligent, context-aware AI Assistant that gives tailored advice on how to reduce this specific footprint.

## Approach and Logic
1. **Calculate**: Users input their daily car miles, yearly flight hours, home electricity usage, and diet type. The app calculates their carbon footprint in kg CO₂e.
2. **Visualize**: The dashboard provides a visual breakdown of the user's footprint across Transport, Energy, and Food categories.
3. **Assist**: The integrated Gemini AI assistant reads the user's footprint context and provides intelligent, personalized strategies for reducing emissions.

## How the Solution Works
- **Frontend**: Built with React and Vite for optimal performance and a clean, responsive single-page application experience.
- **Styling**: Utilizes modern UI/UX principles including glassmorphism, dark mode, smooth gradients, and micro-animations implemented purely in Vanilla CSS.
- **AI Integration**: Uses the `@google/generative-ai` SDK to connect to the Gemini API (`gemini-1.5-flash`), passing the user's calculated footprint as context for smart recommendations.

## Assumptions Made
- The app assumes average conversion rates for calculation: 
  - 0.4 kg CO2 per mile driven
  - 90 kg CO2 per flight hour
  - 0.38 kg CO2 per kWh electricity
  - Fixed daily average kg CO2 for different diet types (Vegan: 2.9kg, Vegetarian: 3.8kg, Average: 5.6kg, Meat-heavy: 7.2kg)
- The Gemini API key provided is active and valid for the demo.
- Local Storage is sufficient for persisting user footprint data across sessions without requiring a full backend database.

## Setup Instructions
To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Ajeethkumar-25/promptwars-carbon.git
   cd promptwars-carbon
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

*Note: The project size is heavily optimized and the repository size is well under the 10 MB limit.*
