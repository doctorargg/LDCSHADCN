import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp, Users, Star } from "lucide-react";
import { EXTERNAL_URLS } from "@/lib/constants";

export function SuccessStories() {
  const featuredStory = {
    patientName: "Jeffrey J.",
    condition: "Severe Cardiovascular Crisis & Obesity",
    beforeMetrics: {
      bloodPressure: "214/120",
      weight: "297 lbs",
      heartCondition: "Severely enlarged heart"
    },
    afterMetrics: {
      bloodPressure: "120/76",
      weight: "244 lbs",
      weightLoss: "53 lbs lost"
    },
    timeFrame: "6 months",
    quote: "I feel so much better and can do things I thought I would never be able to do again. Thank you Dr Rosenberg, Savannah, and Brian!! You guys are awesome!!!",
    keyActions: [
      "Immediate EKG revealed enlarged heart",
      "Instant cardiologist referral",
      "Fought insurance company for medication coverage",
      "Prescribed appropriate blood pressure medication",
      "Coordinated comprehensive weight loss treatment"
    ]
  };

  const successMetrics = [
    { label: "Blood Pressure Normalized", value: "214/120 → 120/76", icon: Heart },
    { label: "Weight Loss Achieved", value: "53 lbs in 6 months", icon: TrendingUp },
    { label: "Life-Changing Results", value: "Complete transformation", icon: Users }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Patient Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real transformations from patients who found hope and healing through our comprehensive, personalized approach to healthcare.
            </p>
          </div>

          {/* Featured Success Story */}
          <Card className="mb-12 border-2 border-primary/20 shadow-lg">
            <CardHeader className="bg-primary/5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-primary">
                    From Crisis to Complete Recovery
                  </CardTitle>
                  <p className="text-gray-600 mt-2">
                    {featuredStory.patientName} - {featuredStory.condition}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Before & After Metrics */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-4 text-red-700">
                      Before Treatment
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-sm font-medium">Blood Pressure</span>
                        <span className="text-lg font-bold text-red-700">
                          {featuredStory.beforeMetrics.bloodPressure}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-sm font-medium">Weight</span>
                        <span className="text-lg font-bold text-red-700">
                          {featuredStory.beforeMetrics.weight}
                        </span>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <span className="text-sm font-medium text-red-700">
                          {featuredStory.beforeMetrics.heartCondition}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-4 text-green-700">
                      After {featuredStory.timeFrame}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">Blood Pressure</span>
                        <span className="text-lg font-bold text-green-700">
                          {featuredStory.afterMetrics.bloodPressure}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">Weight</span>
                        <span className="text-lg font-bold text-green-700">
                          {featuredStory.afterMetrics.weight}
                        </span>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium text-green-700">
                          {featuredStory.afterMetrics.weightLoss}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Patient Story & Key Actions */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-4">
                      What Made the Difference
                    </h4>
                    <ul className="space-y-3">
                      {featuredStory.keyActions.map((action, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3">
                      Patient's Words
                    </h4>
                    <blockquote className="text-gray-700 italic leading-relaxed">
                      "{featuredStory.quote}"
                    </blockquote>
                    <p className="text-sm text-gray-600 mt-4 font-medium">
                      - {featuredStory.patientName}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Metrics */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {successMetrics.map((metric, index) => (
              <Card key={index} className="text-center border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <metric.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{metric.label}</h3>
                  <p className="text-2xl font-bold text-primary">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="bg-primary/5 border-primary/20 text-center">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold mb-4">
                Could This Be Your Success Story?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Don't wait for a health crisis to take action. Our personalized approach 
                has helped countless patients achieve remarkable transformations. Schedule 
                your free discovery call today to learn how we can help you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href={EXTERNAL_URLS.BOOK_APPOINTMENT} target="_blank" rel="noopener noreferrer">
                    Schedule Free Discovery Call
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="/about/testimonials">
                    Read More Success Stories
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}