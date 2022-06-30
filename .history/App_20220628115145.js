import React, {Component} from 'react';
import {Platform} from 'react-native';
import PSPDFKitView from 'react-native-pspdfkit';
import * as Sentry from '@sentry/react-native';

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
export const routingInstrumentation =
  new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  dsn: 'https://6e11e0c90c6f44c193eb10b3991db58e@o224357.ingest.sentry.io/5203215',
});

const DOCUMENT =
  Platform.OS === 'ios' ? 'Document.pdf' : 'file:///android_asset/Document.pdf';
export default class PSPDFKitDemo extends Component<{}> {
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
