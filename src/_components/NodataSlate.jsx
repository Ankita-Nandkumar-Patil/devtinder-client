import React from 'react'

export default function NodataSlate({text}) {
  return (
    <div className="flex flex-col items-center">
      <figure className="w-1/2">
        <img src="/noData.png" alt="noData" className="rounded-xl" />
      </figure>
      <div className="text-xl font-semibold">{text}</div>
    </div>
  );
}
