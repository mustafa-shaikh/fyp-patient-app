import {boxToken} from '../../config';
import RNFetchBlob from 'rn-fetch-blob';

export default uploadDropBox = async obj => {
  return RNFetchBlob.fetch(
    'POST',
    'https://content.dropboxapi.com/2/files/upload',
    {
      Authorization: `Bearer ${boxToken}`,
      'Dropbox-API-Arg': JSON.stringify({
        path: `${obj.path}`,
        mode: 'overwrite',
        autorename: true,
        mute: false,
        strict_conflict: false,
      }),
      'Content-Type': 'application/octet-stream',
      // },
    },
    RNFetchBlob.wrap(obj.uri),
  )
    .then(res => {
      console.log(res.text());
    })
    .catch(err => {
        throw 'Upload Failed';
    });
};
