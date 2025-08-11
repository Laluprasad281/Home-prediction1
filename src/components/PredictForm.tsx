import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CITIES = [
  { id: 'mumbai', name: 'Mumbai (MMR)', base: 125000 },
  { id: 'bengaluru', name: 'Bengaluru', base: 95000 },
  { id: 'delhi', name: 'Delhi NCR', base: 90000 },
  { id: 'hyderabad', name: 'Hyderabad', base: 85000 },
  { id: 'pune', name: 'Pune', base: 82000 },
  { id: 'kolkata', name: 'Kolkata', base: 78000 },
];

function calcPrediction(params: { city: string; area: number; bhk: number; bath: number; age: number; amenities: number; }) {
  const city = CITIES.find(c => c.id === params.city) || CITIES[0];
  // Simple heuristic model: base city rate per sqft with multipliers
  const rate = city.base
    * (1 + (params.bhk - 2) * 0.05)
    * (1 + (params.bath - 2) * 0.03)
    * (1 - Math.min(params.age, 30) * 0.01)
    * (1 + params.amenities * 0.04);
  const price = Math.max(5e5, rate * params.area); // lower bound
  return Math.round(price);
}

export default function PredictForm() {
  const { t } = useTranslation();
  const [city, setCity] = React.useState(CITIES[0].id);
  const [area, setArea] = React.useState(1000);
  const [bhk, setBhk] = React.useState(2);
  const [bath, setBath] = React.useState(2);
  const [age, setAge] = React.useState(5);
  const [amenities, setAmenities] = React.useState(2);
  const [result, setResult] = React.useState<number | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = calcPrediction({ city, area, bhk, bath, age, amenities });
    setResult(price);
    toast({ title: t('predict.result_title') as string, description: t('predict.result_desc') as string });
  };

  const projection = React.useMemo(() => {
    if (!result) return [] as Array<{ month: string; value: number }>;
    // 6-month simple growth projection based on city
    const cityConf = CITIES.find(c => c.id === city) || CITIES[0];
    const monthly = cityConf.base / 1000000; // tiny relative growth proxy
    return Array.from({ length: 6 }, (_, i) => ({
      month: `M${i + 1}`,
      value: Math.round(result * (1 + monthly * i) / 100000) / 10, // in Lakh
    }));
  }, [result, city]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle>{t('predict.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="city">{t('predict.city')}</Label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger id="city"><SelectValue placeholder={t('predict.city')} /></SelectTrigger>
                <SelectContent>
                  {CITIES.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="area">{t('predict.area')} (sqft)</Label>
              <Input id="area" type="number" min={200} max={10000} value={area}
                onChange={(e) => setArea(Number(e.target.value))} />
            </div>

            <div>
              <Label htmlFor="bhk">{t('predict.bhk')}</Label>
              <Input id="bhk" type="number" min={1} max={6} value={bhk}
                onChange={(e) => setBhk(Number(e.target.value))} />
            </div>

            <div>
              <Label htmlFor="bath">{t('predict.bath')}</Label>
              <Input id="bath" type="number" min={1} max={6} value={bath}
                onChange={(e) => setBath(Number(e.target.value))} />
            </div>

            <div>
              <Label htmlFor="age">{t('predict.age')} (years)</Label>
              <Input id="age" type="number" min={0} max={30} value={age}
                onChange={(e) => setAge(Number(e.target.value))} />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="amenities">{t('predict.amenities')}</Label>
              <Select value={String(amenities)} onValueChange={(v) => setAmenities(Number(v))}>
                <SelectTrigger id="amenities"><SelectValue placeholder={t('predict.amenities')} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">{t('predict.amenities_none')}</SelectItem>
                  <SelectItem value="1">{t('predict.amenities_basic')}</SelectItem>
                  <SelectItem value="2">{t('predict.amenities_good')}</SelectItem>
                  <SelectItem value="3">{t('predict.amenities_premium')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2 flex gap-3 mt-2">
              <Button variant="hero" type="submit">{t('predict.cta')}</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle>{t('predict.output')}</CardTitle>
        </CardHeader>
        <CardContent>
          {result ? (
            <>
              <div className="text-3xl font-semibold mb-2">₹ {Math.round(result / 100000)} L</div>
              <p className="text-muted-foreground mb-4">{t('predict.disclaimer')}</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projection} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" unit=" L" />
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--accent))" strokeWidth={3} dot={true} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">{t('predict.placeholder')}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
