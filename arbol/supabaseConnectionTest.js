import { supabase } from './arbol_edu/src/lib/supabase.ts'; // Updated path to include .ts extension

// Function to test Supabase connection
async function testSupabaseConnection() {
  const { data, error } = await supabase
    .from('your_table_name') // Replace with your actual table name
    .select('*');

  if (error) {
    console.error('Error fetching data:', error);
  } else {
    console.log('Data fetched successfully:', data);
  }
}

// Run the test
testSupabaseConnection();
