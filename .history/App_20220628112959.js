import React, {Component} from 'react';
import {Platform} from 'react-native';
import PSPDFKitView from 'react-native-pspdfkit';

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
