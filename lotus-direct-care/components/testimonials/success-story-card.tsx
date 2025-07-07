import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, TrendingUp, Star } from "lucide-react";

interface SuccessStoryProps {
  patientName: string;
  condition: string;
  beforeMetrics: {
    bloodPressure: string;
    weight: string;
    heartCondition: string;
  };
  afterMetrics: {
    bloodPressure: string;
    weight: string;
    weightLoss: string;
  };
  timeFrame: string;
  quote: string;
  keyActions: string[];
}

export function SuccessStoryCard({
  patientName,
  condition,
  beforeMetrics,
  afterMetrics,
  timeFrame,
  quote,
  keyActions,
}: SuccessStoryProps) {
  return (
    <Card className="mb-12 border-2 border-primary/20 shadow-lg">
      <CardHeader className="bg-primary/5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-primary">
              From Crisis to Complete Recovery
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {patientName} - {condition}
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
                    {beforeMetrics.bloodPressure}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium">Weight</span>
                  <span className="text-lg font-bold text-red-700">
                    {beforeMetrics.weight}
                  </span>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium text-red-700">
                    {beforeMetrics.heartCondition}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 text-green-700">
                After {timeFrame}
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium">Blood Pressure</span>
                  <span className="text-lg font-bold text-green-700">
                    {afterMetrics.bloodPressure}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium">Weight</span>
                  <span className="text-lg font-bold text-green-700">
                    {afterMetrics.weight}
                  </span>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-green-700">
                    {afterMetrics.weightLoss}
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
                {keyActions.map((action, index) => (
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
                "{quote}"
              </blockquote>
              <p className="text-sm text-gray-600 mt-4 font-medium">
                - {patientName}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}