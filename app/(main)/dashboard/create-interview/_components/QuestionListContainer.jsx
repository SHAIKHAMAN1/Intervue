import React from 'react';

function QuestionListContainer({ questionList }) {
  return (
    <div>
      <div className='mb-3 font-medium mx-1 text-lg'>Generated Interview Questions</div>
      <div className='p-5 border border-gray-300 rounded-xl'>
        {questionList.map((item, index) => (
          <div key={index} className='p-3 border border-gray-300 rounded-md mb-2'>
            <h2 className='font-medium'>{item.question}</h2>
            <h2 className='text-blue-600 font-semibold'>Type: {item?.type}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionListContainer;
