#!/usr/bin/env zx

import fse from 'fs-extra';
import glob from 'fast-glob';
import { ImagePool } from '@squoosh/lib';
import { cpus } from 'os';
import { green, blue } from 'kolorist';

/**
 * Should lower than 10 CPU to avoid Out of memory: wasm memory
 */
const MAX_CPU = 10;

const CONCURRENT = () => {
  if (cpus().length > MAX_CPU) return MAX_CPU;
  return cpus().length;
};

const imagePool = new ImagePool(CONCURRENT());

const encodeOptions = {
  avif: {},
  webp: {},
};

const originImgPaths = glob.sync(
  ['./apps/**/public/images/**/*.{png,jpg,jpeg}'],
  {
    onlyFiles: true,
  }
);

const optimizeImgPaths = glob.sync(
  ['./apps/**/public/optimize-imgs/**/*.webp'],
  {
    onlyFiles: true,
  }
);

const newsFiles = originImgPaths.flatMap((path) => {
  const _path = path
    .replace('images', 'optimize-imgs')
    .replace(/.(png|jpg|jpeg)/, '.webp');
  const samePath = optimizeImgPaths.find((p) => p === _path);
  if (samePath) return [];
  return path;
});

const promises = newsFiles.map(writeFile);

for await (const process of promises) {
  if (process) process();
}

await imagePool.close();

/**
 *
 * @param {String} path
 */
async function writeFile(path) {
  const image = imagePool.ingestImage(path);
  await image.encode(encodeOptions);

  const avifBinary = await image.encodedWith.avif;
  const avifDestination = getDestinationFile(path, 'avif');
  await fse.outputFile(avifDestination, avifBinary.binary);
  LOG_SUCCESS(path, avifDestination);

  const webpBinary = await image.encodedWith.webp;
  const webpDestination = getDestinationFile(path, 'webp');
  await fse.outputFile(webpDestination, webpBinary.binary);
  LOG_SUCCESS(path, webpDestination);
}

/**
 *
 * @param {String} path
 * @param {'webp' | 'avif'} ext
 */
function getDestinationFile(path, ext) {
  const pathSegment = path.split('/');
  const originFile = pathSegment.slice(-1)[0];
  const filePath = pathSegment
    .slice(0, -1)
    .join('/')
    .replace('/images', '/optimize-imgs')
    .replace('./apps', 'apps');
  const fileName = originFile.split('.')[0];
  const fileWithExtension = fileName + `.${ext}`;
  const destinationFile = filePath.concat('/', fileWithExtension);

  return destinationFile;
}

function shortPath(path) {
  return path
    .replace('./', '')
    .replace(/apps\/\w(-?\w)+\/public/, '$1')
    .replace(/apps\/\w(-?\w)+\/public\/optimize-imgs/, '$1');
}

function LOG_SUCCESS(path, destination) {
  console.log(
    `Convert ${blue(shortPath(path))} -> ${green(
      shortPath(destination)
    )} successfully`
  );
}
