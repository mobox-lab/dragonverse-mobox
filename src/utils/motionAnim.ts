export type AnimType = 'scale' | 'translateY' | 'indicate' | 'topLeftAnim';
export const clickableMotionProps = (type: AnimType = 'scale', props?: { scale?: number }) => {
  switch (type) {
    case 'scale':
    default: {
      const { scale } = props ?? {};
      return {
        transition: { type: 'spring', stiffness: 200 },
        whileTap: { scale: scale ?? 1.1 },
        whileHover: { scale: scale ?? 1.1 },
      };
    }
  }
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
