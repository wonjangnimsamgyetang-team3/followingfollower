'use client';

import { supabase } from '@/supabase/supabase';
import { followType } from '@/types/type';
import { useEffect, useState } from 'react';

const FollowBtn = ({
  myEmail,
  writerEmail,
}: {
  myEmail: string;
  writerEmail: string;
}) => {
  // const [myFollowing, setMyFollowing] = useState([]);

  // useEffect(() => {
  //   const getMyFollowing = async () => {
  //     const { data: followingData, error: followingError } = await supabase
  //       .from('usersAccounts')
  //       .select('following')
  //       .eq('email', myEmail)
  //       .single();

  //     setMyFollowing(followingData?.following);
  //   };
  // }, [myEmail]);
  // console.log('myFollowing', myFollowing);

  // 팔로우 기능
  const followHandler = async () => {
    // followingData 내 데이터에 담긴 팔로잉 (내가 팔로우한 사람들)
    const { data: followingData, error: followingError } = await supabase
      .from('usersAccounts')
      .select('following')
      .eq('email', myEmail)
      .single();

    // followerData 내가 팔로우하려는 사람의 데이터에 담긴 팔로워 (그의 팔로워들)
    const { data: followerData, error: followerError } = await supabase
      .from('usersAccounts')
      .select('follower')
      .eq('email', writerEmail)
      .single();

    // 내 팔로잉에 상대방을 추가
    const following: followType = followingData?.following;
    console.log('hi', following);
    if (following === null) {
      const { data, error } = await supabase
        .from('usersAccounts')
        .update({ following: [writerEmail] })
        .eq('email', myEmail)
        .select();
    } else {
      const { data, error } = await supabase
        .from('usersAccounts')
        .update({ following: [...following, writerEmail] })
        .eq('email', myEmail)
        .select();
    }

    // 상대방 팔로워에 나를 추가
    const follower: followType = followerData?.follower;
    if (follower === null) {
      const { data, error } = await supabase
        .from('usersAccounts')
        .update({ follower: [myEmail] })
        .eq('email', writerEmail)
        .select();
    } else {
      const { data, error } = await supabase
        .from('usersAccounts')
        .update({ follower: [...follower, myEmail] })
        .eq('email', writerEmail)
        .select();
    }

    // 팔로우 취소
    if (following?.includes(writerEmail)) {
      const { error: removeFollowingError } = await supabase
        .from('usersAccounts')
        .update({
          following: following?.filter(
            (email: string) => email !== writerEmail
          ),
        })
        .eq('email', myEmail);
      const { error: removeFollowerError } = await supabase
        .from('usersAccounts')
        .update({
          follower: follower?.filter((email: string) => email !== myEmail),
        })
        .eq('email', writerEmail);
    }
  };

  return <button onClick={followHandler}>follow</button>;
  // return <button>follow</button>;
};

export default FollowBtn;
