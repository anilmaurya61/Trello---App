import app from './firebaseConfig'
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";


const storage = getStorage(app);

const getImagesFromStorage = async () => {
  try {
    const imagesRef = ref(storage, 'Images');

    const imageUrls = [];

    const items = await listAll(imagesRef);

    for (const item of items.items) {
      const downloadUrl = await getDownloadURL(item);
      imageUrls.push(downloadUrl);
    }
    return imageUrls;
  } catch (error) {
    console.error('Error fetching images from storage:', error);
    return [];
  }
};

export { getImagesFromStorage };
