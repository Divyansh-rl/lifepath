import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import {
  Shield,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  Car,
  Navigation,
  Activity,
  Route,
  Phone,
  Radio,
  Siren,
  Map,
  Users,
  Zap,
  Eye,
  Settings,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import type { Screen, EmergencyState } from "../App";

interface TrafficPolicePanelProps {
  navigateToScreen: (screen: Screen) => void;
  emergencyState: EmergencyState;
}

interface RouteClearing {
  id: string;
  ambulanceId: string;
  route: string;
  startTime: Date;
  estimatedDuration: number;
  status: "active" | "completed" | "cancelled";
  priority: "high" | "medium" | "low";
}

export function TrafficPolicePanel({
  navigateToScreen,
  emergencyState,
}: TrafficPolicePanelProps) {
  const { t } = useLanguage();
  const [routeClearings, setRouteClearings] = useState<
    RouteClearing[]
  >([]);
  const [activeSignals, setActiveSignals] = useState<string[]>(
    [],
  );

  // Mock route clearings data
  useEffect(() => {
    const mockClearings: RouteClearing[] = [
      {
        id: "1",
        ambulanceId: "AMB-101",
        route: "Joshi Marg to Mahatma Gandhi Hospital",
        startTime: new Date(Date.now() - 300000), // 5 minutes ago
        estimatedDuration: 12,
        status: "active",
        priority: "high",
      },
      {
        id: "2",
        ambulanceId: "AMB-205",
        route: "Tonk Road to Sawai Man Singh (SMS) Hospital ",
        startTime: new Date(Date.now() - 180000), // 3 minutes ago
        estimatedDuration: 8,
        status: "active",
        priority: "medium",
      },
    ];

    // Add current emergency if active
    if (
      emergencyState.isActive &&
      emergencyState.selectedHospital
    ) {
      mockClearings.unshift({
        id: "current",
        ambulanceId: "AMB-117",
        route: `Current Location to ${emergencyState.selectedHospital.name}`,
        startTime: emergencyState.startTime || new Date(),
        estimatedDuration: parseInt(
          emergencyState.selectedHospital.eta.split(" ")[0],
        ),
        status: "active",
        priority: "high",
      });
    }

    setRouteClearings(mockClearings);
  }, [emergencyState]);

  const clearRoute = (clearingId: string) => {
    setRouteClearings((prev) =>
      prev.map((clearing) =>
        clearing.id === clearingId
          ? { ...clearing, status: "completed" as const }
          : clearing,
      ),
    );
  };

  const controlSignal = (intersection: string) => {
    setActiveSignals((prev) =>
      prev.includes(intersection)
        ? prev.filter((sig) => sig !== intersection)
        : [...prev, intersection],
    );
  };

  const getTimeElapsed = (startTime: Date) => {
    const elapsed = Math.floor(
      (Date.now() - startTime.getTime()) / 1000 / 60,
    );
    return `${elapsed} min ago`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const trafficSignals = [
    "Ajmeri Gate Circle",
    "MI Road (Panch Batti)",
    "Statue Circle",
    "Rambagh Circle",
    "Tonk Road Junction",
  ];

  return (
    <div className="min-h-screen p-4 pb-20 md:pb-4 pt-2 bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t("traffic.police_panel")}
              </h1>
              <p className="text-lg text-gray-600">
                Jaipur Traffic Control Center
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigateToScreen("dashboard")}
              className="bg-white/80 backdrop-blur-sm"
            >
              <Activity className="h-4 w-4 mr-2" />
              {t("nav.dashboard")}
            </Button>
          </div>
        </div>

        {/* Status Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {t("traffic.active_clearances")}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {
                      routeClearings.filter(
                        (c) => c.status === "active",
                      ).length
                    }
                  </p>
                </div>
                <Route className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {t("traffic.signals")}
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {activeSignals.length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {t("traffic.emergency_vehicles")}
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {
                      routeClearings.filter(
                        (c) => c.priority === "high",
                      ).length
                    }
                  </p>
                </div>
                <Siren className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Response Time
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    2.4m
                  </p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Route Clearances */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5" />
                {t("traffic.active_clearances")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {routeClearings.filter(
                  (c) => c.status === "active",
                ).length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Activity className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">
                      No active route clearances
                    </p>
                    <p className="text-sm">
                      All emergency routes are clear
                    </p>
                  </div>
                ) : (
                  routeClearings
                    .filter((c) => c.status === "active")
                    .map((clearing) => (
                      <Card
                        key={clearing.id}
                        className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <Car className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <span className="font-bold text-lg">
                                  {clearing.ambulanceId}
                                </span>
                                <Badge
                                  className={`ml-2 ${getPriorityColor(clearing.priority)}`}
                                >
                                  {clearing.priority.toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-muted-foreground">
                                Started
                              </div>
                              <div className="font-medium">
                                {getTimeElapsed(
                                  clearing.startTime,
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Navigation className="h-4 w-4 text-blue-600" />
                              <span className="font-medium">
                                {clearing.route}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>
                                ETA:{" "}
                                {clearing.estimatedDuration}{" "}
                                minutes
                              </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="pt-2">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span>Route Progress</span>
                                <span>65%</span>
                              </div>
                              <Progress
                                value={65}
                                className="h-2"
                              />
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              onClick={() =>
                                clearRoute(clearing.id)
                              }
                              size="sm"
                              className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              {t("traffic.route_cleared")}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="px-3"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Traffic Signal Control Sidebar */}
        <div className="space-y-6">
          {/* Traffic Signal Control */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                {t("traffic.control_signals")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {trafficSignals.map((signal) => (
                  <div
                    key={signal}
                    className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full shadow-sm ${
                            activeSignals.includes(signal)
                              ? "bg-green-500 animate-pulse"
                              : "bg-red-500"
                          }`}
                        />
                        <span className="text-sm font-medium">
                          {signal}
                        </span>
                      </div>
                      <Badge
                        variant={
                          activeSignals.includes(signal)
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {activeSignals.includes(signal)
                          ? "ACTIVE"
                          : "NORMAL"}
                      </Badge>
                    </div>
                    <Button
                      variant={
                        activeSignals.includes(signal)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => controlSignal(signal)}
                      className="w-full"
                    >
                      <Zap className="h-3 w-3 mr-2" />
                      {activeSignals.includes(signal)
                        ? "Release Override"
                        : "Override Signal"}
                    </Button>
                  </div>
                ))}
              </div>

              <Alert className="mt-4 border-orange-200 bg-orange-50">
                <Radio className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  Signal overrides auto-release after 10 minutes
                  or when ambulance passes.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                <Map className="h-4 w-4 mr-2" />
                View Traffic Map
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                <Users className="h-4 w-4 mr-2" />
                Contact Center
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                <Activity className="h-4 w-4 mr-2" />
                System Status
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Communication */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Communication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="h-16 flex-col bg-red-600 hover:bg-red-700">
                <Phone className="h-5 w-5 mb-1" />
                <span>Ambulance Control</span>
              </Button>
              <Button className="h-16 flex-col bg-blue-600 hover:bg-blue-700">
                <Shield className="h-5 w-5 mb-1" />
                <span>Hospital Network</span>
              </Button>
              <Button className="h-16 flex-col bg-green-600 hover:bg-green-700">
                <Radio className="h-5 w-5 mb-1" />
                <span>Traffic Control</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}