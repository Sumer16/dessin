import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Canvas,
  Path,
  SkPath,
  Skia,
  TouchInfo,
  useTouchHandler,
} from '@shopify/react-native-skia';

type DrawingBoardProps = {
  onStart: (x: number, y: number) => void;
  onActive: (x1: number, y1: number, x2: number, y2: number) => void;
};

export default function DrawingBoard({ onStart, onActive }: DrawingBoardProps) {
  const [paths, setPaths] = useState<SkPath[]>([]);

  const onDrawingStart = useCallback((touchInfo: TouchInfo) => {
    setPaths((old) => {
      const { x, y } = touchInfo;
      onStart(x, y);
      const newPath = Skia.Path.Make();
      newPath.moveTo(x, y);
      return [...old, newPath];
    });
  }, []);

  const onDrawingActive = useCallback((touchInfo: TouchInfo) => {
    setPaths((currentPaths) => {
      const { x, y } = touchInfo;
      const currentPath = currentPaths[currentPaths.length - 1];
      const lastPoint = currentPath.getLastPt();
      const xMid = (lastPoint.x + x) / 2;
      const yMid = (lastPoint.y + y) / 2;

      onActive(lastPoint.x, lastPoint.y, xMid, yMid);

      currentPath.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
      return [...currentPaths.slice(0, currentPaths.length - 1), currentPath];
    });
  }, []);

  const touchHandler = useTouchHandler(
    {
      onActive: onDrawingActive,
      onStart: onDrawingStart,
    },
    [onDrawingActive, onDrawingStart]
  );

  return (
    <Canvas style={style.container} onTouch={touchHandler}>
      {paths.map((path, index) => (
        <Path
          key={index}
          path={path}
          color={'black'}
          style={'stroke'}
          strokeWidth={2}
        />
      ))}
    </Canvas>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
