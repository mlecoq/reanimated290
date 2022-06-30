import React, {Component} from 'react';
import {Platform} from 'react-native';
import PSPDFKitView from 'react-native-pspdfkit';
import * as Sentry from '@sentry/react-native';
import {
  getArrayBufferForBlob,
  getBlobForArrayBuffer,
} from 'react-native-blob-jsi-helper';

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
export const routingInstrumentation =
  new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  dsn: 'https://6e11e0c90c6f44c193eb10b3991db58e@o224357.ingest.sentry.io/5203215',
  enableNative: false,
});



const DOCUMENT =
  Platform.OS === 'ios' ? 'Document.pdf' : 'file:///android_asset/Document.pdf';
export default class PSPDFKitDemo extends Component<{}> {

    React.useEffect(() => {
    (async () => {
      console.log('Fetching 8k image..');
      const x = await fetch(
        'https://www.hdwallpapers.in/download/beautiful_lake_landscape_scenery_4k_8k-HD.jpg'
      );
      console.log('Getting blob..');
      const blob = await x.blob();
      console.log(`Blob: ${Object.keys(blob)}..`);
      console.log('Getting ArrayBuffer..');
      // @ts-expect-error performance actually exists.
      // eslint-disable-next-line no-undef
      const start = performance.now();
      const arrayBuffer = getArrayBufferForBlob(blob);
      // @ts-expect-error performance actually exists.
      // eslint-disable-next-line no-undef
      const end = performance.now();
      console.log(
        `Got ArrayBuffer in ${end - start}ms! Size: ${arrayBuffer.byteLength}`
      );

      // @ts-expect-error performance actually exists.
      // eslint-disable-next-line no-undef
      const newStart = performance.now();
      const newBlob = getBlobForArrayBuffer(arrayBuffer.buffer);
      // @ts-expect-error performance actually exists.
      // eslint-disable-next-line no-undef
      const newEnd = performance.now();
      console.log(
        `Converted ArrayBuffer -> Blob in ${newEnd - newStart}ms! Blob ID: ${
          // @ts-expect-error performance actually exists.
          newBlob._data?.blobId
        }`
      );
    })();
  }, []);
  render() {
    return (
      <PSPDFKitView
        document={DOCUMENT}
        configuration={{
          showThumbnailBar: 'scrollable',
          pageTransition: 'scrollContinuous',
          scrollDirection: 'vertical',
        }}
        ref="pdfView"
        fragmentTag="PDF1"
        style={{flex: 1}}
      />
    );
  }
}
