# Supabase Setup Guide for Next.js

This guide provides the credentials and instructions needed to connect your Next.js application to your Supabase project.

## 1. Credentials

-   **Project URL:** `https://bdackpzzslokqsviwpxm.supabase.co`
-   **Public Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkYWNrcHp6c2xva3Fzdml3cHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NDgzODUsImV4cCI6MjA2NzQyNDM4NX0.ejAUNpg5f3SbbCM-BNIlYRg3W_AQY1rTBmOpURwTnZw`

**Important:** The `anon` key is safe to use in a browser. It allows anonymous access based on the Row Level Security (RLS) policies you have defined.

## 2. Create Environment Variables

To use these credentials securely in your project, you should store them in an environment variable file.

1.  In the root directory of your Next.js project, create a new file named `.env.local`.
2.  Add the following lines to this file:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=https://bdackpzzslokqsviwpxm.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkYWNrcHp6c2xva3Fzdml3cHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NDgzODUsImV4cCI6MjA2NzQyNDM4NX0.ejAUNpg5f3SbbCM-BNIlYRg3W_AQY1rTBmOpURwTnZw
    ```

    *The `NEXT_PUBLIC_` prefix makes these variables accessible in the browser.*

## 3. Initialize the Supabase Client

You can now create a Supabase client instance to interact with your database. A good practice is to create a utility file for this.

**Example (`lib/supabaseClient.js`):**

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

You can now import the `supabase` client anywhere in your application to interact with your database tables.

## 4. Final Database Table

Your Supabase database is now configured with a single table:

-   `public.contact_submissions`: Captures inquiries from your website's contact form. This table is ready to be connected to your contact form.
