import InteractiveGlobeDemo from "./interactive-globe-demo";
import CardPreview from "../shared/card";
import ChartAreaLinear from "./chart-area-linear";
import { useEffect, useState } from "react";
import {
  IAttackByCountry,
  IEmailData,
  IGeneralData,
  IMalwareData,
  IUserFailLoginData,
  IUsersMfaData,
} from "@/models/models";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Bug, MailWarning, ShieldX, UserX } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import ScrollingStatsTicker from "./scrolling-stats-ticker";

type CountryDataRecord = { [key: string]: IAttackByCountry };

const DashboardContent = () => {
  const [emailData, setEmailData] = useState<IEmailData[] | null>(null);
  const [malwareData, setMalwareData] = useState<IMalwareData[] | null>(null);
  const [generalData, setGeneralData] = useState<IGeneralData[] | null>(null);
  const [usersMfaData, setUsersMfaData] = useState<IUsersMfaData[] | null>(
    null
  );
  const [userFailLoginData, setUserFailLoginData] = useState<
    IUserFailLoginData[] | null
  >(null);
  const [attacksByCountry, setAttacksByCountry] =
    useState<CountryDataRecord | null>(null);

  useEffect(() => {
    const fetchEmailData = async () => {
      const response = await fetch("/api/email-threads");
      if (!response.ok) {
        console.error("Failed to fetch email data");
        return;
      }

      const result = await response.json();
      setEmailData(result.emailData);
    };

    const fetchMalwareData = async () => {
      const response = await fetch("/api/malware-threads");
      if (!response.ok) {
        console.error("Failed to fetch email data");
        return;
      }

      const result = await response.json();
      setMalwareData(result.malwareData);
    };

    const fetchGeneralData = async () => {
      const response = await fetch("/api/general-threads");
      if (!response.ok) {
        console.error("Failed to fetch general data");
        return;
      }

      const result = await response.json();
      setGeneralData(result.generalData);
    };

    const fetchUsersMfaData = async () => {
      const response = await fetch("/api/users-mfa-threads");
      if (!response.ok) {
        console.error("Failed to fetch user MFA data");
        return;
      }

      const result = await response.json();
      setUsersMfaData(result.userMfa);
    };

    const fetchUserFailLoginData = async () => {
      const response = await fetch("/api/user-fail-login");
      if (!response.ok) {
        console.error("Failed to fetch user fail login data");
        return;
      }

      const result = await response.json();
      setUserFailLoginData(result.userFailLogin);
    };

    const fetchAttacksByCountry = async () => {
      try {
        const response = await fetch("/api/attacks-by-country");
        if (!response.ok) {
          console.error("Failed to fetch attacks by country data");
          return;
        }
        const result = await response.json();
        setAttacksByCountry(result.countryData);
      } catch (error) {
        console.error("Error fetching attacks by country:", error);
      }
    };

    fetchEmailData();
    fetchMalwareData();
    fetchGeneralData();
    fetchUsersMfaData();
    fetchUserFailLoginData();
    fetchAttacksByCountry();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CardPreview
            title="Email Threats"
            content={
              <div className="space-y-4 p-3">
                {emailData ? (
                  emailData.map((email: IEmailData) => {
                    return (
                      <div
                        key={email.id}
                        className="rounded-lg transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="capitalize text-sm font-medium text-gray-400 dark:text-gray-500">
                            {toLabel(email.category)}
                          </span>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {email.threat_count}
                          </span>
                        </div>
                        <Progress value={email.threat_count} className="h-2" />
                      </div>
                    );
                  })
                ) : (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Skeleton className="h-4 w-20 rounded" />
                          <Skeleton className="h-5 w-8 rounded" />
                        </div>
                        <Skeleton className="h-2 w-full rounded-full" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            }
            cardAction={
              <MailWarning className="drop-shadow-[0_0_4px_#bfbfbf] dark:drop-shadow-[0_0_8px_#ffffff] w-5 h-5 lg:w-6 lg:h-6" />
            }
            class="w-full"
          />

          <CardPreview
            title="Malware Threats"
            content={
              <div className="space-y-4 p-3">
                {malwareData ? (
                  malwareData.map((malware: IMalwareData) => {
                    return (
                      <div
                        key={malware.id}
                        className="rounded-lg transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="capitalize text-sm font-medium text-gray-400 dark:text-gray-500">
                            {toLabel(malware.category)}
                          </span>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {malware.threat_count}
                          </span>
                        </div>
                        <Progress
                          value={malware.threat_count}
                          className="h-2"
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Skeleton className="h-4 w-20 rounded" />
                          <Skeleton className="h-5 w-8 rounded" />
                        </div>
                        <Skeleton className="h-2 w-full rounded-full" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            }
            cardAction={
              <ShieldX className="drop-shadow-[0_0_4px_#bfbfbf] dark:drop-shadow-[0_0_8px_#ffffff] w-5 h-5 lg:w-6 lg:h-6" />
            }
            class="w-full"
          />

          <CardPreview
            title="General Threats"
            content={
              <div className="space-y-4 p-3">
                {generalData ? (
                  generalData.map((general: IGeneralData) => {
                    return (
                      <div
                        key={general.id}
                        className="rounded-lg transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="capitalize text-sm font-medium text-gray-400 dark:text-gray-500">
                            {toLabel(general.category)}
                          </span>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {general.threat_count}
                          </span>
                        </div>
                        <Progress
                          value={general.threat_count}
                          className="h-2"
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Skeleton className="h-4 w-20 rounded" />
                          <Skeleton className="h-5 w-8 rounded" />
                        </div>
                        <Skeleton className="h-2 w-full rounded-full" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            }
            cardAction={
              <Bug className="drop-shadow-[0_0_4px_#bfbfbf] dark:drop-shadow-[0_0_8px_#ffffff] w-5 h-5 lg:w-6 lg:h-6" />
            }
            class="w-full"
          />

          <CardPreview
            title="Users MFA Threats"
            content={
              <div className="space-y-4 p-3">
                {usersMfaData ? (
                  usersMfaData.map((userMfa: IUsersMfaData) => {
                    return (
                      <div
                        key={userMfa.id}
                        className="rounded-lg transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="capitalize text-sm font-medium text-gray-400 dark:text-gray-500">
                            {toLabel(userMfa.category)}
                          </span>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {userMfa.threat_count}
                          </span>
                        </div>
                        <Progress
                          value={userMfa.threat_count}
                          className="h-2"
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Skeleton className="h-4 w-20 rounded" />
                          <Skeleton className="h-5 w-8 rounded" />
                        </div>
                        <Skeleton className="h-2 w-full rounded-full" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            }
            cardAction={
              <UserX className="drop-shadow-[0_0_4px_#bfbfbf] dark:drop-shadow-[0_0_8px_#ffffff] w-5 h-5 lg:w-6 lg:h-6" />
            }
            class="w-full"
          />
        </div>

        <CardPreview
          title="Live Threat Map"
          cardAction={
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="bg-white/10 dark:bg-slate-800/50 
                  text-cyan-600 dark:text-cyan-400 
                  border-cyan-500/30 dark:border-cyan-500/50 
                  text-xs 
                  drop-shadow-[0_0_3px_#06B6D4] 
                  flex items-center"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse" />
                LIVE
              </Badge>
            </div>
          }
          content={
            <>
              <div className="flex flex-col lg:flex-row p-12 md:p-4 lg:gap-8 h-full justify-center lg:justify-start items-center lg:items-start">
                {/* Color Scale */}
                <div className="space-y-2 flex justify-center flex-col h-full text-nowrap">
                  {[
                    { range: "<15K", color: "#34D755", label: "Low" },
                    { range: "15K-25K", color: "#FED011", label: "Medium" },
                    { range: "25K-35K", color: "#FF8934", label: "High" },
                    { range: "35K+", color: "#dc2626", label: "Critical" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-xs shadow-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-400 min-w-[40px]">
                        {item.range}
                      </span>
                      <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="w-full max-w-[400px] aspect-square lg:aspect-auto lg:h-[300px] -mt-4 lg:-mt-18">
                  <InteractiveGlobeDemo
                    countryData={attacksByCountry || {}}
                    markerColor="#ff0000"
                    glowColor="#ff6666"
                    tooltipLabels={["day", "hour"]}
                    loading={!attacksByCountry}
                  />
                </div>
              </div>
            </>
          }
          footer={
            attacksByCountry && (
              <ScrollingStatsTicker
                attackData={Object.values(attacksByCountry)}
                totalHourlyAttacks={Object.values(attacksByCountry).reduce(
                  (sum, country) => sum + country.hour,
                  0
                )}
              />
            )
          }
          class="w-full overflow-hidden"
        />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-8">
        <CardPreview
          title="Failed Login Attempts"
          content={
            <div className="flex flex-col justify-between gap-8 overflow-hidden">
              <p className="text-xs text-gray-500">
                Showing total unsuccessful authentication attempts for the last
                5 months
              </p>

              {userFailLoginData && userFailLoginData.length > 0 ? (
                <Tabs
                  className="flex flex-col"
                  defaultValue={userFailLoginData[0].user}
                >
                  <div className="flex justify-end mb-4">
                    <TabsList className="flex flex-wrap cursor-pointer bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                      {userFailLoginData.map(
                        (userFailData: IUserFailLoginData) => (
                          <TabsTrigger
                            key={userFailData.id}
                            value={userFailData.user}
                            className="text-xs lg:text-sm"
                          >
                            {userFailData.user}
                          </TabsTrigger>
                        )
                      )}
                    </TabsList>
                  </div>

                  {userFailLoginData.map((userFailData: IUserFailLoginData) => {
                    const chartData = [
                      { month: "January", failures: userFailData.jan },
                      { month: "February", failures: userFailData.feb },
                      { month: "March", failures: userFailData.mar },
                      { month: "April", failures: userFailData.apr },
                      { month: "May", failures: userFailData.may },
                    ];

                    const chartConfig = {
                      failures: {
                        label: "Failures",
                        color: "#4f8fd9",
                      },
                    };

                    return (
                      <TabsContent
                        key={userFailData.id}
                        value={userFailData.user}
                        className="p-2 lg:p-4 mt-4"
                      >
                        <div className="w-full overflow-x-auto">
                          <ChartAreaLinear
                            data={chartData}
                            config={chartConfig}
                            title={`Failures`}
                            xAxisKey="month"
                            yAxisKey="failures"
                          />
                        </div>
                      </TabsContent>
                    );
                  })}
                </Tabs>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              )}
            </div>
          }
          class="w-full"
        />

        <div className="grid grid-cols-1 gap-4"></div>
      </div>
    </>
  );
};

export default DashboardContent;
