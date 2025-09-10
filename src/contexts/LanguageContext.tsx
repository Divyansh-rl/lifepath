import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'gu' | 'mr' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation data
const translations = {
  en: {
    // Landing Page
    'lifepath': 'LifePath',
    'tagline': 'Saving Lives Through Technology',
    'hero.subtitle': 'Streamline emergency medical services with AI-powered hospital recommendations, real-time Golden Hour tracking, and unified communication between ambulances, hospitals, and traffic control.',
    'cta.signin': 'Sign In to Dashboard',
    'cta.demo': 'Watch Demo',
    'cta.request_demo': 'Request Demo',
    'features.ai_recommendations': 'AI-Powered Hospital Recommendations',
    'features.ai_recommendations.desc': 'Smart algorithms recommend the best hospital based on patient condition, distance, and availability',
    'features.golden_hour': 'Golden Hour Tracking',
    'features.golden_hour.desc': 'Real-time countdown and monitoring to ensure critical patients receive care within the golden hour',
    'features.patient_data': 'Patient Data Collection',
    'features.patient_data.desc': 'Comprehensive patient information gathering with AI-generated medical summaries',
    'features.traffic_control': 'Traffic Control Integration',
    'features.traffic_control.desc': 'Coordinate with traffic management systems to clear ambulance routes in real-time',
    'features.multi_user': 'Multi-User Dashboard',
    'features.multi_user.desc': 'Separate interfaces for ambulance drivers, hospital staff, and traffic controllers',
    'features.realtime': 'Real-Time Updates',
    'features.realtime.desc': 'Live tracking and communication between all stakeholders in the emergency chain',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.history': 'History',
    'nav.profile': 'Profile',
    'nav.emergency': 'Emergency',
    'nav.traffic': 'Traffic',
    'nav.home': 'Home',
    
    // Dashboard
    'dashboard.welcome': 'Emergency Dashboard',
    'dashboard.start_emergency': 'Start Emergency',
    'dashboard.active_emergency': 'Active Emergency',
    'dashboard.patient_info': 'Patient Information',
    
    // Common
    'common.language': 'Language',
    'common.settings': 'Settings',
    'common.back': 'Back',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    
    // Updates & Activity
    'updates.title': "What's New",
    'updates.view_all': 'View All Updates',
    'activity.feedback': 'Send Feedback',
    
    // Authentication
    'auth.signin': 'Sign In',
    'auth.signup': 'Sign Up',
    'auth.signout': 'Sign Out',
    
    // Profile & User
    'profile.title': 'Profile',
    'profile.edit': 'Edit',
    'profile.save': 'Save',
    'profile.contact_info': 'Contact Information',
    'profile.phone': 'Phone Number',
    'profile.email': 'Email Address',
    'profile.unit': 'Emergency Unit',
    'profile.notifications': 'Notifications',
    'profile.preferences': 'Preferences',
    'profile.performance': 'Performance Statistics',
    'profile.certifications': 'Certifications & Training',
    
    // Hospital Dashboard
    'hospital.dashboard': 'Hospital Dashboard',
    'hospital.incoming': 'Incoming Patients',
    'hospital.capacity': 'Bed Capacity',
    'hospital.staff': 'Medical Staff',
    'hospital.emergency_dept': 'Emergency Department',
    'hospital.patient_details': 'Patient Details',
    'hospital.arrival_time': 'Arrival Time',
    'hospital.condition': 'Condition',
    'hospital.prepare_room': 'Prepare Room',
    
    // Emergency States
    'emergency.active': 'Active Emergency',
    'emergency.inactive': 'Ready',
    'emergency.started': 'Started',
    'emergency.golden_hour': 'Golden Hour',
    'emergency.patient_data': 'Patient Data',
    'emergency.vitals': 'Vital Signs',
    'emergency.symptoms': 'Symptoms',
    'emergency.severity': 'Severity',
    'emergency.critical': 'Critical',
    'emergency.urgent': 'Urgent',
    'emergency.stable': 'Stable',
    
    // Traffic Control
    'traffic.control_center': 'Traffic Control Center',
    'traffic.route_optimization': 'Route Optimization',
    'traffic.signal_override': 'Signal Override',
    'traffic.emergency_corridor': 'Emergency Corridor',
    'traffic.response_time': 'Response Time',
    
    // History & Reports
    'history.title': 'Emergency History',
    'history.recent_calls': 'Recent Calls',
    'history.completed': 'Completed',
    'history.duration': 'Duration',
    'history.outcome': 'Outcome',
    'history.view_details': 'View Details',
    
    // SOS & Emergency
    'sos.help_requested': 'Emergency Help Requested',
    'sos.services_notified': 'Emergency services have been notified',
    
    // Traffic Police Panel
    'traffic.police_panel': 'Traffic Police Panel',
    'traffic.route_clearance': 'Route Clearance',
    'traffic.active_clearances': 'Active Route Clearances',
    'traffic.emergency_vehicles': 'Emergency Vehicles',
    'traffic.clear_route': 'Clear Route',
    'traffic.route_cleared': 'Route Cleared',
    'traffic.signals': 'Traffic Signals',
    'traffic.control_signals': 'Control Traffic Signals',
    
    // SOS Features
    'sos.emergency_button': 'Emergency SOS',
    'sos.local_emergency': 'Local Emergency',
    'sos.press_for_help': 'Press and Hold for Emergency',
    'sos.help_requested': 'Help Requested',
    'sos.services_notified': 'All emergency services have been notified',
    'sos.location_shared': 'Your location has been shared',
    
    // Audio Support
    'audio.voice_commands': 'Voice Commands',
    'audio.speak_command': 'Speak a Command',
    'audio.listening': 'Listening...',
    'audio.not_supported': 'Voice commands not supported in this browser',
    'audio.enable_audio': 'Enable Audio',
    'audio.disable_audio': 'Disable Audio',
  },
  
  hi: {
    // Landing Page
    'lifepath': 'लाइफपाथ',
    'tagline': 'प्रौद्योगिकी के माध्यम से जीवन बचाना',
    'hero.subtitle': 'AI-संचालित अस्पताल सुझावों, रियल-टाइम गोल्डन आवर ट्रैकिंग, और एम्बुलेंस, अस्पतालों और ट्रैफिक नियंत्रण के बीच एकीकृत संचार के साथ आपातकालीन चिकित्सा सेवाओं को सुव्यवस्थित करें।',
    'cta.signin': 'डैशबोर्ड में साइन इन करें',
    'cta.demo': 'डेमो देखें',
    'cta.request_demo': 'डेमो का अनुरोध करें',
    'features.ai_recommendations': 'AI-संचालित अस्पताल सुझाव',
    'features.ai_recommendations.desc': 'रोगी की स्थिति, दूरी और उपलब्धता के आधार पर स्मार्ट एल्गोरिदम सर्वोत्तम अस्पताल की सिफारिश करते हैं',
    'features.golden_hour': 'गोल्डन आवर ट्रैकिंग',
    'features.golden_hour.desc': 'यह सुनिश्चित करने के लिए रियल-टाइम काउंटडाउन और निगरानी कि गंभीर रोगियों को गोल्डन आवर के भीतर देखभाल मिले',
    'features.patient_data': 'रोगी डेटा संग्रह',
    'features.patient_data.desc': 'AI-जनरेटेड चिकित्सा सारांश के साथ व्यापक रोगी जानकारी संग्रह',
    'features.traffic_control': 'यातायात नियंत्रण एकीकरण',
    'features.traffic_control.desc': 'रियल-टाइम में एम्बुलेंस रूट साफ़ करने के लिए ट्रैफिक प्रबंधन सिस्टम के साथ समन्वय',
    'features.multi_user': 'बहु-उपयोगकर्ता डैशबोर्ड',
    'features.multi_user.desc': 'एम्बुलेंस ड्राइवरों, अस्पताल कर्मचारियों और ट्रैफिक नियंत्रकों के लिए अलग इंटरफेस',
    'features.realtime': 'रियल-टाइम अपडेट',
    'features.realtime.desc': 'आपातकालीन श्रृंखला में सभी हितधारकों के बीच लाइव ट्रैकिंग और संचार',
    
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.history': 'इतिहास',
    'nav.profile': 'प्रोफाइल',
    'nav.emergency': 'आपातकाल',
    'nav.traffic': 'ट्रैफिक',
    'nav.home': 'होम',
    
    // Dashboard
    'dashboard.welcome': 'आपातकालीन डैशबोर्ड',
    'dashboard.start_emergency': 'आपातकाल प्रारंभ करें',
    'dashboard.active_emergency': 'सक्रिय आपातकाल',
    'dashboard.patient_info': 'रोगी की जानकारी',
    
    // Common
    'common.language': 'भाषा',
    'common.settings': 'सेटिंग्स',
    'common.back': 'वापस',
    'common.cancel': 'रद्द करें',
    'common.save': 'सेव करें',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    
    // Updates & Activity
    'updates.title': 'नया क्या है',
    'updates.view_all': 'सभी अपडेट देखें',
    'activity.feedback': 'फीडबैक भेजें',
    
    // Authentication
    'auth.signin': 'साइन इन करें',
    'auth.signup': 'साइन अप करें',
    'auth.signout': 'साइन आउट करें',
    
    // Profile & User
    'profile.title': 'प्रोफाइल',
    'profile.edit': 'संपादित करें',
    'profile.save': 'सेव करें',
    'profile.contact_info': 'संपर्क जानकारी',
    'profile.phone': 'फोन नंबर',
    'profile.email': 'ईमेल पता',
    'profile.unit': 'आपातकालीन इकाई',
    'profile.notifications': 'सूचनाएं',
    'profile.preferences': 'प्राथमिकताएं',
    'profile.performance': 'प्रदर्शन आंकड़े',
    'profile.certifications': 'प्रमाणपत्र और प्रशिक्षण',
    
    // Hospital Dashboard
    'hospital.dashboard': 'अस्पताल डैशबोर्ड',
    'hospital.incoming': 'आने वाले मरीज़',
    'hospital.capacity': 'बेड क्षमता',
    'hospital.staff': 'चिकित्सा कर्मचारी',
    'hospital.emergency_dept': 'आपातकालीन विभाग',
    'hospital.patient_details': 'मरीज़ का विवरण',
    'hospital.arrival_time': 'आगमन समय',
    'hospital.condition': 'स्थिति',
    'hospital.prepare_room': 'कमरा तैयार करें',
    
    // Emergency States
    'emergency.active': 'सक्रिय आपातकाल',
    'emergency.inactive': 'तैयार',
    'emergency.started': 'शुरू किया गया',
    'emergency.golden_hour': 'गोल्डन आवर',
    'emergency.patient_data': 'मरीज़ डेटा',
    'emergency.vitals': 'महत्वपूर्ण संकेतक',
    'emergency.symptoms': 'लक्षण',
    'emergency.severity': 'गंभीरता',
    'emergency.critical': 'गंभीर',
    'emergency.urgent': 'तत्काल',
    'emergency.stable': 'स्थिर',
    
    // Traffic Control
    'traffic.control_center': 'यातायात नियंत्रण केंद्र',
    'traffic.route_optimization': 'मार्ग अनुकूलन',
    'traffic.signal_override': 'सिग्नल ओवरराइड',
    'traffic.emergency_corridor': 'आपातकालीन कोरिडोर',
    'traffic.response_time': 'प्रतिक्रिया समय',
    
    // History & Reports
    'history.title': 'आपातकालीन इतिहास',
    'history.recent_calls': 'हाल की कॉलें',
    'history.completed': 'पूर्ण',
    'history.duration': 'अवधि',
    'history.outcome': 'परिणाम',
    'history.view_details': 'विवरण देखें',
    
    // SOS & Emergency
    'sos.help_requested': 'आपातकालीन सहायता का अनुरोध',
    'sos.services_notified': 'आपातकालीन सेवाओं को सूचित कर दिया गया है',
    
    // Traffic Police Panel
    'traffic.police_panel': 'ट्रैफिक पुलिस पैनल',
    'traffic.route_clearance': 'रूट क्लियरेंस',
    'traffic.active_clearances': 'सक्रिय रूट क्लियरेंस',
    'traffic.emergency_vehicles': 'आपातकालीन वाहन',
    'traffic.clear_route': 'रूट साफ़ करें',
    'traffic.route_cleared': 'रूट साफ़ कर दिया गया',
    'traffic.signals': 'ट्रैफिक सिग्नल',
    'traffic.control_signals': 'ट्रैफिक सिग्नल नियंत्रण',
    
    // SOS Features
    'sos.emergency_button': 'आपातकालीन SOS',
    'sos.local_emergency': 'स्थानीय आपातकाल',
    'sos.press_for_help': 'सहायता के लिए दबाकर रखें',
    'sos.help_requested': 'सहायता का अनुरोध किया गया',
    'sos.services_notified': 'सभी आपातकालीन सेवाओं को सूचना दी गई है',
    'sos.location_shared': 'आपका स्थान साझा किया गया है',
    
    // Audio Support
    'audio.voice_commands': 'आवाज़ कमांड',
    'audio.speak_command': 'कमांड बोलें',
    'audio.listening': 'सुन रहा है...',
    'audio.not_supported': 'इस ब्राउज़र में आवाज़ कमांड समर्थित नहीं है',
    'audio.enable_audio': 'ऑडियो सक्षम करें',
    'audio.disable_audio': 'ऑडियो अक्षम करें',
  },
  
  gu: {
    // Landing Page
    'lifepath': 'લાઇફપાથ',
    'tagline': 'ટેકનોલોજી દ્વારા જીવન બચાવવું',
    'hero.subtitle': 'AI-સંચાલિત હોસ્પિટલ ભલામણો, રીઅલ-ટાઇમ ગોલ્ડન અવર ટ્રેકિંગ, અને એમ્બ્યુલન્સ, હોસ્પિટલો અને ટ્રાફિક નિયંત્રણ વચ્ચે એકીકૃત સંદેશાવ્યવહાર સાથે કટોકટી તબીબી સેવાઓને સુવ્યવસ્થિત કરો.',
    'cta.signin': 'ડેશબોર્ડમાં સાઇન ઇન કરો',
    'cta.demo': 'ડેમો જુઓ',
    'cta.request_demo': 'ડેમોની વિનંતી કરો',
    'features.ai_recommendations': 'AI-સંચાલિત હોસ્પિટલ ભલામણો',
    'features.ai_recommendations.desc': 'સ્માર્ટ એલ્ગોરિધમ દર્દીની સ્થિति, અંતર અને ઉપલબ્ધતાના આધારે શ્રેષ્ઠ હોસ્પિટલની ભલામણ કરે છે',
    'features.golden_hour': 'ગોલ્ડન અવર ટ્રેકિંગ',
    'features.golden_hour.desc': 'ગંભીર દર્દીઓને ગોલ્ડન અવર દરમિયાન સંભાળ મળે તેની ખાતરી કરવા માટે રીઅલ-ટાઇમ કાઉન્ટડાઉન અને મોનિટરિંગ',
    'features.patient_data': 'દર્દીની ડેટા સંગ્રહ',
    'features.patient_data.desc': 'AI-જનરેટેડ મેડિકલ સારાંશ સાથે વ્યાપક દર્દી માહિતી સંગ્રહ',
    'features.traffic_control': 'ટ્રાફિક નિયંત્રણ એકીકરણ',
    'features.traffic_control.desc': 'રીઅલ-ટાઇમમાં એમ્બ્યુલન્સ રૂટ સાફ કરવા માટે ટ્રાફિક મેનેજમેન્ટ સિસ્ટમ સાથે સમન્વય',
    'features.multi_user': 'મલ્ટિ-યુઝર ડેશબોર્ડ',
    'features.multi_user.desc': 'એમ્બ્યુલન્સ ડ્રાઇવરો, હોસ્પિટલ સ્ટાફ અને ટ્રાફિક કન્ટ્રોલર માટે અલગ ઇન્ટરફેસ',
    'features.realtime': 'રીઅલ-ટાઇમ અપડેટ્સ',
    'features.realtime.desc': 'કટોકટી શૃંખલામાં તમામ હિતધારકો વચ્ચે લાઇવ ટ્રેકિંગ અને સંદેશાવ્યવહાર',
    
    // Navigation
    'nav.dashboard': 'ડેશબોર્ડ',
    'nav.history': 'ઇતિહાસ',
    'nav.profile': 'પ્રોફાઇલ',
    'nav.emergency': 'કટોકટી',
    'nav.traffic': 'ટ્રાફિક',
    'nav.home': 'હોમ',
    
    // Dashboard
    'dashboard.welcome': 'કટોકટી ડેશબોર્ડ',
    'dashboard.start_emergency': 'કટોકટી શરૂ કરો',
    'dashboard.active_emergency': 'સક્રિય કટોકટી',
    'dashboard.patient_info': 'દર્દીની માહિતી',
    
    // Common
    'common.language': 'ભાષા',
    'common.settings': 'સેટિંગ્સ',
    'common.back': 'પાછળ',
    'common.cancel': 'રદ કરો',
    'common.save': 'સેવ કરો',
    'common.loading': 'લોડ થઈ રહ્યું છે...',
    'common.error': 'ભૂલ',
    'common.success': 'સફળતા',
    
    // Updates & Activity
    'updates.title': 'નવું શું છે',
    'updates.view_all': 'બધા અપડેટ્સ જુઓ',
    'activity.feedback': 'ફીડબેક મોકલો',
    
    // Authentication
    'auth.signin': 'સાઇન ઇન કરો',
    'auth.signup': 'સાઇન અપ કરો',
    'auth.signout': 'સાઇન આઉટ કરો',
    
    // Profile & User
    'profile.title': 'પ્રોફાઇલ',
    'profile.edit': 'સંપાદિત કરો',
    'profile.save': 'સેવ કરો',
    'profile.contact_info': 'સંપર્ક માહિતી',
    'profile.phone': 'ફોન નંબર',
    'profile.email': 'ઈમેઇલ સરનામું',
    'profile.unit': 'કટોકટી એકમ',
    'profile.notifications': 'સૂચનાઓ',
    'profile.preferences': 'પસંદગીઓ',
    'profile.performance': 'પ્રદર્શન આંકડા',
    'profile.certifications': 'પ્રમાણપત્રો અને તાલીમ',
    
    // Hospital Dashboard
    'hospital.dashboard': 'હોસ્પિટલ ડેશબોર્ડ',
    'hospital.incoming': 'આવનારા દર્દીઓ',
    'hospital.capacity': 'બેડ ક્ષમતા',
    'hospital.staff': 'મેડિકલ સ્ટાફ',
    'hospital.emergency_dept': 'કટોકટી વિભાગ',
    'hospital.patient_details': 'દર્દીની વિગતો',
    'hospital.arrival_time': 'આગમન સમય',
    'hospital.condition': 'સ્થિતિ',
    'hospital.prepare_room': 'રૂમ તૈયાર કરો',
    
    // Emergency States
    'emergency.active': 'સક્રિય કટોકટી',
    'emergency.inactive': 'તૈયાર',
    'emergency.started': 'શરૂ કર્યું',
    'emergency.golden_hour': 'ગોલ્ડન અવર',
    'emergency.patient_data': 'દર્દીનો ડેટા',
    'emergency.vitals': 'જીવનચિહ્નો',
    'emergency.symptoms': 'લક્ષણો',
    'emergency.severity': 'ગંભીરતા',
    'emergency.critical': 'ગંભીર',
    'emergency.urgent': 'તાત્કાલિક',
    'emergency.stable': 'સ્થિર',
    
    // Traffic Control
    'traffic.control_center': 'ટ્રાફિક કંટ્રોલ સેન્ટર',
    'traffic.route_optimization': 'રૂટ ઓપ્ટિમાઇઝેશન',
    'traffic.signal_override': 'સિગ્નલ ઓવરરાઇડ',
    'traffic.emergency_corridor': 'કટોકટી કોરિડોર',
    'traffic.response_time': 'પ્રતિસાદ સમય',
    
    // History & Reports
    'history.title': 'કટોકટી ઇતિહાસ',
    'history.recent_calls': 'તાજેતરના કોલ્સ',
    'history.completed': 'પૂર્ણ',
    'history.duration': 'અવધિ',
    'history.outcome': 'પરિણામ',
    'history.view_details': 'વિગતો જુઓ',
    
    // SOS & Emergency
    'sos.help_requested': 'કટોકટી મદદની વિનંતી',
    'sos.services_notified': 'કટોકટી સેવાઓને સૂચિત કરવામાં આવી છે',
    
    // Traffic Police Panel
    'traffic.police_panel': 'ટ્રાફિક પોલીસ પેનલ',
    'traffic.route_clearance': 'રૂટ ક્લિયરન્સ',
    'traffic.active_clearances': 'સક્રિય રૂટ ક્લિયરન્સ',
    'traffic.emergency_vehicles': 'કટોકટી વાહનો',
    'traffic.clear_route': 'રૂટ સાફ કરો',
    'traffic.route_cleared': 'રૂટ સાફ કરવામાં આવ્યો',
    'traffic.signals': 'ટ્રાફિક સિગ્નલ',
    'traffic.control_signals': 'ટ્રાફિક સિગ્નલ નિયંત્રણ',
    
    // SOS Features
    'sos.emergency_button': 'કટોકટી SOS',
    'sos.local_emergency': 'સ્થાનિક કટોકટી',
    'sos.press_for_help': 'મદદ માટે દબાવીને રાખો',
    'sos.help_requested': 'મદદની વિનંતી કરી',
    'sos.services_notified': 'બધી કટોકટી સેવાઓને જાણ કરવામાં આવી છે',
    'sos.location_shared': 'તમારું સ્થાન શેર કરવામાં આવ્યું છે',
    
    // Audio Support
    'audio.voice_commands': 'અવાજ આદેશો',
    'audio.speak_command': 'આદેશ બોલો',
    'audio.listening': 'સાંભળી રહ્યું છે...',
    'audio.not_supported': 'આ બ્રાઉઝરમાં અવાજ આદેશો સપોર્ટેડ નથી',
    'audio.enable_audio': 'ઑડિયો સક્ષમ કરો',
    'audio.disable_audio': 'ઑડિયો અક્ષમ કરો',
  },
  
  mr: {
    // Landing Page
    'lifepath': 'लाइफपाथ',
    'tagline': 'तंत्रज्ञानाच्या माध्यमातून जीव वाचवणे',
    'hero.subtitle': 'AI-चालित रुग्णालय शिफारसी, रिअल-टाइम गोल्डन अवर ट्रॅकिंग, आणि रुग्णवाहिका, रुग्णालये आणि वाहतूक नियंत्रण यांच्यात एकत्रित संवादाद्वारे आपातकालीन वैद्यकीय सेवा सुव्यवस्थित करा.',
    'cta.signin': 'डॅशबोर्डमध्ये साइन इन करा',
    'cta.demo': 'डेमो पहा',
    'cta.request_demo': 'डेमोची विनंती करा',
    'features.ai_recommendations': 'AI-चालित रुग्णालय शिफारसी',
    'features.ai_recommendations.desc': 'स्मार्ट अल्गोरिदम रुग्णाची स्थिती, अंतर आणि उपलब्धता यावर आधारित सर्वोत्तम रुग्णालयाची शिफारस करतात',
    'features.golden_hour': 'गोल्डन अवर ट्रॅकिंग',
    'features.golden_hour.desc': 'गंभीर रुग्णांना गोल्डन अवरमध्ये काळजी मिळेल याची खात्री करण्यासाठी रिअल-टाइम काउंटडाउन आणि मॉनिटरिंग',
    'features.patient_data': 'रुग्ण डेटा संकलन',
    'features.patient_data.desc': 'AI-जनरेटेड वैद्यकीय सारांशासह सर्वसमावेशक रुग्ण माहिती संकलन',
    'features.traffic_control': 'वाहतूक नियंत्रण एकीकरण',
    'features.traffic_control.desc': 'रिअल-टाइममध्ये रुग्णवाहिका मार्ग साफ करण्यासाठी वाहतूक व्यवस्थापन प्रणालीसह समन्वय',
    'features.multi_user': 'मल्टी-यूझर डॅशबोर्ड',
    'features.multi_user.desc': 'रुग्णवाहिका चालक, रुग्णालय कर्मचारी आणि वाहतूक नियंत्रकांसाठी स्वतंत्र इंटरफेस',
    'features.realtime': 'रिअल-टाइम अपडेट्स',
    'features.realtime.desc': 'आपातकालीन साखळीतील सर्व भागधारकांमधील लाइव्ह ट्रॅकिंग आणि संवाद',
    
    // Navigation
    'nav.dashboard': 'डॅशबोर्ड',
    'nav.history': 'इतिहास',
    'nav.profile': 'प्रोफाइल',
    'nav.emergency': 'आपातकाल',
    'nav.traffic': 'वाहतूक',
    'nav.home': 'होम',
    
    // Dashboard
    'dashboard.welcome': 'आपातकालीन डॅशबोर्ड',
    'dashboard.start_emergency': 'आपातकाल सुरू करा',
    'dashboard.active_emergency': 'सक्रिय आपातकाल',
    'dashboard.patient_info': 'रुग्णाची माहिती',
    
    // Common
    'common.language': 'भाषा',
    'common.settings': 'सेटिंग्ज',
    'common.back': 'परत',
    'common.cancel': 'रद्द करा',
    'common.save': 'जतन करा',
    'common.loading': 'लोड होत आहे...',
    'common.error': 'त्रुटी',
    'common.success': 'यश',
    
    // Updates & Activity
    'updates.title': 'नवीन काय आहे',
    'updates.view_all': 'सर्व अपडेट्स पहा',
    'activity.feedback': 'अभिप्राय पाठवा',
    
    // Authentication
    'auth.signin': 'साइन इन करा',
    'auth.signup': 'साइन अप करा',
    'auth.signout': 'साइन आउट करा',
    
    // Profile & User
    'profile.title': 'प्रोफाइल',
    'profile.edit': 'संपादित करा',
    'profile.save': 'जतन करा',
    'profile.contact_info': 'संपर्क माहिती',
    'profile.phone': 'फोन नंबर',
    'profile.email': 'ईमेल पत्ता',
    'profile.unit': 'आपत्कालीन युनिट',
    'profile.notifications': 'सूचना',
    'profile.preferences': 'प्राधान्ये',
    'profile.performance': 'कामगिरी आकडेवारी',
    'profile.certifications': 'प्रमाणपत्रे आणि प्रशिक्षण',
    
    // Hospital Dashboard
    'hospital.dashboard': 'हॉस्पिटल डॅशबोर्ड',
    'hospital.incoming': 'येणारे रुग्ण',
    'hospital.capacity': 'बेड क्षमता',
    'hospital.staff': 'वैद्यकीय कर्मचारी',
    'hospital.emergency_dept': 'आपत्कालीन विभाग',
    'hospital.patient_details': 'रुग्णाचे तपशील',
    'hospital.arrival_time': 'आगमन वेळ',
    'hospital.condition': 'स्थिती',
    'hospital.prepare_room': 'खोली तयार करा',
    
    // Emergency States
    'emergency.active': 'सक्रिय आपत्काल',
    'emergency.inactive': 'तयार',
    'emergency.started': 'सुरू केले',
    'emergency.golden_hour': 'गोल्डन अवर',
    'emergency.patient_data': 'रुग्ण डेटा',
    'emergency.vitals': 'जीवनचिन्हे',
    'emergency.symptoms': 'लक्षणे',
    'emergency.severity': 'गंभीरता',
    'emergency.critical': 'गंभीर',
    'emergency.urgent': 'तातडीची',
    'emergency.stable': 'स्थिर',
    
    // Traffic Control
    'traffic.control_center': 'वाहतूक नियंत्रण केंद्र',
    'traffic.route_optimization': 'मार्ग अनुकूलन',
    'traffic.signal_override': 'सिग्नल ओव्हरराइड',
    'traffic.emergency_corridor': 'आपत्कालीन कॉरिडॉर',
    'traffic.response_time': 'प्रतिसाद वेळ',
    
    // History & Reports
    'history.title': 'आपत्कालीन इतिहास',
    'history.recent_calls': 'अलीकडील कॉल्स',
    'history.completed': 'पूर्ण',
    'history.duration': 'कालावधी',
    'history.outcome': 'निकाल',
    'history.view_details': 'तपशील पहा',
    
    // SOS & Emergency
    'sos.help_requested': 'आपत्कालीन मदतीची विनंती',
    'sos.services_notified': 'आपत्कालीन सेवांना सूचित केले आहे',
    
    // Traffic Police Panel
    'traffic.police_panel': 'वाहतूक पोलिस पॅनेल',
    'traffic.route_clearance': 'मार्ग मंजुरी',
    'traffic.active_clearances': 'सक्रिय मार्ग मंजुरी',
    'traffic.emergency_vehicles': 'आपत्कालीन वाहने',
    'traffic.clear_route': 'मार्ग साफ करा',
    'traffic.route_cleared': 'मार्ग साफ केला',
    'traffic.signals': 'वाहतूक सिग्नल',
    'traffic.control_signals': 'वाहतूक सिग्नल नियंत्रण',
    
    // SOS Features
    'sos.emergency_button': 'आपत्कालीन SOS',
    'sos.local_emergency': 'स्थानिक आपत्काल',
    'sos.press_for_help': 'मदतीसाठी दाबून ठेवा',
    'sos.help_requested': 'मदतीची विनंती केली',
    'sos.services_notified': 'सर्व आपत्कालीन सेवांना कळविण्यात आले आहे',
    'sos.location_shared': 'तुमचे स्थान शेअर केले आहे',
    
    // Audio Support
    'audio.voice_commands': 'आवाज आदेश',
    'audio.speak_command': 'आदेश बोला',
    'audio.listening': 'ऐकत आहे...',
    'audio.not_supported': 'या ब्राउझरमध्ये आवाज आदेश समर्थित नाहीत',
    'audio.enable_audio': 'ऑडिओ सक्षम करा',
    'audio.disable_audio': 'ऑडिओ अक्षम करा',
  },
  
  ta: {
    // Landing Page
    'lifepath': 'லைஃப்பாத்',
    'tagline': 'தொழில்நுட்பத்தின் மூலம் உயிர்களைக் காப்பாற்றுதல்',
    'hero.subtitle': 'AI-இயங்கும் மருத்துவமனை பரிந்துரை��ள், நிகழ்நேர கோல்டன் ஹவர் கண்காணிப்பு, மற்றும் ஆம்புலன்ஸ், மருத்துவமனைகள் மற்றும் போக்குவரத்து கட்டுப்பாட்டுக்கு இடையிலான ஒருங்கிணைந்த தொடர்புடன் அவசரகால மருத்துவ சேவைகளை ஒழுங்குபடுத்துங்கள்.',
    'cta.signin': 'டேஷ்போர்டில் உள்நுழையவும்',
    'cta.demo': 'டெமோவைக் காணவும்',
    'cta.request_demo': 'டெமோவை கோரவும்',
    'features.ai_recommendations': 'AI-இயங்கும் மருத்துவமனை பரிந்துரைகள்',
    'features.ai_recommendations.desc': 'நோயாளியின் நிலை, தூரம் மற்றும் கிடைக்கும் தன்மையின் அடிப்படையில் சிறந்த மருத்துவமனையை பரிந்துரைக்கும் ஸ்மார்ட் அல்காரிதம்கள்',
    'features.golden_hour': 'கோல்டன் ஹவர் கண்காணிப்பு',
    'features.golden_hour.desc': 'முக்கியமான நோயாளிகளுக்கு கோல்டன் ஹவரில் கவனிப்பு கிடைப்பதை உறுதி செய்ய நிகழ்நேர கண்ணில்ஸ் மற்றும் கண்காணிப்பு',
    'features.patient_data': 'நோயாளி தரவு சேகரிப்பு',
    'features.patient_data.desc': 'AI-உருவாக்கப்பட்ட மருத்துவ சுருக்கத்துடன் விரிவான நோயாளி தகவல் சேகரிப்பு',
    'features.traffic_control': 'போக்குவரத்து கட்டுப்பாடு ஒருங்கிணைப்பு',
    'features.traffic_control.desc': 'நிகழ்நேரத்தில் ஆம்புலன்ஸ் வழிகளை அழிக்க போக்குவரத்து மேலாண்மை அமைப்புகளுடன் ஒருங்கிணைப்பு',
    'features.multi_user': 'பல்பயனர் டேஷ்போர்டு',
    'features.multi_user.desc': 'ஆம்புலன்ஸ் ஓட்டுநர்கள், மருத்துவமனை ஊழியர்கள் மற்றும் போக்குவரத்து கட்டுப்பாட்டாளர்களுக்கு தனி இடைமுகங்கள்',
    'features.realtime': 'நிகழ்நேர புதுப்பிப்புகள்',
    'features.realtime.desc': 'அவசரகால சங்கிலியில் உள்ள அனைத்து பங்குதாரர்களுக்கும் இடையில் நேரடி கண்காணிப்பு மற்றும் தொடர்பு',
    
    // Navigation
    'nav.dashboard': 'டேஷ்போர்டு',
    'nav.history': 'வரலாறு',
    'nav.profile': 'சுயவிவரம்',
    'nav.emergency': 'அவசரநிலை',
    'nav.traffic': 'போக்குவரத்து',
    'nav.home': 'வீடு',
    
    // Dashboard
    'dashboard.welcome': 'அவசரகால டேஷ்போர்டு',
    'dashboard.start_emergency': 'அவசரநிலையைத் தொடங்கவும்',
    'dashboard.active_emergency': 'செயலில் உள்ள அவசரநிலை',
    'dashboard.patient_info': 'நோயாளி தகவல்',
    
    // Common
    'common.language': 'மொழி',
    'common.settings': 'அமைப்புகள்',
    'common.back': 'பின்வருகிறது',
    'common.cancel': 'ரத்துசெய்',
    'common.save': 'சேமிக்கவும்',
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை',
    'common.success': 'வெற்றி',
    
    // Updates & Activity
    'updates.title': 'புதியது என்ன',
    'updates.view_all': 'அனைத்து புதுப்பிப்புகளையும் காணவும்',
    'activity.feedback': 'கருத்துக்களை அனுப்பவும்',
    
    // Authentication
    'auth.signin': 'உள்நுழையவும்',
    'auth.signup': 'பதிவு செய்யவும்',
    'auth.signout': 'வெளியேறவும்',
    
    // Profile & User
    'profile.title': 'சுயவிவரம்',
    'profile.edit': 'திருத்தவும்',
    'profile.save': 'சேமிக்கவும்',
    'profile.contact_info': 'தொடர்பு தகவல்',
    'profile.phone': 'தொலைபேசி எண்',
    'profile.email': 'மின்னஞ்சல் முகவரி',
    'profile.unit': 'அவசரகால பிரிவு',
    'profile.notifications': 'அறிவிப்புகள்',
    'profile.preferences': 'விருப்பத்தேர்வுகள்',
    'profile.performance': 'செயல்திறன் புள்ளிவிவரங்கள்',
    'profile.certifications': 'சான்றிதழ்கள் மற்றும் பயிற்சி',
    
    // Hospital Dashboard
    'hospital.dashboard': 'மருத்துவமனை டேஷ்போர்டு',
    'hospital.incoming': 'வரும் நோயாளிகள்',
    'hospital.capacity': 'படுக்கை திறன்',
    'hospital.staff': 'மருத்துவ ஊழியர்கள்',
    'hospital.emergency_dept': 'அவசரகால துறை',
    'hospital.patient_details': 'நோயாளி விவரங்கள்',
    'hospital.arrival_time': 'வருகை நேரம்',
    'hospital.condition': 'நிலை',
    'hospital.prepare_room': 'அறையை தயார் செய்யவும்',
    
    // Emergency States
    'emergency.active': 'செயலில் உள்ள அவசரநிலை',
    'emergency.inactive': 'தயார்',
    'emergency.started': 'தொடங்கப்பட்டது',
    'emergency.golden_hour': 'கோல்டன் ஹவர்',
    'emergency.patient_data': 'நோயாளி தரவு',
    'emergency.vitals': 'உயிர்ச்சக்தி அறிகுறிகள்',
    'emergency.symptoms': 'அறிகுறிகள்',
    'emergency.severity': 'தீவிரம்',
    'emergency.critical': 'நியாயமான',
    'emergency.urgent': 'அவசரம்',
    'emergency.stable': 'நிலையான',
    
    // Traffic Control
    'traffic.control_center': 'போக்குவரத்து கட்டுப்பாட்டு மையம்',
    'traffic.route_optimization': 'வழி மேம்படுத்தல்',
    'traffic.signal_override': 'சிக்னல் ஓவர்ரைடு',
    'traffic.emergency_corridor': 'அவசரகால கொரிடார்',
    'traffic.response_time': 'பதிலடி நேரம்',
    
    // History & Reports
    'history.title': 'அவசரகால வரலாறு',
    'history.recent_calls': 'சமீபத்திய அழைப்புகள்',
    'history.completed': 'முடிந்தது',
    'history.duration': 'கால அளவு',
    'history.outcome': 'முடிவு',
    'history.view_details': 'விவரங்களைக் காணவும்',
    
    // SOS & Emergency
    'sos.help_requested': 'அவசரகால உதவி கோரப்பட்டது',
    'sos.services_notified': 'அவசரகால சேவைகளுக்கு அறிவிக்கப்பட்டது',
    
    // Traffic Police Panel
    'traffic.police_panel': 'போக்குவரத்து காவல் பேனல்',
    'traffic.route_clearance': 'வழி அனுமதி',
    'traffic.active_clearances': 'செயலில் உள்ள வழி அனுமதிகள்',
    'traffic.emergency_vehicles': 'அவசரகால வாகனங்கள்',
    'traffic.clear_route': 'வழியை அழிக்கவும்',
    'traffic.route_cleared': 'வழி அழிக்கப்பட்டது',
    'traffic.signals': 'போக்குவரத்து சிக்னல்கள்',
    'traffic.control_signals': 'போக்குவரத்து சிக்னல் கட்டுப்பாடு',
    
    // SOS Features
    'sos.emergency_button': 'அவசரகால SOS',
    'sos.local_emergency': 'உள்ளூர் அவசரநிலை',
    'sos.press_for_help': 'உதவிக்காக அழுத்தி வைக்கவும்',
    'sos.help_requested': 'உதவி கோரப்பட்டது',
    'sos.services_notified': 'அனைத்து அவசரகால சேவைகளுக்கும் தெரிவிக்கப்பட்டுள்ளது',
    'sos.location_shared': 'உங்கள் இடம் பகிரப்பட்டுள்ளது',
    
    // Audio Support
    'audio.voice_commands': 'குரல் கட்டளைகள்',
    'audio.speak_command': 'கட்டளையைச் சொல்லுங்கள்',
    'audio.listening': 'கேட்டுக்கொண்டிருக்கிறது...',
    'audio.not_supported': 'இந்த உலாவியில் குரல் கட்டளைகள் ஆதரிக்கப்படவில்லை',
    'audio.enable_audio': 'ஆடியோவை இயக்கவும்',
    'audio.disable_audio': 'ஆடியோவை முடக்கவும்',
  }
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get saved language from localStorage
    const saved = localStorage.getItem('lifepath-language');
    if (saved && ['en', 'hi', 'gu', 'mr', 'ta'].includes(saved)) {
      return saved as Language;
    }
    // Default to English if no saved preference or browser detection fails
    return 'en';
  });

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('lifepath-language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}