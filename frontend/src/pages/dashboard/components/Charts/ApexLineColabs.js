import React from "react";
import ApexCharts from "react-apexcharts";
import { useTheme } from "@material-ui/styles";

// const series = [
//   {
//     name: "series1",
//     data: [31, 40, 28, 51, 42, 109, 100],
//   },
//   {
//     name: "series2",
//     data: [11, 32, 45, 32, 34, 52, 41],
//   },
// ];

const teste = [
    {
    name: "Pintores",
    data: [{
      x: "M1", y:"5", macro:"P01"
    },{
      x: "M2", y:"10", macro:'P02'
    },{
      x: "M3",y:"20", macro:'P02'
    },{
      x: "M4",y:"15", macro:'P04'
    }]
    }, 
    {
        name: "Serventes",
        data: [{
          x: "M1", y:"1", macro:"P01"
        },{
          x: "M2", y:"3", macro:'P02'
        },{
          x: "M3",y:"2", macro:'P02'
        },{
          x: "M4",y:"1", macro:'P04'
        }]
        }, 
];

export default function ApexLineChart() {
  var theme = useTheme();

  return (
    <ApexCharts
      options={themeOptions(theme)}
      series={teste}
      type="area"
      height={150}
    />
  );
}

// ############################################################
function themeOptions(theme) {
  return {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
    //   type: "datetime",
    //   categories: [
    //     "2018-09-19T00:00:00",
    //     "2018-09-19T01:30:00",
    //     "2018-09-19T02:30:00",
    //     "2018-09-19T03:30:00",
    //     "2018-09-19T04:30:00",
    //     "2018-09-19T05:30:00",
    //     "2018-09-19T06:30:00",
    //   ],
    },
    tooltip: {
    //   x: {
    //     format: "dd/MM/yy HH:mm",
    //   },
    },
    fill: {
      colors: [theme.palette.primary.light, theme.palette.success.light],
    },
    colors: [theme.palette.primary.main, theme.palette.success.main],
    chart: {
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
  };
}
