import tomoroImg from '../assets/images/tomoro.png';
import familyMartImg from '../assets/images/familymart.png';
import sisaBaikBakeryImg from '../assets/images/sisabaikbakery.png';
import saladStopImg from '../assets/images/saladstop.png';
import defaultImg from '../assets/images/hero.png';

// gambar menu
import familyMartBentoImg from '../assets/images/familymart_bento.png';
import saladStopBowlImg from '../assets/images/saladstop_bowl.png';
import sisaBaikBakeryBoxImg from '../assets/images/sisabaikbakery_box.png';
import sisaBaikBakeryLoafImg from '../assets/images/sisabaikbakery_loaf.png';
import tomoroBundleImg from '../assets/images/tomoro_bundle.png';

export const getStoreImage = (storeName) => {
  if (!storeName) return defaultImg;
  const lowerName = storeName.toLowerCase();
  if (lowerName.includes('tomoro')) return tomoroImg;
  if (lowerName.includes('family')) return familyMartImg;
  if (lowerName.includes('sisabaik') || lowerName.includes('makmur')) return sisaBaikBakeryImg;
  if (lowerName.includes('salad')) return saladStopImg;
  return defaultImg;
};

export const getMenuImage = (bagId) => {
  switch (bagId) {
    case 'bag-001': return tomoroBundleImg;
    case 'bag-002': return familyMartBentoImg;
    case 'bag-003': return sisaBaikBakeryBoxImg;
    case 'bag-004': return sisaBaikBakeryLoafImg;
    case 'bag-006': return saladStopBowlImg;
    default: return defaultImg;
  }
};
