import React from 'react';
import {Img, staticFile, useVideoConfig} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';

const images = ['N1.jpg', 'N2.jpg', 'N3.jpg', 'N4.jpg', 'N5.jpg', 'N6.jpg', 'N7.jpg', 'N8.jpg', 'N9.jpg'];

const IMAGE_DURATION_IN_FRAMES = 90;
const TRANSITION_DURATION_IN_FRAMES = 30;

export const Timelapse: React.FC = () => {
  const {width, height, fps} = useVideoConfig();

  return (
    <div
      style={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TransitionSeries>
        {images.map((image, index) => (
          <React.Fragment key={image}>
            <TransitionSeries.Sequence durationInFrames={IMAGE_DURATION_IN_FRAMES}>
              <Img
                src={staticFile(image)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </TransitionSeries.Sequence>
            {index < images.length - 1 && (
              <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({durationInFrames: TRANSITION_DURATION_IN_FRAMES})}
              />
            )}
          </React.Fragment>
        ))}
      </TransitionSeries>
    </div>
  );
};
