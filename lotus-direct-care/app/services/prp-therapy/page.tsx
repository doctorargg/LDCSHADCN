import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { LeadCaptureForm } from '@/components/forms/lead-capture-form'
import { HeroWithImage } from '@/components/layout/hero-with-image'
import { 
  Sparkles,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Users,
  Microscope,
  TrendingUp,
  Syringe,
  Heart,
  Timer,
  Shield
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'PRP Injections for Joint Pain, Hair Loss & Aesthetics | Lotus Direct Care',
  description: 'Platelet-rich plasma (PRP) therapy for arthritis, sports injuries, hair restoration, and regenerative medicine. Natural healing in Mequon, WI.',
  keywords: 'PRP therapy mequon, platelet rich plasma wisconsin, PRP injections milwaukee, joint pain treatment, hair restoration PRP, regenerative medicine',
  openGraph: {
    title: 'PRP Therapy at Lotus Direct Care',
    description: 'Natural regenerative therapy using your own platelets to heal joints, restore hair, and rejuvenate tissue.',
    images: ['/images/Lotus Midjourney Flowers/lotus-prp-injections-hero.png'],
  }
}

const processSteps = [
  {
    step: '1',
    title: 'Consultation',
    description: 'Assessment and candidacy evaluation for PRP therapy'
  },
  {
    step: '2',
    title: 'Blood Draw',
    description: 'Simple blood draw, similar to routine lab work'
  },
  {
    step: '3',
    title: 'Processing',
    description: 'Centrifuge separation to concentrate platelets (15 min)'
  },
  {
    step: '4',
    title: 'Preparation',
    description: 'Numbing and cleaning of treatment area'
  },
  {
    step: '5',
    title: 'Injection',
    description: 'Precise placement of PRP using ultrasound guidance when needed'
  },
  {
    step: '6',
    title: 'Recovery',
    description: 'Brief recovery period with aftercare instructions'
  }
]

const resultTimeline = [
  { period: 'Week 1-2', description: 'Initial healing response begins' },
  { period: 'Week 4-6', description: 'Tissue regeneration accelerates' },
  { period: 'Month 2-3', description: 'Noticeable improvement in symptoms' },
  { period: 'Month 3-6', description: 'Maximum benefit achieved' },
  { period: 'Long-term', description: 'Lasting results with maintenance' }
]

const idealCandidates = [
  'Active individuals seeking natural healing',
  'Mild to moderate joint conditions',
  'Failed conservative treatments',
  'Want to avoid or delay surgery',
  'Prefer regenerative approaches'
]

const notSuitableFor = [
  'Active infections',
  'Blood disorders',
  'Certain medications (blood thinners)',
  'Active cancer',
  'Severe end-stage arthritis'
]

const faqItems = [
  {
    question: 'How many treatments will I need?',
    answer: 'Most conditions require 1-3 treatments spaced 4-6 weeks apart. Hair restoration typically needs 3-4 sessions. We\'ll create a personalized treatment plan based on your specific condition and response.'
  },
  {
    question: 'Is PRP painful?',
    answer: 'We use numbing medication before injections to minimize discomfort. Most patients describe mild pressure during the injection. Any soreness afterward is typically mild and resolves within a few days.'
  },
  {
    question: 'How long do results last?',
    answer: 'Results can last 6-12 months or longer for joint conditions. Hair restoration results are typically maintained with annual touch-ups. Individual results vary based on condition severity and lifestyle factors.'
  },
  {
    question: 'Can I exercise after PRP?',
    answer: 'We recommend rest for 24-48 hours, then gradual return to activity. Light exercise can resume after 3-5 days, with full activity typically allowed after 2 weeks. We\'ll provide specific guidelines based on your treatment area.'
  },
  {
    question: 'Is PRP covered by insurance?',
    answer: 'Most insurance plans don\'t cover PRP therapy yet. However, it\'s HSA/FSA eligible, and we offer flexible payment plans. We\'ll provide documentation for potential reimbursement.'
  },
  {
    question: 'How is PRP different from stem cells?',
    answer: 'PRP uses concentrated platelets from your blood to stimulate healing, while stem cell therapy uses cells that can develop into different tissue types. PRP is simpler, more affordable, and has extensive research support.'
  },
  {
    question: 'What are the risks?',
    answer: 'Since PRP uses your own blood, risks are minimal. Possible side effects include temporary soreness, swelling, or bruising at the injection site. Serious complications are extremely rare.'
  },
  {
    question: 'Can I combine PRP with other treatments?',
    answer: 'Yes! PRP often works well with physical therapy, supplements, and other regenerative treatments. We\'ll discuss the best combination approach for your specific condition.'
  }
]

export default function PRPTherapyPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroWithImage
        imageSrc="/images/Lotus Midjourney Flowers/lotus-prp-injections-hero.png"
        imageAlt="Lotus Direct Care - PRP Therapy"
        title="PRP Therapy"
        subtitle="Harness your body's natural healing power with platelet-rich plasma"
        showCTA={true}
        primaryCTAText="Book PRP Consultation"
        primaryCTAHref="https://app.elationemr.com/book/lotusdirectcare"
        secondaryCTAText="Learn More"
        secondaryCTAHref="#intro"
      >
        <Badge className="mb-4 bg-white/20 text-white border-white/30">
          <Sparkles className="w-4 h-4 mr-1" />
          Regenerative Medicine
        </Badge>
      </HeroWithImage>

      {/* Introduction Section */}
      <section id="intro" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Unlock Your Body's Natural Healing Ability
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Your body has an incredible capacity to heal itself. With PRP therapy, we concentrate 
              and harness the healing power of your own platelets to accelerate repair, reduce pain, 
              and regenerate tissue – naturally and safely.
            </p>
            <p className="text-lg text-gray-600">
              Dr. Rosenberg combines advanced regenerative medicine techniques with a functional 
              approach to help you achieve lasting results without surgery or synthetic medications.
            </p>
          </div>
        </div>
      </section>

      {/* What is PRP Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  What is PRP Therapy?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Platelet-Rich Plasma (PRP) therapy uses a concentrated form of your own blood platelets 
                  to accelerate healing. These platelets contain powerful growth factors that stimulate 
                  tissue repair, reduce inflammation, and promote regeneration.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Microscope className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">The Concentration Process</h3>
                      <p className="text-gray-600">We draw a small amount of your blood and use advanced 
                      centrifuge technology to concentrate platelets 5-10x normal levels.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Growth Factor Release</h3>
                      <p className="text-gray-600">Concentrated platelets release growth factors including 
                      PDGF, TGF-β, VEGF, and EGF that trigger your body's healing cascade.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Natural Healing</h3>
                      <p className="text-gray-600">Because PRP comes from your own body, there's virtually 
                      no risk of rejection or adverse reaction – just accelerated natural healing.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-teal-50 border-teal-200">
                <CardHeader>
                  <CardTitle className="text-2xl">Why PRP Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Stimulates stem cell recruitment to injury sites</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Increases collagen production for tissue strength</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Enhances blood vessel formation for better healing</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Reduces inflammation and modulates immune response</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Activates tissue regeneration at the cellular level</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* PRP Applications - Tabbed Interface */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our PRP Applications
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From joint pain to aesthetic enhancement, PRP offers versatile healing solutions
              </p>
            </div>

            <Tabs defaultValue="orthopedic" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="orthopedic">Orthopedic/Joint</TabsTrigger>
                <TabsTrigger value="aesthetic">Aesthetic/Hair</TabsTrigger>
                <TabsTrigger value="sexual">Sexual Health</TabsTrigger>
                <TabsTrigger value="other">Other Applications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="orthopedic" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Orthopedic & Joint Applications</CardTitle>
                    <CardDescription>
                      Natural healing for musculoskeletal conditions without surgery
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Conditions We Treat:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            <span>Knee osteoarthritis</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            <span>Rotator cuff injuries</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            <span>Tennis/Golfer's elbow</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            <span>Achilles tendonitis</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            <span>Plantar fasciitis</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            <span>Hip pain & bursitis</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            <span>Sports injuries</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Benefits for Joint Health:</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li>• Reduces pain and inflammation naturally</li>
                          <li>• Improves joint function and mobility</li>
                          <li>• Delays or prevents need for surgery</li>
                          <li>• Stimulates cartilage regeneration</li>
                          <li>• Minimal downtime compared to surgery</li>
                          <li>• Can be repeated safely if needed</li>
                        </ul>
                      </div>
                    </div>
                    <Alert className="mt-6 border-teal-200 bg-teal-50">
                      <AlertCircle className="h-4 w-4 text-teal-600" />
                      <AlertDescription>
                        Research shows 60-85% of patients experience significant improvement in pain 
                        and function with PRP injections for joint conditions.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="aesthetic" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Aesthetic & Hair Restoration</CardTitle>
                    <CardDescription>
                      Natural rejuvenation using your body's own growth factors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Hair Restoration:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            <span>Male pattern baldness</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            <span>Female hair thinning</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            <span>Alopecia areata</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            <span>Post-pregnancy hair loss</span>
                          </li>
                        </ul>
                        <p className="mt-3 text-sm text-gray-600">
                          PRP stimulates dormant follicles and strengthens existing hair
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Facial Rejuvenation:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            <span>Fine lines and wrinkles</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            <span>Skin texture improvement</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            <span>Acne scar reduction</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            <span>Under-eye rejuvenation</span>
                          </li>
                        </ul>
                        <p className="mt-3 text-sm text-gray-600">
                          Natural collagen stimulation for younger-looking skin
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sexual" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sexual Health & Wellness</CardTitle>
                    <CardDescription>
                      Confidential, natural enhancement for intimate wellness
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Male Sexual Wellness (P-Shot):</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li>• Enhanced erectile function</li>
                          <li>• Improved sensitivity and pleasure</li>
                          <li>• Increased stamina and performance</li>
                          <li>• Natural, drug-free approach</li>
                          <li>• May help with Peyronie's disease</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Female Sexual Wellness (O-Shot):</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li>• Increased arousal and sensitivity</li>
                          <li>• Improved natural lubrication</li>
                          <li>• Enhanced orgasm intensity</li>
                          <li>• May help with incontinence</li>
                          <li>• Vaginal rejuvenation effects</li>
                        </ul>
                      </div>
                    </div>
                    <Alert className="mt-6 border-blue-200 bg-blue-50">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <AlertDescription>
                        All sexual wellness treatments are performed with complete discretion and privacy. 
                        Consultations are confidential and judgment-free.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="other" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Other Medical Applications</CardTitle>
                    <CardDescription>
                      Expanding uses for PRP in regenerative medicine
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Chronic Wound Healing</h4>
                        <p className="text-gray-600">Diabetic ulcers, non-healing wounds, and surgical sites</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Dental & Oral Surgery</h4>
                        <p className="text-gray-600">Bone grafting, implant sites, and TMJ disorders</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">General Tissue Repair</h4>
                        <p className="text-gray-600">Ligament injuries, muscle tears, and post-surgical healing</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Neuropathy</h4>
                        <p className="text-gray-600">Peripheral nerve regeneration and pain relief</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* The Science Behind PRP */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                The Science Behind PRP
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Evidence-based regenerative medicine with proven results
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Platelet Biology & Growth Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Platelets contain over 30 bioactive proteins and growth factors that orchestrate 
                    tissue repair:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• <strong>PDGF:</strong> Stimulates cell replication and angiogenesis</li>
                    <li>• <strong>TGF-β:</strong> Enhances matrix production and wound healing</li>
                    <li>• <strong>VEGF:</strong> Promotes new blood vessel formation</li>
                    <li>• <strong>EGF:</strong> Stimulates epithelial regeneration</li>
                    <li>• <strong>FGF:</strong> Promotes tissue repair and collagen production</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Clinical Research Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Extensive research supports PRP effectiveness:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• <strong>Osteoarthritis:</strong> 70-80% improvement in pain scores</li>
                    <li>• <strong>Tendinopathy:</strong> 60-85% success rate vs 30% placebo</li>
                    <li>• <strong>Hair Loss:</strong> 30-40% increase in hair density</li>
                    <li>• <strong>Wound Healing:</strong> 2x faster healing rates</li>
                    <li>• <strong>Safety:</strong> &lt;1% adverse event rate in studies</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle>PRP vs Other Treatments</CardTitle>
                <CardDescription>
                  How PRP compares to conventional treatment options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Factor</TableHead>
                      <TableHead>PRP</TableHead>
                      <TableHead>Cortisone</TableHead>
                      <TableHead>Surgery</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Natural</TableCell>
                      <TableCell className="text-green-600">✓</TableCell>
                      <TableCell className="text-red-600">✗</TableCell>
                      <TableCell className="text-red-600">✗</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Long-lasting</TableCell>
                      <TableCell className="text-green-600">✓</TableCell>
                      <TableCell className="text-red-600">✗</TableCell>
                      <TableCell className="text-green-600">✓</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Downtime</TableCell>
                      <TableCell className="text-green-600">Minimal</TableCell>
                      <TableCell className="text-green-600">None</TableCell>
                      <TableCell className="text-red-600">Significant</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Risk</TableCell>
                      <TableCell className="text-green-600">Low</TableCell>
                      <TableCell className="text-yellow-600">Medium</TableCell>
                      <TableCell className="text-red-600">High</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cost</TableCell>
                      <TableCell>$$</TableCell>
                      <TableCell>$</TableCell>
                      <TableCell>$$$$</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Regenerative</TableCell>
                      <TableCell className="text-green-600">✓</TableCell>
                      <TableCell className="text-red-600">✗</TableCell>
                      <TableCell className="text-red-600">✗</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The PRP Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                The PRP Process at Lotus
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A comfortable, efficient treatment experience - typically 45-60 minutes total
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((item, index) => (
                <Card key={index} className="relative hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 text-teal-600 font-bold text-xl">
                      {item.step}
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardContent>
                  {index < processSteps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-300 w-6 h-6 z-10" />
                  )}
                </Card>
              ))}
            </div>

            <Alert className="mt-8 border-teal-200 bg-teal-50">
              <Timer className="h-4 w-4 text-teal-600" />
              <AlertDescription>
                <strong>Time Commitment:</strong> Plan for about 45-60 minutes for your PRP treatment. 
                Most of this time is for preparation and processing - the actual injection takes just minutes.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* What Makes Our PRP Different */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Makes Our PRP Different
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience, precision, and personalized protocols for optimal results
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white/90 backdrop-blur">
                <CardHeader>
                  <Syringe className="w-10 h-10 text-teal-600 mb-4" />
                  <CardTitle>Precision Techniques</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Dr. Rosenberg uses advanced injection techniques and ultrasound guidance when 
                    needed to ensure precise placement for maximum effectiveness.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur">
                <CardHeader>
                  <Microscope className="w-10 h-10 text-blue-600 mb-4" />
                  <CardTitle>High-Quality System</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our advanced centrifuge system produces consistently high platelet concentrations, 
                    ensuring you get the most potent PRP possible.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur">
                <CardHeader>
                  <Users className="w-10 h-10 text-purple-600 mb-4" />
                  <CardTitle>Customized Protocols</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Every condition requires a unique approach. We tailor concentration levels, 
                    injection techniques, and treatment frequency to your specific needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur">
                <CardHeader>
                  <Heart className="w-10 h-10 text-red-600 mb-4" />
                  <CardTitle>Functional Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We combine PRP with nutritional support, lifestyle optimization, and other 
                    therapies to address root causes and enhance results.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur">
                <CardHeader>
                  <Shield className="w-10 h-10 text-green-600 mb-4" />
                  <CardTitle>Ultrasound Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    For deep or complex injections, we use ultrasound imaging to visualize 
                    the treatment area and ensure accurate placement.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur">
                <CardHeader>
                  <TrendingUp className="w-10 h-10 text-indigo-600 mb-4" />
                  <CardTitle>Follow-up Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Your care doesn't end after treatment. We provide comprehensive follow-up, 
                    rehabilitation guidance, and maintenance planning.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Expected Results Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Expected Results Timeline
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                While individual results vary, here's what most patients experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {resultTimeline.map((item, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <CardTitle className="text-lg text-teal-600">{item.period}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Alert className="mt-8 border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription>
                <strong>Individual Variation:</strong> Results timeline can vary based on your condition, 
                overall health, age, and adherence to post-treatment recommendations. Some patients see 
                improvement sooner, while others may need additional treatments.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Good Candidates Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Good Candidates for PRP
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Ideal Candidates</CardTitle>
                  <CardDescription className="text-green-700">
                    You may be a great candidate if you:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {idealCandidates.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800">Not Suitable For</CardTitle>
                  <CardDescription className="text-red-700">
                    PRP may not be appropriate if you have:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {notSuitableFor.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Transparent Pricing
              </h2>
              <p className="text-lg text-gray-600">
                Invest in your health with clear, upfront pricing
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>PRP Treatment Pricing</CardTitle>
                <CardDescription>
                  All prices include consultation, treatment, and follow-up care
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Treatment Type</TableHead>
                      <TableHead>Single Session</TableHead>
                      <TableHead>Package (3 Sessions)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Single Joint Injection</TableCell>
                      <TableCell>$650</TableCell>
                      <TableCell>$1,650 (Save $300)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bilateral Joints (both knees, etc)</TableCell>
                      <TableCell>$950</TableCell>
                      <TableCell>$2,400 (Save $450)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Hair Restoration</TableCell>
                      <TableCell>$800</TableCell>
                      <TableCell>$2,000 (Save $400)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Facial Rejuvenation</TableCell>
                      <TableCell>$750</TableCell>
                      <TableCell>$1,900 (Save $350)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sexual Wellness (P-Shot/O-Shot)</TableCell>
                      <TableCell>$900</TableCell>
                      <TableCell>Contact for package pricing</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="mt-6 space-y-3">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    HSA/FSA eligible - we provide documentation
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Flexible payment plans available
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Combination treatments available - ask about bundled pricing
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section with Lead Capture */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-teal-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Ready to Harness Your Body's Healing Power?
                </h2>
                <p className="text-lg text-gray-600">
                  Whether you're dealing with joint pain, hair loss, or seeking natural rejuvenation, 
                  PRP therapy offers a proven path to healing. Schedule your consultation with 
                  Dr. Rosenberg to discover if PRP is right for you.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Comprehensive evaluation to determine candidacy
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Personalized treatment plan for your specific condition
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Clear pricing and treatment timeline
                    </span>
                  </li>
                </ul>
              </div>
              
              <div>
                <LeadCaptureForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/contact">Have More Questions? Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Related Services
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Functional Medicine</CardTitle>
                  <CardDescription>
                    Address root causes to enhance PRP results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Optimize your body's healing response with comprehensive functional medicine support.
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/services/functional-medicine">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Longevity Medicine</CardTitle>
                  <CardDescription>
                    Combine PRP with anti-aging protocols
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Integrate regenerative therapies into a comprehensive longevity plan.
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/services/longevity-medicine">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Direct Primary Care</CardTitle>
                  <CardDescription>
                    Ongoing support for optimal results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Get continuous care and monitoring through our membership program.
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/services/direct-primary-care">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 p-4 z-40">
        <Button asChild size="lg" className="w-full">
          <a href="https://app.elationemr.com/book/lotusdirectcare">
            Book PRP Consultation
          </a>
        </Button>
      </div>
    </>
  )
}