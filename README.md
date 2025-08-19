# NBA Team Manager

NBA Team Manager is a web application built with Next.js and React that allows users to manage custom NBA teams and players. The app integrates with the [balldontlie API](https://www.balldontlie.io/) to fetch real NBA player data.

## Key Features

- **User Authentication:** Simple username-based login system using Redux for state management.
- **Team Management:** Create, edit, and delete custom teams. Each team has a unique name, region, and country.
- **Player Management:** Browse NBA players (fetched from the balldontlie API) and add them to your custom teams. Players can only belong to one team at a time.
- **Team Roster:** View and manage the list of players assigned to each team. Remove players from teams as needed.
- **Persistent State:** Uses Redux Persist to save teams and authentication state in local storage.
- **Modern UI:** Responsive and user-friendly interface styled with Tailwind CSS.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript
- **State Management:** Redux Toolkit, Redux Persist
- **Forms & Validation:** React Hook Form, Yup
- **API Integration:** balldontlie NBA API SDK, Axios
- **Styling:** Tailwind CSS
- **Linting:** ESLint

## Usage

- Log in with a username.
- Create teams and assign NBA players to them.
- Manage your teams and rosters easily from the dashboard.

---
