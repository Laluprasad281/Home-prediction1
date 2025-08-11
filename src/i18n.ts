import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    common: {
      brand: 'IndiaHomes Vision',
      hero: {
        title: 'India Home Price Prediction Dashboard',
        subtitle: 'AI-powered predictions, trends, and insights across Indian cities.',
        cta: 'Explore Dashboard'
      },
      tabs: { overview: 'Overview', forecast: 'Forecast', regions: 'Regions', insights: 'Insights', settings: 'Settings', predict: 'Predict' },
      stats: { avg_price: 'Avg Home Price', yoy_growth: 'YoY Growth', inventory: 'Inventory' },
      language: 'Language',
      predict: {
        title: 'Predict Home Price',
        city: 'City',
        area: 'Area',
        bhk: 'Bedrooms (BHK)',
        bath: 'Bathrooms',
        age: 'Property Age',
        amenities: 'Amenities Level',
        amenities_none: 'None',
        amenities_basic: 'Basic',
        amenities_good: 'Good',
        amenities_premium: 'Premium',
        cta: 'Predict Now',
        output: 'Prediction & Projection',
        disclaimer: 'Indicative estimate based on heuristic model. For guidance only.',
        result_title: 'Prediction Ready',
        result_desc: 'Your estimated price and 6-month projection are shown.',
        placeholder: 'Fill the form to get an instant estimate.'
      }
    }
  },
  hi: {
    common: {
      brand: 'इंडिया होम्स विज़न',
      hero: {
        title: 'भारत घर मूल्य पूर्वानुमान डैशबोर्ड',
        subtitle: 'भारतीय शहरों में एआई आधारित भविष्यवाणियाँ, रुझान और अंतर्दृष्टि।',
        cta: 'डैशबोर्ड देखें'
      },
      tabs: { overview: 'सारांश', forecast: 'पूर्वानुमान', regions: 'क्षेत्र', insights: 'इनसाइट्स', settings: 'सेटिंग्स', predict: 'अनुमान' },
      stats: { avg_price: 'औसत घर मूल्य', yoy_growth: 'वार्षिक वृद्धि', inventory: 'इन्वेंटरी' },
      language: 'भाषा',
      predict: {
        title: 'घर की कीमत का अनुमान',
        city: 'शहर',
        area: 'एरिया',
        bhk: 'बेडरूम (BHK)',
        bath: 'बाथरूम',
        age: 'प्रॉपर्टी की उम्र',
        amenities: 'सुविधाएँ स्तर',
        amenities_none: 'कोई नहीं',
        amenities_basic: 'बेसिक',
        amenities_good: 'अच्छा',
        amenities_premium: 'प्रीमियम',
        cta: 'अब अनुमान लगाएँ',
        output: 'अनुमान और प्रोजेक्शन',
        disclaimer: 'हीयुरिस्टिक मॉडल पर आधारित अनुमान। केवल मार्गदर्शन के लिए।',
        result_title: 'अनुमान तैयार',
        result_desc: 'अनुमानित कीमत और 6 माह का प्रोजेक्शन दिख रहा है।',
        placeholder: 'तुरंत अनुमान के लिए फॉर्म भरें।'
      }
    }
  },
  bn: {
    common: {
      brand: 'ইন্ডিয়াহোমস ভিশন',
      hero: {
        title: 'ভারত বাড়ির দাম পূর্বাভাস ড্যাশবোর্ড',
        subtitle: 'ভারতীয় শহর জুড়ে এআই-চালিত পূর্বাভাস, প্রবণতা এবং অন্তর্দৃষ্টি।',
        cta: 'ড্যাশবোর্ড দেখুন'
      },
      tabs: { overview: 'সংক্ষিপ্তসার', forecast: 'পূর্বাভাস', regions: 'অঞ্চল', insights: 'ইনসাইটস', settings: 'সেটিংস', predict: 'পূর্বাভাস দিন' },
      stats: { avg_price: 'গড় বাড়ির দাম', yoy_growth: 'বার্ষিক বৃদ্ধি', inventory: 'ইনভেন্টরি' },
      language: 'ভাষা',
      predict: {
        title: 'বাড়ির দাম অনুমান',
        city: 'শহর',
        area: 'এরিয়া',
        bhk: 'শোবার ঘর (BHK)',
        bath: 'বাথরুম',
        age: 'সম্পত্তির বয়স',
        amenities: 'সুবিধার স্তর',
        amenities_none: 'কিছুই নয়',
        amenities_basic: 'বেসিক',
        amenities_good: 'ভাল',
        amenities_premium: 'প্রিমিয়াম',
        cta: 'এখনই অনুমান করুন',
        output: 'অনুমান ও প্রক্ষেপণ',
        disclaimer: 'হিউরিস্টিক মডেলের উপর ভিত্তি করে অনুমান। শুধুমাত্র নির্দেশনার জন্য।',
        result_title: 'অনুমান প্রস্তুত',
        result_desc: 'আপনার অনুমানিত দাম ও ৬ মাসের প্রক্ষেপণ দেখানো হয়েছে।',
        placeholder: 'তাত্ক্ষণিক অনুমানের জন্য ফর্ম পূরণ করুন।'
      }
    }
  },
  ta: {
    common: {
      brand: 'இந்தியஹோம்ஸ் விஷன்',
      hero: {
        title: 'இந்தியா வீட்டு விலை கணிப்பு டாஷ்போர்டு',
        subtitle: 'இந்திய நகரங்களில் ஏஐ முன்னறிவிப்பு, போக்குகள் மற்றும் பார்வைகள்.',
        cta: 'டாஷ்போர்டைப் பார்க்கவும்'
      },
      tabs: { overview: 'கண்ணோட்டம்', forecast: 'முன்னறிவு', regions: 'மண்டலங்கள்', insights: 'உள்ளடக்கம்', settings: 'அமைப்புகள்', predict: 'கணிக்க' },
      stats: { avg_price: 'சராசரி வீட்டு விலை', yoy_growth: 'ஆண்டு வளர்ச்சி', inventory: 'இருப்பு' },
      language: 'மொழி',
      predict: {
        title: 'வீட்டு விலை கணிக்க',
        city: 'நகரம்',
        area: 'பரப்பு',
        bhk: 'படுக்கையறை (BHK)',
        bath: 'குளியலறை',
        age: 'சொத்து வயது',
        amenities: 'வசதிகள் நிலை',
        amenities_none: 'யாதும் இல்லை',
        amenities_basic: 'அடிப்படை',
        amenities_good: 'நன்று',
        amenities_premium: 'பிரீமியம்',
        cta: 'இப்போது கணிக்க',
        output: 'கணிப்பு & திட்டம்',
        disclaimer: 'அனுமான மாதிரியில் அடிப்படையிலான மதிப்பீடு. குறிப்புக்காக மட்டும்.',
        result_title: 'கணிப்பு தயாராகிறது',
        result_desc: 'உங்கள் மதிப்பீடும் 6 மாத திட்டமும் காட்டப்படுகிறது.',
        placeholder: 'உடனடி மதிப்பீட்டிற்குப் படிவத்தை நிரப்பவும்.'
      }
    }
  },
  or: {
    common: {
      brand: 'ଇଣ୍ଡିଆହୋମ୍ସ ଭିଜନ୍',
      hero: {
        title: 'ଭାରତ ଘର ମୂଲ୍ୟ ପୂର୍ବାନୁମାନ ଡାଶବୋର୍ଡ',
        subtitle: 'ଭାରତୀୟ ସହରଗୁଡିକରେ ଏଆଇ ଆଧାରିତ ପୂର୍ବାନୁମାନ, ପ୍ରବୃତ୍ତି ଏବଂ ଅନ୍ତର୍ଦୃଷ୍ଟି।',
        cta: 'ଡାଶବୋର୍ଡ ଦେଖନ୍ତୁ'
      },
      tabs: { overview: 'ସମୀକ୍ଷା', forecast: 'ପୂର୍ବାନୁମାନ', regions: 'ଅଞ୍ଚଳ', insights: 'ଇନସାଇଟ୍ସ', settings: 'ସେଟିଂସ୍', predict: 'ଅନୁମାନ' },
      stats: { avg_price: 'ସରାସରି ଘର ମୂଲ୍ୟ', yoy_growth: 'ବାର୍ଷିକ ବୃଦ୍ଧି', inventory: 'ଇନଭେଣ୍ଟୋରୀ' },
      language: 'ଭାଷା',
      predict: {
        title: 'ଘର ମୂଲ୍ୟ ଅନୁମାନ',
        city: 'ସହର',
        area: 'କ୍ଷେତ୍ରଫଳ',
        bhk: 'ଶଯ୍ୟାଘର (BHK)',
        bath: 'ସ୍ନାନଘର',
        age: 'ସମ୍ପତ୍ତିର ବୟସ',
        amenities: 'ସୁବିଧା ସ୍ତର',
        amenities_none: 'କିଛି ନାହିଁ',
        amenities_basic: 'ମୌଳିକ',
        amenities_good: 'ଭଲ',
        amenities_premium: 'ପ୍ରିମିୟମ୍',
        cta: 'ଏବେ ଅନୁମାନ କରନ୍ତୁ',
        output: 'ଅନୁମାନ ଓ ପ୍ରକଳ୍ପନ',
        disclaimer: 'ହ୍ୟୁରିଷ୍ଟିକ୍ ମଡେଲ୍ ଉପରେ ଆଧାରିତ ଅନୁମାନ। ମାର୍ଗଦର୍ଶନ ପାଇଁ।',
        result_title: 'ଅନୁମାନ ପ୍ରସ୍ତୁତ',
        result_desc: 'ଆପଣଙ୍କ ଅନୁମାନିତ ମୂଲ୍ୟ ଓ 6 ମାସ ପ୍ରକଳ୍ପନ ଦେଖାଯାଇଛି।',
        placeholder: 'ତତ୍କ୍ଷଣାତ୍ ଅନୁମାନ ପାଇଁ ଫର୍ମ ପୂରଣ କରନ୍ତୁ।'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;
