import React from 'react';

type Props = {
   count: number;
   height?: number;
   width?: string | number;
}

const SkeletonLoader: React.FC<Props> = ({ count, height = 40, width = '100%' }) => {
   return (
      <div>
         {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="skeleton mb-4" style={{ height, width }} />
         ))}
      </div>
   );
};

export default SkeletonLoader;
