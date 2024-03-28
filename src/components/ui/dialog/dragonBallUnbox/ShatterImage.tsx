import { clsxm } from '@/utils';
import { MouseEventHandler, useCallback, useRef, useState } from 'react';
// import Delaunay from 'delaunay-fast';
// import gsap, { Cubic } from 'gsap';

const size = 400;
const TWO_PI = Math.PI * 2;

function randomRange(min: number, max: number) {
  return min + (max - min) * Math.random();
}

function clamp(x: number, min: number, max: number) {
  return x < min ? min : x > max ? max : x;
}

function sign(x: number) {
  return x < 0 ? -1 : 1;
}
const ShatterImage = ({ src, onShatterEnd }: { src?: string; onShatterEnd?: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isShattered, setIsShattered] = useState(false);

  // const shatterStart = useCallback(
  //   (centerX: number, centerY: number) => {
  //     let vertices: any[] = [];
  //     let indices: any[] = [];
  //     let fragments: any[] = [];
  //     const triangulate = () => {
  //       const rings = [
  //         { r: 50, c: 12 },
  //         { r: 150, c: 12 },
  //         { r: 300, c: 12 },
  //         { r: 1200, c: 12 }, // very large in case of corner clicks
  //       ];
  //       let x, y;
  //       vertices.push([centerX, centerY]);
  //       rings.forEach(function (ring) {
  //         const radius = ring.r,
  //           count = ring.c,
  //           variance = radius * 0.25;
  //         for (let i = 0; i < count; i++) {
  //           x = Math.cos((i / count) * TWO_PI) * radius + centerX + randomRange(-variance, variance);
  //           y = Math.sin((i / count) * TWO_PI) * radius + centerY + randomRange(-variance, variance);
  //           vertices.push([x, y]);
  //         }
  //       });
  //       vertices.forEach(function (v) {
  //         v[0] = clamp(v[0], 0, size);
  //         v[1] = clamp(v[1], 0, size);
  //       });
  //       indices = Delaunay.triangulate(vertices);
  //     };

  //     function shatter() {
  //       class Fragment {
  //         v0: number[];
  //         v1: number[];
  //         v2: number[];
  //         box: any;
  //         centroid: any;
  //         canvas: any;
  //         ctx: any;

  //         constructor(v0: number[], v1: number[], v2: number[]) {
  //           this.v0 = v0;
  //           this.v1 = v1;
  //           this.v2 = v2;
  //           this.computeBoundingBox();
  //           this.computeCentroid();
  //           this.createCanvas();
  //           this.clip();
  //         }

  //         /**
  //          *  
  //          *  
  //          */
  //         computeBoundingBox() {
  //           var xMin = Math.min(this.v0[0], this.v1[0], this.v2[0]),
  //             xMax = Math.max(this.v0[0], this.v1[0], this.v2[0]),
  //             yMin = Math.min(this.v0[1], this.v1[1], this.v2[1]),
  //             yMax = Math.max(this.v0[1], this.v1[1], this.v2[1]);

  //           this.box = {
  //             x: xMin,
  //             y: yMin,
  //             w: xMax - xMin,
  //             h: yMax - yMin,
  //           };
  //         }
  //         /**
  //          *  
  //          *  
  //          */
  //         computeCentroid() {
  //           var x = (this.v0[0] + this.v1[0] + this.v2[0]) / 3,
  //             y = (this.v0[1] + this.v1[1] + this.v2[1]) / 3;
  //           this.centroid = [x, y];
  //         }
  //         /**
  //          *  
  //          *  
  //          *  
  //          */
  //         createCanvas() {
  //           this.canvas = document.createElement('canvas');
  //           this.canvas.width = this.box.w;
  //           this.canvas.height = this.box.h;
  //           this.canvas.style.width = this.box.w + 'px';
  //           this.canvas.style.height = this.box.h + 'px';
  //           this.canvas.style.left = this.box.x + 'px';
  //           this.canvas.style.top = this.box.y + 'px';
  //           this.ctx = this.canvas.getContext('2d');
  //         }
  //         /**
  //          *  
  //          *  , 。
  //          *  
  //          *  
  //          */
  //         clip() {
  //           this.ctx.translate(-this.box.x, -this.box.y);
  //           this.ctx.beginPath();
  //           this.ctx.moveTo(this.v0[0], this.v0[1]);
  //           this.ctx.lineTo(this.v1[0], this.v1[1]);
  //           this.ctx.lineTo(this.v2[0], this.v2[1]);
  //           this.ctx.closePath();
  //           this.ctx.clip();
  //           this.ctx.drawImage(canvasRef?.current, 0, 0);
  //         }
  //       }
  //       function shatterCompleteHandler() {
  //         // add pooling?
  //         fragments.forEach(function (f) {
  //           if (containerRef?.current) containerRef.current.removeChild(f.canvas);
  //           // console.log('gc fragment:', f);
  //         });
  //         fragments.length = 0;
  //         vertices.length = 0;
  //         indices.length = 0;
  //         onShatterEnd?.();
  //       }

  //       let p0, p1, p2, fragment;
  //       if (canvasRef?.current) canvasRef.current.style.display = 'none';
  //       if (videoRef?.current) videoRef.current.style.display = 'none';

  //       let tl0 = gsap.timeline({ onComplete: shatterCompleteHandler });

  //       for (var i = 0; i < indices.length; i += 3) {
  //         p0 = vertices[indices[i + 0]];
  //         p1 = vertices[indices[i + 1]];
  //         p2 = vertices[indices[i + 2]];
  //         fragment = new Fragment(p0, p1, p2);
  //         fragment.canvas.style.position = 'absolute';
  //         let dx = fragment.centroid[0] - centerX,
  //           dy = fragment.centroid[1] - centerY,
  //           d = Math.sqrt(dx * dx + dy * dy),
  //           rx = 30 * sign(dy),
  //           ry = 90 * -sign(dx),
  //           delay = d * 0.003 * randomRange(0.9, 1.1);
  //         fragment.canvas.style.zIndex = Math.floor(d).toString();
  //         let tl1 = gsap.timeline();
  //         tl1.to(fragment.canvas, {
  //           z: -500,
  //           rotationX: rx,
  //           rotationY: ry,
  //           ease: Cubic.easeIn,
  //           duration: 0.5,
  //         });
  //         // tl1.to(fragment.canvas, { alpha: 0, duration: 0.4 }, 0.6);
  //         tl0.add(tl1, delay);
  //         fragments.push(fragment);
  //         containerRef?.current?.appendChild(fragment.canvas);
  //       }
  //     }

  //     triangulate();
  //     shatter();
  //   },
  //   [onShatterEnd],
  // );

  // const onClick: MouseEventHandler = useCallback(
  //   (e) => {
  //     if (!canvasRef.current || !videoRef.current) return;
  //     const ctx = canvasRef.current.getContext('2d');
  //     if (!ctx) return;
  //     videoRef.current.pause();
  //     ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

  //     const { top, left } = videoRef.current.getBoundingClientRect();
  //     const centerX = e.clientX - left;
  //     const centerY = e.clientY - top;

  //     //  
  //     if (!isShattered) {
  //       setIsShattered(true);
  //       shatterStart(centerX, centerY);
  //     }
  //   },
  //   [isShattered, shatterStart],
  // );

  // const onLoadedMetadata = useCallback(() => {
  //   if (!canvasRef?.current || !videoRef?.current) return;
  //   videoRef.current.play();
  //   canvasRef.current.width = size;
  //   canvasRef.current.height = size;
  // }, []);

  return (
    <div className="relative md:scale-50" style={{ width: size, height: size }}>
      <video
        preload="auto"
        // onClick={onClick}
        // ref={videoRef}
        // onLoadedMetadata={onLoadedMetadata}
        playsInline
        loop
        muted
        disablePictureInPicture
        src={src}
        style={{ width: size, height: size }}
        className={clsxm('absolute', { hidden: isShattered })}
      />
      <canvas ref={canvasRef} width={size} height={size} className="absolute -z-10" />
      <div ref={containerRef} style={{ width: size, height: size }} className="absolute left-0 top-0 -z-10"></div>
    </div>
  );
};

export default ShatterImage;
