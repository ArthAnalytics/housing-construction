import { useState, useMemo, useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import housingData from "../data.json";
import Header from "./Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Single color for all charts - matching favicon orange
const CHART_COLOR = "#F97316"; // Orange-500 (matches favicon)

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface CountyData {
  [key: string]: number | string;
  Name: string;
  Total: number;
  "2011": number;
  "2012": number;
  "2013": number;
  "2014": number;
  "2015": number;
  "2016": number;
  "2017": number;
  "2018": number;
  "2019": number;
  "2020": number;
  "2021": number;
  "2022": number;
  "2023": number;
  "2024": number;
  "2025": number;
}

export default function Dashboard() {
  const [selectedCounty, setSelectedCounty] = useState<string>("Arizona");
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const selectedRowRef = useRef<HTMLTableRowElement>(null);

  // Extract years dynamically
  const years = useMemo(() => {
    const yearKeys = Object.keys(housingData[0]).filter(
      (key) => key !== "Name" && key !== "Total"
    );
    return yearKeys.sort();
  }, []);

  // Separate Arizona and counties, and reorder for table display
  const { arizonaData, countiesData, tableData } = useMemo(() => {
    const arizona = housingData.find((item) => item.Name === "Arizona");
    const counties = housingData.filter((item) => item.Name !== "Arizona");
    // Put Arizona first, then all counties
    const orderedData = arizona
      ? [arizona as CountyData, ...counties]
      : [...counties];
    return {
      arizonaData: arizona as CountyData,
      countiesData: counties as CountyData[],
      tableData: orderedData,
    };
  }, []);

  // Process data for Chart.js - always show only one line
  const chartData = useMemo(() => {
    const labels = years;
    const datasets: any[] = [];

    let data: number[];
    let label: string;

    if (selectedCounty === "Arizona") {
      data = years.map((year) => arizonaData[year] as number);
      label = "Arizona";
    } else {
      const county = countiesData.find((c) => c.Name === selectedCounty);
      if (county) {
        data = years.map((year) => county[year] as number);
        label = selectedCounty;
      } else {
        // Fallback to Arizona if county not found
        data = years.map((year) => arizonaData[year] as number);
        label = "Arizona";
      }
    }

    datasets.push({
      label,
      data,
      borderColor: CHART_COLOR,
      backgroundColor: hexToRgba(CHART_COLOR, 0.1),
      borderWidth: 3,
      tension: 0.1,
    });

    return { labels, datasets };
  }, [selectedCounty, years, countiesData, arizonaData]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
      datalabels: {
        display: true,
        anchor: "end" as const,
        align: "top" as const,
        formatter: (value: number) => value.toLocaleString(),
        font: {
          size: 10,
          weight: "bold" as const,
        },
        color: "#C2410C",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderColor: "#C2410C",
        borderWidth: 1,
        borderRadius: 4,
        padding: {
          top: 2,
          bottom: 2,
          left: 4,
          right: 4,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Housing Units",
        },
        beginAtZero: true,
      },
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 10,
        left: 10,
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  };

  const handleRowClick = (countyName: string) => {
    setSelectedCounty(countyName);
  };

  // Get all county names for dropdown
  const countyOptions = useMemo(() => {
    const options = ["Arizona", ...countiesData.map((c) => c.Name)];
    return options;
  }, [countiesData]);

  // Scroll table to the right on mount to show Total column
  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollLeft =
        tableContainerRef.current.scrollWidth;
    }
  }, []);

  // Scroll selected row into view when county changes
  useEffect(() => {
    if (selectedRowRef.current) {
      selectedRowRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedCounty]);

  return (
    <div className="h-screen bg-white flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-4 overflow-hidden">
        <div className="flex flex-col gap-6 h-full">
          {/* Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col flex-[0_0_50%] min-h-0">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Housing Construction in {selectedCounty} FY2011 - FY2025
            </h2>
            <div className="flex-1 min-h-0 pb-8 pr-4">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col flex-1 min-h-0">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h2 className="text-sm font-semibold text-gray-900">
                  Net Housing Construction (2011-2025) for Fiscal Year (July 1 -
                  June 30)
                </h2>
                <select
                  value={selectedCounty}
                  onChange={(e) => setSelectedCounty(e.target.value)}
                  className="rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm py-1.5 px-4 bg-white text-gray-700 hover:border-gray-400 transition-colors cursor-pointer w-64 flex-shrink-0"
                >
                  {countyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div
              className="flex-1 overflow-x-auto overflow-y-auto"
              ref={tableContainerRef}
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-30">
                  <tr>
                    <th className="sticky left-0 z-40 bg-gray-50 px-6 py-2.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      County
                    </th>
                    {years.map((year) => (
                      <th
                        key={year}
                        className="px-4 py-2.5 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50"
                      >
                        {year}
                      </th>
                    ))}
                    <th className="sticky right-0 z-40 bg-gray-50 px-6 py-2.5 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tableData.map((county) => {
                    const isSelected = county.Name === selectedCounty;
                    return (
                      <tr
                        key={county.Name}
                        ref={isSelected ? selectedRowRef : null}
                        onClick={() => handleRowClick(county.Name)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? "bg-orange-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <td
                          className={`sticky left-0 z-20 px-6 py-2 whitespace-nowrap text-xs font-medium text-gray-900 ${
                            isSelected ? "bg-orange-50" : "bg-white"
                          }`}
                        >
                          {county.Name}
                        </td>
                        {years.map((year) => {
                          const value = (county as CountyData)[year] as number;
                          return (
                            <td
                              key={year}
                              className="px-4 py-2 whitespace-nowrap text-xs text-right text-gray-600 tabular-nums"
                            >
                              {value.toLocaleString()}
                            </td>
                          );
                        })}
                        <td
                          className={`sticky right-0 z-20 px-6 py-2 whitespace-nowrap text-xs font-semibold text-right text-gray-900 tabular-nums ${
                            isSelected ? "bg-orange-50" : "bg-white"
                          }`}
                        >
                          {county.Total.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-600 mb-1 italic">
                <span className="font-semibold not-italic">Source:</span>{" "}
                Arizona Office of Economic Opportunity (State Demographers
                Office) 2025
              </p>
              <p className="text-xs text-gray-600 italic">
                <span className="font-semibold not-italic">Note:</span> Numbers
                rounded to the nearest ten
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
