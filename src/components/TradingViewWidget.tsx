import React, { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ symbol }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      if (container.current) {
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: `${symbol.toUpperCase()}USD`,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_chart_container"
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      const widgetContainer = document.getElementById('tradingview_chart_container');
      if (widgetContainer) {
        widgetContainer.innerHTML = '';
      }
      const scripts = document.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('tradingview')) {
          scripts[i].remove();
        }
      }
    };
  }, [symbol]);

  return (
    <div ref={container} id="tradingview_chart_container" style={{ height: "100%", width: "100%" }} />
  );
};

export default TradingViewWidget;
