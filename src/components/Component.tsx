"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { fetchProjects } from "@/api/APIServices"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type ChartDataItem = {
  date: string
  todo: number
  doing: number
  done: number
}

const chartConfig = {
  views: { label: "Project Progress" },
  todo: { label: "To Do", color: "hsl(var(--chart-1))" },
  doing: { label: "Doing", color: "hsl(var(--chart-2))" },
  done: { label: "Done", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig

export function Component() {
  const [chartData, setChartData] = React.useState<ChartDataItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("todo")

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const projects = await fetchProjects()

        const grouped: Record<string, ChartDataItem> = {}

        projects.forEach((project: any) => {
          const date = project.dateLimite || "Inconnue"

          if (!grouped[date]) {
            grouped[date] = { date, todo: 0, doing: 0, done: 0 }
          }

          if (Array.isArray(project.taches)) {
            project.taches.forEach((task: any) => {
              const status = task.statut || task.status // adaptation possible selon backend
              switch (status?.toLowerCase()) {
                case "todo":
                  grouped[date].todo += 1
                  break
                case "doing":
                  grouped[date].doing += 1
                  break
                case "done":
                  grouped[date].done += 1
                  break
              }
            })
          }
        })

        const sortedData = Object.values(grouped).sort((a, b) =>
          a.date.localeCompare(b.date)
        )

        setChartData(sortedData)
      } catch (err) {
        console.error("Erreur lors du chargement des données :", err)
        setError("Erreur lors du chargement des données.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const total = React.useMemo(
    () => ({
      todo: chartData.reduce((acc, curr) => acc + curr.todo, 0),
      doing: chartData.reduce((acc, curr) => acc + curr.doing, 0),
      done: chartData.reduce((acc, curr) => acc + curr.done, 0),
    }),
    [chartData]
  )

  if (loading) return <div>Chargement...</div>
  if (error) return <div>{error}</div>

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Project progress overview (To Do / Doing / Done)
          </CardDescription>
        </div>
        <div className="flex">
          {["todo", "doing", "done"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill={chartConfig[activeChart].color}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
