require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdmin() {
  const email = 'admin@esport.ph';
  const password = 'AdminPassword123!';

  console.log(`Attempting to create user: ${email}...`);

  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
    user_metadata: { role: 'admin' }
  });

  if (error) {
    console.error("Error creating user:", error.message);
    
    if (error.message.includes('already been registered')) {
        console.log("User already exists in auth. Let's make sure they are in public.users.");
        const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers();
        if (!usersError) {
            const user = usersData.users.find(u => u.email === email);
            if (user) {
                await insertIntoPublicUsers(user.id, email);
            }
        }
    }
  } else {
    console.log("Successfully created user in Supabase Auth:", data.user.id);
    await insertIntoPublicUsers(data.user.id, email);
  }
}

async function insertIntoPublicUsers(userId, email) {
  const username = email.split('@')[0];
  
  console.log(`Inserting into public.users table...`);
  const { data, error } = await supabase
    .from('users')
    .insert([
      { user_id: userId, username: username, password: 'hashed_password_placeholder', role: 'admin' }
    ]);

  if (error) {
    if (error.code === '23505') {
       console.log("User is already in public.users table.");
    } else {
       console.error("Error inserting into public.users:", error.message);
    }
  } else {
    console.log("Successfully added to public.users!");
  }
}

createAdmin();
