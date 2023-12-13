import React from 'react';

function Button({ text }) {
  return (
    <button className='text-white text-base font-medium
      h-10 min-w-[8rem] rounded-lg border border-b-2 shadow-md bg-blue-500 hover:bg-blue-600 '>
      {text}
    </button>
  );
}

export default Button;
