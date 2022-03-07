import Config from 'react-native-config';

const apiUrl = Config.API_URL;
const nodeEnv = Config.NODE_ENV;
const boxToken = Config.BOX_TOKEN;
const cloudinaryUrl = Config.CLOUDINARY_URL;
const cloudinaryPreset = Config.CLOUDINARY_PRESET;

console.log('apiUrl:', apiUrl, 'nodeEnv:', nodeEnv);

export {apiUrl, nodeEnv, boxToken, cloudinaryUrl, cloudinaryPreset};
