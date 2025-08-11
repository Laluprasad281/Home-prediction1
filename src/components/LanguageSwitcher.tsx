import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'or', label: 'ଓଡ଼ିଆ' },
];

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = i18n.language?.split('-')[0] || 'en';

  return (
    <div className="min-w-[140px]">
      <label className="sr-only" htmlFor="lang">
        {t('language')}
      </label>
      <Select
        defaultValue={current}
        onValueChange={async (val) => {
          await i18n.changeLanguage(val);
          toast({ title: '✅ Language updated' });
        }}
      >
        <SelectTrigger id="lang" aria-label={t('language')} className="w-full">
          <SelectValue placeholder={t('language')} />
        </SelectTrigger>
        <SelectContent>
          {LANGS.map((l) => (
            <SelectItem key={l.code} value={l.code}>
              {l.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
