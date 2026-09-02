const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function seed() {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 3);

  const { data, error } = await supabase.from('matches').insert([
    {
      team_a_id: '9c1426dc-8a11-437d-a9d8-584fdebb1d62', // GOAT GAMING
      team_b_id: '877e5954-35b3-4a56-bc8c-fd4f62b60003', // XIPTO
      match_schedule: futureDate.toISOString(),
      status: 'scheduled'
    }
  ]).select();
  
  if (error) {
    console.error("Error inserting match:", error);
  } else {
    console.log("Successfully inserted match:", data);
  }
}

seed();
