'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';

// Step 1: Create Context
const UserContext = createContext(null);

// Step 2: Create custom hook and export
export const useUser = () => useContext(UserContext);

// Step 3: Create main Provider component
export default function Provider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const createNewUser = async () => {
      const {
        data: { user: supabaseUser },
        error: userError
      } = await supabase.auth.getUser();

      if (userError || !supabaseUser) {
        console.log('No authenticated user.');
        setUser(null);
        return;
      }

      // Build custom user object
      const customUser = {
        id: supabaseUser.id,
        email: supabaseUser.email,
        name: supabaseUser.user_metadata?.name || '',
        picture: supabaseUser.user_metadata?.picture || ''
      };

      // Set to context
      setUser(customUser);

      // Check if user exists in DB
      const { data: Users, error } = await supabase
        .from('Users')
        .select('*')
        .eq('email', customUser.email);

      if (error) {
        console.error('Error fetching Users:', error);
        return;
      }

      if (!Users || Users.length === 0) {
        const { error: insertError } = await supabase
          .from('Users')
          .insert([
            {
              name: customUser.name,
              email: customUser.email,
              picture: customUser.picture
            }
          ]);

        if (insertError) {
          console.error('Error inserting user:', insertError);
        } else {
          console.log('Inserted user into DB');
        }
      } else {
        console.log('User already exists:', Users);
      }
    };

    createNewUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}
