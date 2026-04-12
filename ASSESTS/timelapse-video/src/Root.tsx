import React from 'react';
import {Composition} from 'remotion';
import {Timelapse} from './Timelapse';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="timelapse"
        component={Timelapse}
        durationInFrames={9 * 90 - 8 * 30}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
