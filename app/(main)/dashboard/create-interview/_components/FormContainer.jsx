'use client';

import React, { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Code2Icon,
  User2Icon,
  BriefcaseBusinessIcon,
  Puzzle,
  Users,
  ArrowRight,
} from 'lucide-react';

const InterviewTypes = [
  { title: 'Technical', icon: Code2Icon },
  { title: 'Behavioral', icon: User2Icon },
  { title: 'Experience', icon: BriefcaseBusinessIcon },
  { title: 'Problem Solving', icon: Puzzle },
  { title: 'Leadership', icon: Users },
];

function FormContainer({ onHandleInputChange, GoToNext }) {
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    onHandleInputChange('type', selectedTypes);
  }, [selectedTypes]);

  const toggleType = (type) => {
    setSelectedTypes((prevSelected) =>
      prevSelected.includes(type)
        ? prevSelected.filter((t) => t !== type)
        : [...prevSelected, type]
    );
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-lg">
      <div className="space-y-5">
        {/* Job Position */}
        <div>
          <h2 className="text-md font-medium mb-1">Job Position</h2>
          <Input
            placeholder="e.g. Full Stack Developer"
            onChange={(e) => onHandleInputChange('jobPosition', e.target.value)}
          />
        </div>

        {/* Job Description */}
        <div>
          <h2 className="text-md font-medium mb-1">Job Description</h2>
          <Textarea
            placeholder="e.g. Enter Detailed Job Description"
            onChange={(e) => onHandleInputChange('jobDescription', e.target.value)}
          />
        </div>

        {/* Interview Duration */}
        <div>
          <h2 className="text-md font-medium mb-1">Interview Duration</h2>
          <Select onValueChange={(value) => onHandleInputChange('duration', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent>
              {['5 Min', '15 Min', '30 Min', '45 Min', '60 Min'].map((duration) => (
                <SelectItem key={duration} value={duration}>
                  {duration}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Interview Types - Multi-select */}
        <div className="mt-5">
          <h2 className="text-sm font-medium">Interview Types (Select Multiple)</h2>
          <div className="flex gap-3 flex-wrap mt-2">
            {InterviewTypes.map(({ title, icon: Icon }) => {
              const isSelected = selectedTypes.includes(title);
              return (
                <div
                  key={title}
                  className={`flex items-center cursor-pointer gap-2 p-2 px-4 border rounded-full transition-all duration-200
                    ${isSelected
                      ? 'border-blue-500 bg-blue-100 text-blue-700 shadow-sm ring-2 ring-blue-300'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100'}
                  `}
                  onClick={() => toggleType(title)}
                >
                  <Icon className={`h-4 w-4 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span>{title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-7 flex justify-end">
        <Button onClick={GoToNext}>
          Generate Question <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default FormContainer;
