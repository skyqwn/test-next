import React from "react";

const ShootListsSkeleton = () => {
  return <div className="rounded-lg bg-blue-50 p-8 text-center">
            <div className="animate-pulse">
              JSONPlaceholder Posts 데이터를 불러오는 중...
            </div>
          </div>
};

export default ShootListsSkeleton;
