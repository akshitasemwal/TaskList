"use client";

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
//console.log('hi', process.env.SUPABASE_URL);
