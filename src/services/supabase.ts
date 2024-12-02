import { createClient } from '@supabase/supabase-js'
import { Database } from 'database.types';
export const supabaseUrl = 'https://gzfhhbqgacncvkaryxwd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6ZmhoYnFnYWNuY3ZrYXJ5eHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwODQ4MjcsImV4cCI6MjA0NDY2MDgyN30.BtB3ef-JwDAwa6b_fIdKKiz09vvJSkeE8hjyQZobOPw'
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase; 
