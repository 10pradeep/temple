import React from 'react';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';
import { PageView, TempleLocationConfig } from '../types';
import { Language } from '../translations';

interface LegalPageProps {
  locationConfig: TempleLocationConfig;
  onNavigate: (page: PageView) => void;
  language: Language;
}

export const PrivacyPolicyView: React.FC<LegalPageProps> = ({
  locationConfig,
  onNavigate,
  language
}) => {
  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '18px 12px' }}>
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '2px solid var(--color-temple-brown)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 20px',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <ShieldCheck size={24} color="var(--color-temple-brown)" />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.25rem, 3vw, 1.7rem)' }}>
            {language === 'ta'
              ? 'தனியுரிமைக் கொள்கை — மௌன குருநாதர் திருக்கோயில்'
              : 'Privacy Policy — Mouna Gurunathar Temple'}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', lineHeight: 1.65 }}>
          {language === 'ta' ? (
            <>
              <p>
                <strong>1. பக்தர் தகவல் பாதுகாப்பு:</strong> மௌன குருநாதர் திருக்கோயில் பக்தர்களின் தனியுரிமையை முழுமையாக மதிக்கிறது. தரிசனம், நன்கொடை மற்றும் அன்னதானப் பதிவுகளில் உள்ளிடப்படும் அலைபேசி எண், மின்னஞ்சல், முன்பதிவு எண் மற்றும் அர்ப்பணிப்புக் குறிப்புகள் இணையதளத்தில் ஒருபோதும் பொதுவில் வெளியிடப்படாது.
              </p>
              <p>
                <strong>2. மாதிரி உள்ளூர் சேமிப்பு அறிவிப்பு:</strong> தற்போதைய முன்மாதிரி அமைப்பில், முன்பதிவு கோரிக்கைகள், நாள்காட்டி குறிப்புகள் மற்றும் அமர்வு அமைப்புகள் உங்கள் உலாவியின் <code>localStorage</code> மூலம் மட்டுமே சேமிக்கப்படுகின்றன, வெளிப் பரிவர்த்தனை முனையங்களுக்கு அனுப்பப்படுவதில்லை.
              </p>
              <p>
                <strong>3. ரசீது அணுகல் கட்டுப்பாடு:</strong> அதிகாரப்பூர்வ மாதிரி ரசீதுகள் பதிவு செய்த பக்தரின் சரிபார்க்கப்பட்ட அமர்வில் அல்லது நிர்வாக பலகையின் ரசீது மேலாண்மைப் பிரிவில் மட்டுமே அணுக முடியும்.
              </p>
              <p>
                <strong>4. தனியுரிமை தொடர்பு முகவரி:</strong> அதிகாரப்பூர்வ மின்னஞ்சல்: <strong>{locationConfig.email}</strong> (இறுதி பயன்பாட்டுக்கு முன் நிர்வாகப் பலகையில் சரிபார்க்கப்பட்ட கோயில் மின்னஞ்சலைப் புதுப்பிக்கவும்).
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Devotee Information Confidentiality:</strong> Mouna Gurunathar Temple respects devotee privacy. Mobile numbers, email addresses, booking references, and personal dedication messages entered in Book Darisanam, Make Donation, and Annadhanam are never exposed publicly on the website.
              </p>
              <p>
                <strong>2. Prototype Local Storage Notice:</strong> In the current frontend demonstration version, booking requests, calendar additions, and session settings are stored locally in your browser via <code>localStorage</code> and are not transmitted to an external payment gateway or production server.
              </p>
              <p>
                <strong>3. Receipt Access Control:</strong> Official-format demonstration receipts are accessible only during the submitting devotee&apos;s verified workflow or through authenticated access inside the Admin Panel Receipt Management section.
              </p>
              <p>
                <strong>4. Contact for Privacy Inquiries:</strong> Official Email: <strong>{locationConfig.email}</strong> (update verified temple email in Admin Panel before production launch).
              </p>
            </>
          )}
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="button" onClick={() => onNavigate('home')} className="btn-temple-primary">
            <ArrowLeft size={16} />
            <span>{language === 'ta' ? 'முகப்புக்குத் திரும்பு' : 'Return to Mouna Gurunathar Home'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const TermsConditionsView: React.FC<LegalPageProps> = ({
  locationConfig,
  onNavigate,
  language
}) => {
  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '18px 12px' }}>
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '2px solid var(--color-temple-brown)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 20px',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <FileText size={24} color="var(--color-temple-brown)" />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.25rem, 3vw, 1.7rem)' }}>
            {language === 'ta'
              ? 'விதிமுறைகள் மற்றும் நிபந்தனைகள் — மௌன குருநாதர் திருக்கோயில்'
              : 'Terms and Conditions — Mouna Gurunathar Temple'}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', lineHeight: 1.65 }}>
          {language === 'ta' ? (
            <>
              <p>
                <strong>1. திருக்கோயில் தளத்தின் நோக்கம்:</strong> இத்தளம் மௌன குருநாதர் திருக்கோயில் திருவிழா கால அட்டவணை, தரிசன முன்பதிவு, அன்னதான சேவை மற்றும் கோயில் அறிவிப்புகளை பக்தர்களுக்கு வழங்குகிறது.
              </p>
              <p>
                <strong>2. மாதிரி செயல்பாட்டு அறிவிப்பு:</strong> கட்டண நுழைவாயில், ரசீது வழங்கல், தரிசன உறுதிப்படுத்தல் மற்றும் நிர்வாக உள்நுழைவு ஆகியவை மாதிரி முன்மாதிரி வடிவில் செயல்படுகின்றன. இங்கு உண்மையான பணப் பரிவர்த்தனை நடைபெறாது.
              </p>
              <p>
                <strong>3. தரிசனம் & அன்னதான வழிகாட்டுதல்:</strong> தரிசன முன்பதிவு 7 நாட்கள் வரம்பிற்கு உட்பட்டது. பஞ்சாங்க சந்திர தினங்கள் கோயில் நிர்வாகம் உறுதி செய்யும் வரை மாதிரி மதிப்பீடாகவே காட்டப்படும்.
              </p>
              <p>
                <strong>4. அதிகாரப்பூர்வ தொடர்பு:</strong> {locationConfig.templeName} — {locationConfig.email}
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Temple Portal Purpose:</strong> This portal serves devotees of Mouna Gurunathar Temple with festival schedules, Darisanam slot requests, Annadhanam sponsorship scheduling, and temple updates.
              </p>
              <p>
                <strong>2. Demonstration Mode Disclaimer:</strong> Payment gateways, online receipt issuance, Darisanam confirmation status, and Admin authentication operate in frontend demonstration mode until connected to Mouna Gurunathar Temple&apos;s authorized backend server. No real financial transactions are processed here.
              </p>
              <p>
                <strong>3. Darisanam & Annadhanam Guidelines:</strong> Darisanam requests are restricted to the configured seven-day rolling window. Unverified Panchangam lunar dates are clearly marked as estimates until approved by temple archakars/administrators.
              </p>
              <p>
                <strong>4. Official Contact:</strong> {locationConfig.templeName} — {locationConfig.email}
              </p>
            </>
          )}
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="button" onClick={() => onNavigate('home')} className="btn-temple-primary">
            <ArrowLeft size={16} />
            <span>{language === 'ta' ? 'முகப்புக்குத் திரும்பு' : 'Return to Mouna Gurunathar Home'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

