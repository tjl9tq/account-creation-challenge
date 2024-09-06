import React from 'react';

const PasswordStrength = ({ score }: { score: number }) => {
  const getStrengthLabel = (score: number) => {
    switch (score) {
      case 0:
        return 'Weak';
      case 1:
        return 'Fair';
      case 2:
        return 'Good';
      case 3:
        return 'Strong';
      default:
        return 'Very Strong';
    }
  };

  const strengthLabel = getStrengthLabel(score);
  const strengthColor = {
    Weak: 'bg-red-500',
    Fair: 'bg-orange-500',
    Good: 'bg-yellow-500',
    Strong: 'bg-green-500',
    'Very Strong': 'bg-blue-500',
  }[strengthLabel];

  return (
    <div className="w-full py-6">
      <div className="w-full bg-gray-200 rounded h-2">
        <div
          className={`h-full ${strengthColor} transition-all duration-300 rounded`}
          style={{ width: `${score * 25}%` }}
        />
      </div>
      <div>
        <div className="font-bold mb-1 mt-4 text-xs">{strengthLabel}</div>
        <div className="text-gray-500 text-xs">
          {strengthLabel === 'Weak' && 'Password is too weak. Try adding more characters, numbers, and symbols.'}
          {strengthLabel === 'Fair' && 'Password could be stronger. Consider adding more variety in characters.'}
          {strengthLabel === 'Good' && 'Password is good, but could still be stronger.'}
          {strengthLabel === 'Strong' && 'Password is strong. Well done!'}
          {strengthLabel === 'Very Strong' && 'Password is very strong. Amazing!'}
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;
