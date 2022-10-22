import React from 'react';

interface Props extends Omit<NativeImgProps, 'src'> {
  avif?: NativeSource;
  webp?: NativeSource;
  src: string;
  fetchpriority?: 'low' | 'high';
  importance?: 'low' | 'high';
  useOnlyImg?: boolean;
}

export const ImagePreset: React.FC<Props> = ({
  useOnlyImg = false,
  src,
  avif,
  webp,
  width = '100%',
  height = '100%',
  decoding = 'async',
  loading = 'lazy',
  fetchpriority = 'low',
  importance = 'low',
  alt,
  ...props
}) => {
  if (useOnlyImg) {
    return (
      <img
        loading={loading}
        src={src}
        alt={alt}
        // @ts-expect-error Ignore type checking
        fetchpriority={fetchpriority}
        importance={importance || fetchpriority}
        width={width}
        height={height}
        decoding={decoding}
        {...props}
      />
    );
  }

  const baseAvifProps = {
    srcSet: src
      .replace('/images/', 'optimize-imgs/')
      .replace(/.(png|jpg|jpeg)/, '.avif'),
    ...avif,
  };

  const baseWebpProps = {
    srcSet: src
      .replace('/images/', 'optimize-imgs/')
      .replace(/.(png|jpg|jpeg)/, '.webp'),
    ...webp,
  };

  return (
    <picture>
      <source {...baseAvifProps} type="image/avif" />
      <source {...baseWebpProps} type="image/webp" />
      <img
        loading={loading}
        src={src}
        alt={alt}
        // @ts-expect-error Ignore type checking
        fetchpriority={fetchpriority}
        importance={fetchpriority}
        width={width}
        height={height}
        decoding={decoding}
        {...props}
      />
    </picture>
  );
};

type NativeImgProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

type NativeSource = React.DetailedHTMLProps<
  React.SourceHTMLAttributes<HTMLSourceElement>,
  HTMLSourceElement
>;
