import { forwardRef } from 'react';
import Zoom from '@material-ui/core/Zoom';
import { TransitionProps } from '@material-ui/core/transitions';

export const ZoomTransition = forwardRef(
  (props: TransitionProps, ref: React.Ref<unknown>) => (
    <Zoom ref={ref} {...props} />
  ),
);
