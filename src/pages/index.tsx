import React, { useRef, useEffect } from "react";
import type { HeadFC, PageProps } from "gatsby";
import Notifcations from "../components/notifications";
import * as styles from '../styles/dashboard.module.scss';
import { PiCurrencyCircleDollarThin } from "react-icons/pi";
import ChartContext, { Chart, ChartConfiguration, ChartArea, LinearScale, CategoryScale } from 'chart.js/auto';
import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';
import { IoPeopleOutline } from "react-icons/io5";
import { IoMdPaperPlane } from "react-icons/io";
// import { Chart, ChartConfiguration, ChartArea, ChartContext } from 'chart.js';



function getGradientBlue(ctx: CanvasRenderingContext2D, chartArea: ChartArea) {
  let width, height, gradient;
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

    gradient.addColorStop(1, '#32D0D1');
    gradient.addColorStop(0, '#000000');
  }

  return gradient;
}
function getGradientYellow(ctx: CanvasRenderingContext2D, chartArea: ChartArea) {
  let width, height, gradient;
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

    gradient.addColorStop(1, '#FED000');
    gradient.addColorStop(0, '#32D0D1');
  }

  return gradient;
}

const IndexPage: React.FC<PageProps> = () => {
  const bar = React.useRef<HTMLCanvasElement>(null);

  const funnel = React.useRef<HTMLCanvasElement>(null);


  const data = {
    labels: ["Week 1", "Week 2", "week 3", "week 4"],
    datasets: [
      {
        label: 'Customers',
        data: [10, 20, 45, 77],
        backgroundColor: function (context: ChartContext<'bar', number[], string>) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }
          return getGradientYellow(ctx, chartArea);
        },
        barThickness: 45,
        borderRadius: 5
      },
      {
        label: 'Appointments',
        data: [53, 37, 100, 40],
        barThickness: 45,
        borderRadius: 5,
        backgroundColor: function (context: ChartContext<'bar', number[], string>) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }
          return getGradientBlue(ctx, chartArea);
        },
      },
    ]
  };
  const config: ChartConfiguration<'bar', number[], string> = {
    type: 'bar',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'CUSTOMERS V/S APPOINTMENTS'
        },
      },
      responsive: true,
      scales: {
        x: {
          // stacked: true,
        },
        y: {
          // stacked: true
        }
      }
    }
  };
  Chart.register(FunnelController, TrapezoidElement, LinearScale, CategoryScale);
  useEffect(() => {
    if (bar.current && funnel.current) {
      new Chart(bar.current?.getContext("2d"), config);
      new Chart(funnel.current?.getContext("2d"), {
        type: 'funnel',
        data: {
          labels: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
          datasets: [
            {
              data: [200, 41, 10, 10, 22],
              datalabels: {
                formatter: (v) => v.toLocaleString(),
              },
            },
          ],
        },
        options: {
          indexAxis: 'y',
        },
      });
    }
  }, [])

  return <main className="flex items-center justify-center grow">
    <div className="flex h-full w-full justify-between">
      <div className="max-w-full grow px-4">
        <div className={`${styles.topbar} gap-x-8 mb-14`}>
          <div className={`${styles.topbarLeft} flex-1 py-8 px-6 shadow-lg rounded-md flex flex-col justify-between`}>
            <div className="flex mb-4 justify-between">
              <div className="border-0 border-l-4 pl-2 text-white border-white text-sm font-light">
                Total Sales <br />
                <span className="font-semibold">$ 1200</span>
              </div>
              <div className="icon"><PiCurrencyCircleDollarThin className="text-5xl text-white" /></div>
            </div>
            <div className="flex">
              <div className="cell flex flex-col bg-white text-xs flex-1">
                <span className="bg-[#99999926] py-1 px-1 text-center">EFT</span>
                <span className="text-center py-1">$ 1200</span>
              </div>
              <div className="cell flex flex-col bg-white text-xs flex-1">
                <span className="bg-[#99999926] py-1 px-1 text-center">Stripe</span>
                <span className="text-center py-1">$ 522</span>
              </div>
              <div className="cell flex flex-col bg-white text-xs flex-1">
                <span className="bg-[#99999926] py-1 px-1 text-center">Brighte</span>
                <span className="text-center py-1">$ 1422</span>
              </div>
            </div>
          </div>
          <div className={`${styles.topbarCenter} flex-1 py-8 px-6 shadow-lg rounded-md flex flex-col justify-between`}>
            <div className="flex mb-4 justify-between">
              <div className="border-0 border-l-4 pl-2 text-white border-white text-sm font-light">
                Total Customers <br />
                <span className="font-semibold">420</span>
              </div>
              <div className="icon"><IoPeopleOutline className="text-5xl text-white" /></div>
            </div>
            <div className="flex">
              <div className="cell flex flex-col bg-white text-xs flex-1">
                <span className="bg-[#99999926] px-1 py-1 text-center">Fresh</span>
                <span className="text-center py-1">75</span>
              </div>
              <div className="cell flex flex-col bg-white text-xs flex-1">
                <span className="bg-[#99999926] px-1 py-1 text-center">Contacted</span>
                <span className="text-center py-1">55</span>
              </div>
              <div className="cell flex flex-col bg-white text-xs flex-1">
                <span className="bg-[#99999926] px-1 py-1 text-center">Converted</span>
                <span className="text-center py-1">85</span>
              </div>
            </div>
          </div>
          <div className={`${styles.topbarRight} flex-1 py-8 px-6 shadow-lg rounded-md flex flex-col justify-between`}>
            <div className="flex mb-4 justify-between">
              <div className="border-0 border-l-4 pl-2 text-white border-white text-sm font-light">
                Total Published <br />
                <span className="font-semibold">1749</span>
              </div>
              <div className="icon"><IoMdPaperPlane className="text-5xl text-white" /></div>
            </div>
            <div className="flex">
              <div className="cell flex flex-col bg-white text-xs flex-1">
                <span className="bg-[#99999926] px-1 py-1 text-center">HWS</span>
                <span className="text-center py-1">80</span>
              </div>
              <div className="cell flex flex-col bg-white text-xs flex-1">
                <span className="bg-[#99999926] px-1 py-1 text-center">CLU</span>
                <span className="text-center py-1">40</span>
              </div>
              <div className="cell flex flex-col bg-white text-xs flex-1">
                <span className="bg-[#99999926] px-1 py-1 text-center">AC</span>
                <span className="text-center py-1">85</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
        <div className="filter flex justify-between">
            <div className="font-bold">Statistics</div>
            <div>Date</div>
          </div>
          <canvas id="canvas" ref={bar}></canvas>
        </div>
        <div className="border p-4">
          <div className="filter flex mb-8 justify-between">
            <div className="font-bold">Sales Funnel</div>
            <div>Date</div>
          </div>
          <div className="flex justify-center">
            <canvas id="canvas" ref={funnel}></canvas>
          </div>
        </div>
      </div>
      <div className="border p-4 hidden lg:flex flex-col">
        <h3 className="font-semibold mb-4">Active Employees</h3>
        <div className="flex justify-between text-center mb-4">
          <div className="max-w-[50px] text-sm">
            <img src="./user.png" alt="" />
            You
          </div>
          <div className="max-w-[50px] text-sm">
            <img src="./user.png" alt="" />
            You
          </div>
          <div className="max-w-[50px] text-sm">
            <img src="./user.png" alt="" />
            You
          </div>
          <div className="max-w-[50px] text-sm">
            <img src="./user.png" alt="" />
            You
          </div>
        </div>
        <hr className="mb-4" />
        <div className="flex mb-4 justify-between">
          <h3 className="font-bold">Active Bids</h3>
          <a href="#" className="text-blue-500 text-sm">View More</a>
        </div>
        <Card />
        <div className="flex mb-4 justify-between">
          <h3 className="font-bold">Reminders</h3>
          <a href="#" className="text-blue-500 text-sm">View More</a>
        </div>
        <Card />
        <Card />
      </div>
    </div>
    <Notifcations />
  </main>;
};


function Card({ isBookedMarked = false, bidType = "up" }) {
  return (
    <div className="flex flex-col bg-white p-4 rounded-[5px] border mb-4">
      <div className="flex justify-between gap-x-4 mb-2">
        <div className="text-1xl">HWS ASSESSMENT</div>
      </div>
      <div className="mb-2 text-xs font-semibold">
        SUBURB: Melbourne
      </div>
      <div className="text-xs  mb-2"><b>S: </b>26-12-23 | 4.30 AM <br /> <b>E: </b>29-12-23 | 15.30 PM</div>
      <div className="flex justify-between">
        <span className={`w-20 mr-1 rounded justify-center text-white text-xs py-1 flex items-center ${bidType == 'up' ? 'bg-[#B4D3A2]' : 'bg-[#C44D56]'}`}>{bidType.toUpperCase()}</span>
        <span className="w-20 mr-1 rounded justify-center text-white text-xs py-1 flex items-center bg-blue-500">$ 1200</span>
        <span className="w-20 rounded justify-center text-white text-xs py-1 flex items-center bg-[#32D0D1]">03</span>
      </div>
    </div>
  )
}

function CheckBoxes() { }

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
