'use client';

import useStoreState from '../shared/store';

const TestPage = () => {
  const { like, increaseLike, removeAllLikes } = useStoreState();

  return (
    <div>
      hi
      <p>{like}</p>
      <button onClick={increaseLike}>+</button>
      <button onClick={removeAllLikes}>0 으로 set</button>
    </div>
  );
};

export default TestPage;
