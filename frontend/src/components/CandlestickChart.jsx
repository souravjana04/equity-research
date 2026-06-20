import { useEffect, useRef } from 'react';
import { createChart, CandlestickSeries, HistogramSeries, LineSeries } from 'lightweight-charts';
import PropTypes from 'prop-types';

const CandlestickChart = ({ data }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current || !data || data.length === 0) return;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 450,
      layout: {
        background: { type: 'solid', color: 'transparent' },
        textColor: '#A1A1AA', // muted
        fontFamily: 'Inter, sans-serif',
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: '#E4E4E7' }, // default
      },
      rightPriceScale: {
        borderColor: '#E4E4E7',
      },
      timeScale: {
        borderColor: '#E4E4E7',
        timeVisible: true,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#0EA882', // accent
      downColor: '#EF4444', // loss
      borderVisible: false,
      wickUpColor: '#0EA882',
      wickDownColor: '#EF4444',
    });
    
    // Candlestick data
    const candleData = data.map(d => ({
      time: d.time,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));
    candlestickSeries.setData(candleData);

    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: '#D4D4D8', // strong
      priceFormat: { type: 'volume' },
      priceScaleId: '', // set as an overlay
    });
    
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8, // highest point of the series will be at 80% from the top
        bottom: 0,
      },
    });
    
    // Volume data
    const volData = data.map(d => ({
      time: d.time,
      value: d.value,
      color: d.close >= d.open ? '#0EA88280' : '#EF444480', // 50% opacity
    }));
    volumeSeries.setData(volData);

    // 50 DMA
    const dma50Series = chart.addSeries(LineSeries, {
      color: '#2563EB', // info
      lineWidth: 1.5,
      crosshairMarkerVisible: false,
    });
    const dma50Data = data.filter(d => d.dma50 !== null).map(d => ({ time: d.time, value: d.dma50 }));
    dma50Series.setData(dma50Data);

    // 200 DMA
    const dma200Series = chart.addSeries(LineSeries, {
      color: '#F59E0B', // warning
      lineWidth: 1.5,
      crosshairMarkerVisible: false,
    });
    const dma200Data = data.filter(d => d.dma200 !== null).map(d => ({ time: d.time, value: d.dma200 }));
    dma200Series.setData(dma200Data);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data]);

  return (
    <div 
      ref={chartContainerRef} 
      className="w-full h-[450px] bg-surface border border-default rounded-lg overflow-hidden" 
    />
  );
};

CandlestickChart.propTypes = {
  data: PropTypes.array,
};

export default CandlestickChart;
