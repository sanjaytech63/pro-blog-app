'use client'

import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts'

/* ------------------ TYPES ------------------ */
export interface ViewsDataPoint {
  date: string
  count: number
}

interface Props {
  data: ViewsDataPoint[]
  loading?: boolean
}

/* ------------------ FORMATTERS ------------------ */
const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  })

const formatNumber = (num: number) =>
  num >= 1000 ? `${(num / 1000).toFixed(1)}K` : num

/* ------------------ TOOLTIP TYPE ------------------ */
interface TooltipProps {
  active?: boolean
  payload?: Array<{
    payload: ViewsDataPoint
  }>
}

/* ------------------ CUSTOM TOOLTIP ------------------ */
const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload?.length) return null

  const d = payload[0].payload

  return (
    <div className="bg-background rounded-xl border px-4 py-3 shadow-lg">
      <p className="text-muted-foreground text-xs">{formatDate(d.date)}</p>

      <p className="text-lg font-semibold">{formatNumber(d.count)}</p>
      <p className="text-muted-foreground text-xs">views</p>
    </div>
  )
}

/* ------------------ HELPERS ------------------ */
const calculateTotal = (data: ViewsDataPoint[]) =>
  data.reduce((acc, curr) => acc + curr.count, 0)

const calculateGrowth = (data: ViewsDataPoint[]) => {
  if (data.length < 2) return 0
  const first = data[0].count
  const last = data[data.length - 1].count

  if (first === 0) return 0
  return ((last - first) / first) * 100
}

/* ------------------ COMPONENT ------------------ */
export const ViewsChart = ({ data, loading }: Props) => {
  /* ------------------ LOADING ------------------ */
  if (loading) {
    return <div className="bg-muted h-75 w-full animate-pulse rounded-2xl" />
  }

  /* ------------------ EMPTY ------------------ */
  if (!data?.length) {
    return (
      <div className="text-muted-foreground flex h-75 items-center justify-center rounded-2xl border text-sm">
        No analytics data available
      </div>
    )
  }

  /* ------------------ DERIVED DATA ------------------ */
  const total = calculateTotal(data)
  const growth = calculateGrowth(data)
  const isPositive = growth >= 0

  return (
    <div className="rounded-2xl p-4">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Views Analytics</h3>
          <p className="text-muted-foreground text-xs">
            Last {data.length} days
          </p>
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold">{formatNumber(total)}</p>
          <p
            className={`text-xs ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isPositive ? '+' : ''}
            {growth.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* CHART */}
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          {/* GRID */}
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

          {/* GRADIENT */}
          <defs>
            <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopOpacity={0.4} />
              <stop offset="95%" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* AXIS */}
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />

          {/* TOOLTIP */}
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ strokeDasharray: '3 3' }}
          />

          {/* AREA */}
          <Area
            type="monotone"
            dataKey="count"
            strokeWidth={2}
            fill="url(#viewsGradient)"
            dot={false}
            activeDot={{
              r: 6,
              strokeWidth: 2,
            }}
            isAnimationActive
          />

          {/* LINE */}
          <Line type="monotone" dataKey="count" strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
