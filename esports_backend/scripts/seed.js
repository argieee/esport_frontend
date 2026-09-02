const teamsData = ['WOLF ESPORT', 'GOAT GAMING', 'XIPTO'];
const playersData = {
  'WOLF ESPORT': ['WOLF Player 1', 'WOLF Player 2', 'WOLF Player 3', 'WOLF Player 4', 'WOLF Player 5'],
  'GOAT GAMING': ['GOAT Player 1', 'GOAT Player 2', 'GOAT Player 3', 'GOAT Player 4', 'GOAT Player 5'],
  'XIPTO': ['XIP Hotsauze', 'XIP Emman', 'XIP JA', 'XIP Fixyy', 'XIP Rizza']
};

async function seed() {
  // 1. Get existing teams
  let res = await fetch('http://localhost:5000/api/teams');
  let existingTeams = await res.json();
  
  // 2. Add missing teams
  for (const teamName of teamsData) {
    if (!existingTeams.find(t => t.team_name === teamName)) {
      await fetch('http://localhost:5000/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team_name: teamName })
      });
      console.log(`Added team: ${teamName}`);
    }
  }

  // 3. Get updated teams
  res = await fetch('http://localhost:5000/api/teams');
  const teams = await res.json();

  // 4. Get existing players
  res = await fetch('http://localhost:5000/api/players');
  const existingPlayers = await res.json();

  // 5. Add players
  for (const team of teams) {
    const playersToAdd = playersData[team.team_name] || [];
    for (const playerName of playersToAdd) {
      if (!existingPlayers.find(p => p.player_name === playerName)) {
        await fetch('http://localhost:5000/api/players', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ team_id: team.team_id, player_name: playerName, role_in_game: 'Rifler' })
        });
        console.log(`Added player: ${playerName} to ${team.team_name}`);
      }
    }
  }
  
  console.log("Seed complete.");
}

seed().catch(console.error);
