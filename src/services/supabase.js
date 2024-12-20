
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://aomneokqfesxugopemru.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvbW5lb2txZmVzeHVnb3BlbXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzMzM5ODAsImV4cCI6MjA0NjkwOTk4MH0.dNMoIaer0UBJo_nli8Sd0eW9HDt8cS1wcOmL7uzTFq0"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;