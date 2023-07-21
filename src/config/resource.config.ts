import { normalize } from 'path';

const { STATIC_RESOURCE_ROOT_PATH } = process.env;

export const ROOT_PATH = normalize(STATIC_RESOURCE_ROOT_PATH);
