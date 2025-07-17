# **Fantasy Football Project**

A simple Fantasy Football app built with **Next.js**. The app allows users to view and interact with data regarding players, games, and slates, with dynamic filtering, pagination, and a skeleton loader for when data is loading.

## Technology Stack
- **Frontend**: React, Next.js, TypeScript

## **Core Project Files**

- **`Homepage.tsx`**: Serves as the landing page where users can select operators, game types, and slates to filter and view players' data.
- **`Dropdown.tsx`**: Renders a dropdown component for selecting options like operator, game type, and slate name. This is used to filter player data.
- **`PlayerTable.tsx`**: Displays the list of players in a table format.
- **`PlayerDetail.tsx`**: Displays detailed information about the selected player, including player statistics and other relevant details.
- **`Button.tsx`**: A reusable button component that displays icons and text.
- **`Skeleton.tsx`**: Displays a skeleton loader when data is being loaded or when no data is available for display in the `PlayerTable`.
- **`mockData.ts`**: Contains the mock data for the game, including players, slate games, operators, and game types. This is used to populate the dropdowns and tables.

## Preliminary Requirements
Ensure you have the following installed to run the project:
1. **Node.js**: Version 18 or later recommended. Download from [Node.js official website](https://nodejs.org/).
2. **npm or yarn**: Manage dependencies through npm (included with Node.js) or yarn.

If you don't have Node.js installed, follow the [Node.js download and installation guide](https://nodejs.org/).

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Hassaan11/fantasy-football.git
   ```
2. Navigate to the project directory:
   ```bash
   cd fantasy-football
   ```
3. Install the project dependencies:
   ```bash
   npm install
   ```
4. Start the game:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.