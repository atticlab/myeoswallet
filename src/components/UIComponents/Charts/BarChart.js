import {Bar} from 'vue-chartjs'
import {hexToRGB} from "./utils";

let defaultOptions = {

  tooltips: {
    tooltipFillColor: "rgba(0,0,0,0.5)",
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    tooltipFontSize: 14,
    tooltipFontStyle: "normal",
    tooltipFontColor: "#fff",
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    tooltipTitleFontSize: 14,
    tooltipTitleFontStyle: "bold",
    tooltipTitleFontColor: "#fff",
    tooltipYPadding: 6,
    tooltipXPadding: 6,
    tooltipCaretSize: 8,
    tooltipCornerRadius: 6,
    tooltipXOffset: 10,
  },


  legend: {

    display: false
  },
  scales: {

    yAxes: [{
      ticks: {
        fontColor: "#9f9f9f",
        fontStyle: "bold",
        beginAtZero: true,
        maxTicksLimit: 5,
        padding: 20
      },
      gridLines: {
        zeroLineColor: "transparent",
        display: true,
        drawBorder: false,
        color: '#9f9f9f',
      }

    }],
    xAxes: [{
      barPercentage: 0.4,
      gridLines: {
        zeroLineColor: "white",
        display: false,

        drawBorder: false,
        color: 'transparent',
      },
      ticks: {
        padding: 20,
        fontColor: "#9f9f9f",
        fontStyle: "bold"
      }
    }]
  }
};
export default {
  name: 'bar-chart',
  extends: Bar,
  props: {
    labels: {
      type: [Object, Array],
      description: 'Chart labels. This is overridden when `data` is provided'
    },
    datasets: {
      type: [Object, Array],
      description: 'Chart datasets. This is overridden when `data` is provided'
    },
    data: {
      type: [Object, Array],
      description: 'Chart.js chart data (overrides all default data)'
    },
    color: {
      type: String,
      description: 'Chart color. This is overridden when `data` is provided'
    },
    extraOptions: {
      type: Object,
      description: 'Chart.js options'
    },
    title: {
      type: String,
      description: 'Chart title'
    },
  },
  mounted() {
    let fallBackColor = '#f96332';
    let color = this.color || fallBackColor;
    const ctx = document.getElementById(this.chartId).getContext('2d');
    const gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, hexToRGB(color, 0.6));

    let chartOptions = Object.assign(defaultOptions, this.extraOptions || {})
    this.renderChart({
      labels: this.labels || [],
      datasets: this.datasets ? this.datasets : [{
        label: this.title || '',
        backgroundColor: gradientFill,
        borderColor: color,
        pointBorderColor: "#FFF",
        pointBackgroundColor: color,
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 1,
        data: this.data || []
      }]
    }, chartOptions);
  }
}
