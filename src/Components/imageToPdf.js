import RNImageToPdf from 'react-native-image-to-pdf';

const myAsyncPDFFunction = async (tempName, tempImagePaths) => {
  try {
    const options = {
      imagePaths: [tempImagePaths],
      name: tempName,
    };
    return RNImageToPdf.createPDFbyImages(options);
  } catch (e) {
  }
};

export {myAsyncPDFFunction};
