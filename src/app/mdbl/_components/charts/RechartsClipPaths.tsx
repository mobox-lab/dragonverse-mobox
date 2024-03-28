import { forwardRef, useImperativeHandle, useRef } from 'react';

const RechartsClipPaths = forwardRef((_, ref: React.ForwardedRef<any>) => {
  const grid = useRef<SVGRectElement>(null);
  const axis = useRef<SVGRectElement>(null);
  useImperativeHandle(ref, () => ({
    grid,
    axis,
  }));

  return (
    <>
      <clipPath id="chart-xaxis-clip">
        <rect fill="rgba(0,0,0,0)" height="100%" ref={axis} />
      </clipPath>
      <clipPath id="chart-grid-clip">
        <rect fill="rgba(0,0,0,0)" height="100%" ref={grid} />
      </clipPath>
    </>
  );
});
RechartsClipPaths.displayName = 'RechartsClipPaths';
export default RechartsClipPaths;
