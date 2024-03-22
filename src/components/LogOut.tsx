<<<<<<< HEAD
'use client';

import React from 'react';
import { supabase } from '@/supabase/supabase';
import { useRouter } from 'next/navigation';
import useStoreState from '@/app/shared/store';
=======
"use client";

import React from "react";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";
import useStoreState from "@/app/shared/store";
>>>>>>> 5abc0844551bcd1a9fa36e519ed1562fe6abad94

const LogOut = () => {
  const { removeUser } = useStoreState();
  const router = useRouter();
  const signOutButton = async () => {
    const session = await supabase.auth.getSession();
    const authEmail: string | undefined = session.data.session?.user.email;
    if (authEmail) {
      const { error: dbError } = await supabase
<<<<<<< HEAD
        .from('usersAccounts')
        .delete()
        .eq('email', authEmail);
    }

    alert('로그아웃이 완료됐습니다.');
    let { error } = await supabase.auth.signOut();
    router.replace('/');
=======
        .from("usersAccounts")
        .delete()
        .eq("email", authEmail);
    }

    alert("로그아웃이 완료됐습니다.");
    let { error } = await supabase.auth.signOut();
    router.replace("/");
>>>>>>> 5abc0844551bcd1a9fa36e519ed1562fe6abad94
    router.refresh();
    removeUser();
    localStorage.clear();
  };

  return <button onClick={signOutButton}>로그아웃</button>;
};

export default LogOut;
