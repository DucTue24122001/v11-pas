import { useViewport } from '@/configs/providers/ViewportProvider';
import { useMemo } from 'react';

export const useBreakpoint = (breakpoint: number) => {
  const {width} = useViewport()
  const isBreakPoint = useMemo(() => {
    return width < breakpoint
  }, [width, breakpoint])
  return isBreakPoint
}