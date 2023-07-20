import { normalize } from 'path';

const { STATIC_RESOURCE_ROOT_PATH } = process.env;

console.log('STATIC_RESOURCE_ROOT_PATH ----->', STATIC_RESOURCE_ROOT_PATH);

export const ROOT_PATH = normalize(STATIC_RESOURCE_ROOT_PATH);
