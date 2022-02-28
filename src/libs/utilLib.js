  // function to make sure url is image
  export const isImage = url => {
      console.log('isImage?', /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url))
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };