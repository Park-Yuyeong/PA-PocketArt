'use client';

import { FanArt, FanArtSectionProps } from '@/types/FanArt.type';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import FanArtForm from '../FanArtForm';
import FanArtItem from '../FanArtItem';

const fetchFanArts = async (postId: string) => {
  const { data } = await axios.get(`/api/fan-art/read?postId=${postId}`);

  return { data };
};

const FanArtSection = ({ postId }: FanArtSectionProps) => {
  const queryClient = useQueryClient();

  const { data: fanArts, isLoading } = useQuery({
    queryKey: ['fanArt', { list: true }],
    queryFn: () => fetchFanArts(postId)
  });

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: ['fanArt', { list: true }] });
    };
  }, []);

  return (
    <section className="w-full mt-1">
      <FanArtForm postId={postId} />
      {isLoading ? (
        <div className="text-xl font-semibold text-center py-4">Loading...</div>
      ) : (
        <ul className="border rounded">
          {fanArts?.data.length !== 0 ? (
            fanArts?.data.map((fanArt: FanArt) => (
              <li key={fanArt.id} className="rounded p-4">
                <FanArtItem postId={postId} fanArt={fanArt} />
              </li>
            ))
          ) : (
            <div className="text-xl text=[#212121] font-semibold text-center py-8">아직 팬아트가 없어요🎨</div>
          )}
        </ul>
      )}
    </section>
  );
};

export default FanArtSection;
