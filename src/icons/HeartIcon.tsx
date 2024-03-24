import { AiOutlineHeart } from 'react-icons/ai';

type Props = {
  className?: string;
};

export const HeartIcon = ({ className }: Props) => {
  return (
    <AiOutlineHeart
      className={className || 'w-7 h-7'}
      style={{ color: 'red' }}
    />
  );
};
