// Supabase Configuration
// IMPORTANT: Replace these with your actual Supabase project details
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Initialize Supabase client if keys are present
let supabase;
if (typeof createClient !== 'undefined' && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.warn('Supabase is not configured. Please update js/config.js with your credentials.');
}
