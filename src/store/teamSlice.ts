import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Player {
  id: number
  first_name: string
  last_name: string
  position?: string
  team?: {
    full_name: string
  }
}

interface Team {
  id: string
  name: string
  playerCount: number
  region: string
  country: string
  players?: Player[]
}

interface TeamState {
  teams: Team[]
  selectedTeam: Team | null
}

const initialState: TeamState = {
  teams: [],
  selectedTeam: null,
}

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    addTeam(state, action: PayloadAction<Omit<Team, 'id' | 'players'>>) {
      const newTeam: Team = {
        id: Date.now().toString(),
        players: [],
        ...action.payload,
      }
      state.teams.push(newTeam)
    },
    updateTeam(state, action: PayloadAction<Team>) {
      const index = state.teams.findIndex(team => team.id === action.payload.id)
      if (index !== -1) {
        state.teams[index] = action.payload
      }
    },
    deleteTeam(state, action: PayloadAction<string>) {
      state.teams = state.teams.filter(team => team.id !== action.payload)
      if (state.selectedTeam?.id === action.payload) {
        state.selectedTeam = null
      }
    },
    selectTeam(state, action: PayloadAction<string>) {
      state.selectedTeam = state.teams.find(team => team.id === action.payload) || null
    },
    addPlayerToTeam(state, action: PayloadAction<{teamId: string, player: Player}>) {
      const team = state.teams.find(team => team.id === action.payload.teamId)
      if (team) {
        // Ensure players array exists
        if (!team.players) {
          team.players = []
        }
        // Check if player is already in any team
        const playerInOtherTeam = state.teams.some(t => 
          t.players?.some(p => p.id === action.payload.player.id)
          
        )
        if (!playerInOtherTeam) {
          team.players.push(action.payload.player)
          team.playerCount = team.players.length

        }
      }
    },
    removePlayerFromTeam(state, action: PayloadAction<{ teamId: string; playerId: number }>) {
      const team = state.teams.find((team) => team.id === action.payload.teamId);
      if (team) {
        team.players = team.players?.filter((player) => player.id !== action.payload.playerId);
        team.playerCount = team.players ? team.players.length : 0;
        if (state.selectedTeam && state.selectedTeam.id === action.payload.teamId) {
          state.selectedTeam = { ...team }; // Create a new object to trigger re-render
        }
      } else {
        console.error(`Team with ID ${action.payload.teamId} not found.`);
      }
    }
  },
})
export type { Team, Player }
export const { 
  addTeam, 
  updateTeam, 
  deleteTeam, 
  selectTeam,
  addPlayerToTeam,
  removePlayerFromTeam
} = teamSlice.actions
export default teamSlice.reducer