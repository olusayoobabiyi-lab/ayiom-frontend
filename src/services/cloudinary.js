import { ENV } from "@/config/env";

export const buildCloudinaryUrl = (publicId, transformations = "") => {
  if (!publicId) return "";
  const cloud = ENV.CLOUDINARY_CLOUD_NAME;
  if (!cloud) return publicId;
  const tx = transformations ? `${transformations}/` : "";
  return `https://res.cloudinary.com/${cloud}/image/upload/${tx}${publicId}`;
};

export default { buildCloudinaryUrl };