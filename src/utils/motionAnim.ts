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
