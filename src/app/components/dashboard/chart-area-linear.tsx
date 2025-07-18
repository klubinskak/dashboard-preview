"use client"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface ChartProps {
  data: Array<Record<string, any>>;
  config?: ChartConfig;
  title?: string;
  xAxisKey?: string;
  yAxisKey?: string;
}

const defaultData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const defaultConfig = {
  desktop: {
    label: "Failures",
    color: "#4f8fd9",
  },
} satisfies ChartConfig

export default function Component({ 
  data = defaultData, 
  config = defaultConfig, 
  title = "Chart",
  xAxisKey = "month",
  yAxisKey = "desktop"
}: ChartProps) {
  return (
    <ChartContainer config={config}>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fill: "#9ca3af", fontSize: 12 }}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" hideLabel />}
        />
        <Area
          dataKey={yAxisKey}
          type="linear"
          fill="url(#blueGradient)"
          fillOpacity={1}
          stroke="#4f8fd9"
          strokeWidth={2}
        />
        <defs>
          <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6b9ce8" stopOpacity={0.8} />
            <stop offset="50%" stopColor="#4f8fd9" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#3366cc" stopOpacity={0.1} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ChartContainer>
  )
}