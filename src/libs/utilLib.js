// function to make sure url is image
export const isImage = url => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};