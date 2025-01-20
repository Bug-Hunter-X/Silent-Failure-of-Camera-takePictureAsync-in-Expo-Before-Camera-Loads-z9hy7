```javascript
import * as Camera from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const takePicture = async () => {
    if (!cameraReady) {
      console.warn('Camera not ready yet!'); //This prevents silent failure
      return;
    }
    if (cameraRef.current) {
      try {
        let photo = await cameraRef.current.takePictureAsync();
        console.log('Photo taken:', photo);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  if (hasPermission === null) {
    return <View><Text>Requesting permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef} onCameraReady={handleCameraReady}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={{ flex: 0.1, backgroundColor: 'blue' }} onPress={takePicture}>
            <Text style={{ color: 'white' }}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};
export default App;
```