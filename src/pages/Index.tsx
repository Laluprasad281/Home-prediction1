import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimatedHomesBackground from '@/components/AnimatedHomesBackground';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import PredictForm from '@/components/PredictForm';
import heroHomes from '@/assets/hero-homes.jpg';
import { Home, BarChart3, Globe2, Lightbulb } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const priceData = [
  { month: 'Jan', value: 74 },
  { month: 'Feb', value: 75 },
  { month: 'Mar', value: 76 },
  { month: 'Apr', value: 78 },
  { month: 'May', value: 80 },
  { month: 'Jun', value: 82 },
  { month: 'Jul', value: 83 },
  { month: 'Aug', value: 84 },
  { month: 'Sep', value: 85 },
  { month: 'Oct', value: 86 },
  { month: 'Nov', value: 87 },
  { month: 'Dec', value: 89 },
];

export default function Index() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'IndiaHomes Vision — Home Price Prediction';
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-primary pulse" aria-hidden />
            <span className="font-display text-xl font-semibold">{t('brand')}</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="hero" className="hover-scale">
              <Home className="mr-1" />
              {t('hero.cta')}
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden" aria-label="Hero">
        <img
          src={heroHomes}
          alt="Indian homes and skyline illustration"
          className="absolute inset-0 w-full h-full object-cover opacity-60 animate-ken-burns"
          loading="eager"
        />
        <AnimatedHomesBackground className="absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background" />
        <div className="container mx-auto px-6 pt-20 pb-16 relative">
          <div className="max-w-3xl animate-enter">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-6">
              {t('hero.subtitle')}
            </p>
            <div className="flex items-center gap-3">
              <a href="#dashboard">
                <Button variant="hero" size="lg" className="hover-scale">
                  <BarChart3 className="mr-2" /> {t('tabs.overview')}
                </Button>
              </a>
              <a href="#dashboard" className="story-link text-primary">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>

      <main id="dashboard" className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <AnimatedHomesBackground className="absolute inset-0 opacity-10" />
        </div>
        <div className="container mx-auto px-6 pb-20 relative">
          <Tabs defaultValue="predict" className="w-full">
            <TabsList className="grid grid-cols-5 md:w-[800px]">
              <TabsTrigger value="overview"><BarChart3 className="mr-1" />{t('tabs.overview')}</TabsTrigger>
              <TabsTrigger value="predict">{t('tabs.predict')}</TabsTrigger>
              <TabsTrigger value="forecast">{t('tabs.forecast')}</TabsTrigger>
              <TabsTrigger value="regions"><Globe2 className="mr-1" />{t('tabs.regions')}</TabsTrigger>
              <TabsTrigger value="insights"><Lightbulb className="mr-1" />{t('tabs.insights')}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <section aria-labelledby="overview-heading">
                <h2 id="overview-heading" className="sr-only">{t('tabs.overview')}</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="glass-card animate-fade-in">
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">{t('stats.avg_price')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold">₹ 89 L</div>
                      <p className="text-xs text-muted-foreground">National Index</p>
                    </CardContent>
                  </Card>

                  <Card className="glass-card animate-fade-in">
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">{t('stats.yoy_growth')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold text-[hsl(var(--accent))]">+6.4%</div>
                      <p className="text-xs text-muted-foreground">YoY</p>
                    </CardContent>
                  </Card>

                  <Card className="glass-card animate-fade-in">
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">{t('stats.inventory')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-semibold">3.2M</div>
                      <p className="text-xs text-muted-foreground">Active Listings</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4">
                  <Card className="animate-scale-in">
                    <CardHeader>
                      <CardTitle>Home Price Index (Last 12 months)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={priceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                          <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </TabsContent>

            <TabsContent value="predict" className="mt-8">
              <PredictForm />
            </TabsContent>

            <TabsContent value="forecast" className="mt-8">
              <section aria-labelledby="forecast-heading">
                <h2 id="forecast-heading" className="sr-only">{t('tabs.forecast')}</h2>
                <Card className="animate-scale-in">
                  <CardHeader>
                    <CardTitle>12-Month Forecast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Projected national growth: <span className="text-[hsl(var(--primary))] font-medium">+5.1%</span>. Tier-1 cities expected to outperform driven by demand and infra push.</p>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>

            <TabsContent value="regions" className="mt-8">
              <section aria-labelledby="regions-heading">
                <h2 id="regions-heading" className="sr-only">{t('tabs.regions')}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader><CardTitle>Mumbai (MMR)</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Strong premium segment; price momentum sustained. YoY: <span className="text-[hsl(var(--accent))] font-medium">+7.2%</span></p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>Bengaluru</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">IT-driven demand with stable absorption. YoY: <span className="text-[hsl(var(--accent))] font-medium">+6.1%</span></p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>Delhi NCR</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Affordable to mid-segment leading sales. YoY: <span className="text-[hsl(var(--accent))] font-medium">+5.4%</span></p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>Hyderabad</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Supply normalization; stable pricing. YoY: <span className="text-[hsl(var(--accent))] font-medium">+4.9%</span></p>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </TabsContent>

            <TabsContent value="insights" className="mt-8">
              <section aria-labelledby="insights-heading">
                <h2 id="insights-heading" className="sr-only">{t('tabs.insights')}</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="glass-card animate-fade-in">
                    <CardHeader><CardTitle>Affordability</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">EMI-to-income ratios remain comfortable in most metros despite rising rates.</p>
                    </CardContent>
                  </Card>
                  <Card className="glass-card animate-fade-in">
                    <CardHeader><CardTitle>Supply</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Launches aligned with demand; inventory overhang improving steadily.</p>
                    </CardContent>
                  </Card>
                  <Card className="glass-card animate-fade-in">
                    <CardHeader><CardTitle>Policy</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Infra investments and RERA compliance support healthier market cycles.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'IndiaHomes Vision',
            applicationCategory: 'RealEstateApplication',
            url: '/',
            inLanguage: 'en-IN',
            description: 'AI-powered Indian home price predictions, trends, and insights.'
          }),
        }}
      />
    </div>
  );
}
