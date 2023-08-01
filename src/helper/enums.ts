export enum ResponseMsgEnum {
  TRUE = 'Success',
  FALSE = 'Failed',
}

// 图片枚举
export enum ImgMimeTypes {
  JPEG = 'image/jpeg',
  JPG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
  BMP = 'image/bmp',
  WEBP = 'image/webp',
  SVG = 'image/svg+xml',
  TIFF = 'image/tiff',
  ICO = 'image/x-icon',
  ICO_COMPATIBLE = 'image/vnd.microsoft.icon',
}

// 视频枚举类型
export enum VideoMimeTypes {
  MP4 = 'video/mp4',
  AVI = 'video/avi',
  MOV = 'video/quicktime',
  MKV = 'video/x-matroska',
}

// 音频枚举类型
export enum AudioMimeTypes {
  MP3 = 'audio/mpeg',
  WAV = 'audio/wav',
  AAC = 'audio/aac',
  OGG = 'audio/ogg',
  // 添加其他支持的音频类型
}

// 应用程序文件枚举类型
export enum ApplicationTypes {
  XML = 'application/xml',
  YAML = 'application/x-yaml',
  JSON = 'application/json',
  PDF = 'application/pdf',
  ZIP = 'application/zip',
  '7Z' = 'application/x-7z-compressed',
}

export enum RoleEnum {
  User = 'user',
  Admin = 'admin',
}
