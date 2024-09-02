import sharp from 'sharp';

export interface IImageData {
  uuid: string;
  quality: {
    small: IImageQuality;
    medium: IImageQuality;
    original: IImageQuality;
  };
}

interface IImageQuality {
  data: Buffer;
  info: sharp.OutputInfo;
}
