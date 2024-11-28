"use client";

import { TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";

interface ChartData {
  option: string;
  count: number;
  fill: string;
}

const chartConfig = {
  Sim: {
    label: "Sim",
    color: "hsl(var(--chart-1))",
  },
  Não: {
    label: "Não",
    color: "hsl(var(--chart-2))",
  },
};

export default function LiveChart() {
  const [chartData, setChartData] = useState<ChartData[]>(
    []
  );

  const fetchData = async () => {
    try {
      const res = await fetch("/api/votes");
      const data: ChartData[] = await res.json();
      setChartData(data);
    } catch (error) {
      console.error(
        "Erro ao carregar dados do gráfico:",
        error
      );
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalVotes = useMemo(() => {
    return chartData.reduce(
      (acc, curr) => acc + curr.count,
      0
    );
  }, [chartData]);

  return (
    <Card className="flex flex-col h-screen ">
      <CardHeader className="items-center pb-0 gap-4">
        <CardTitle>
          Resultados da Votação (Ao Vivo)
        </CardTitle>
        <CardDescription className="flex flex-row items-center space-x-2">
          <div className="flex flex-row items-center gap-2">
            <div className="h-6 w-6 bg-slate-950 rounded-full" />
            Sim
          </div>
          <div>x</div>
          <div className="flex flex-row items-center gap-2">
            Não{" "}
            <div className="h-6 w-6 bg-slate-950 rounded-full" />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="option"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (
                    viewBox &&
                    "cx" in viewBox &&
                    "cy" in viewBox
                  ) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVotes.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Atualizando automaticamente a cada 5 segundos{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Resultados em tempo real.
        </div>
      </CardFooter>
    </Card>
  );
}
