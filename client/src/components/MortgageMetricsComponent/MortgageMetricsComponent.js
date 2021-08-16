import React, { useState } from 'react';

import { 
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    LineSeries,
    Crosshair,
    VerticalGridLines,
    MarkSeries
} from 'react-vis';

import './MortgageMetricsComponent.css';


const MortgageMetricsComponent = ({mortgageData, amortization}) => {

    const [crosshairValue, setCrosshairValue] = useState([[],[],[]]);

    const _onMoustLeave = () => {
        setCrosshairValue([[],[],[]]);
    }

    const _onNearestX = (value, {index}) => {
        setCrosshairValue(mortgageData.map(d => d[index]));
    }
    
    return (
        <div className="mortgage-metrics-component">
            <XYPlot
              onMouseLeave={_onMoustLeave}
              width={600}
              height={600}>
                <MarkSeries 
                    data={[{x: 0, y: 0}, {x: 30, y: 30}]}/>
                <VerticalGridLines />
                <HorizontalGridLines />
                <LineSeries
                    onNearestX={_onNearestX}
                    data={mortgageData[0]}/>
                <LineSeries
                    onNearestX={_onNearestX}
                    data={mortgageData[1]}/>
                <LineSeries
                    onNearestX={_onNearestX}
                    data={mortgageData[2]}/>
                <XAxis title="Years" />
                <YAxis 
                    title="Principle" 
                    tickPadding={-2}
                    tickFormat={t => `$${t}`}/>
                <Crosshair 
                    values={crosshairValue}/>
            </XYPlot>
            <link rel="stylesheet" href="https://unpkg.com/react-vis/dist/style.css"></link>
            <script type="text/javascript" src="https://unpkg.com/react-vis/dist/dist.min.js"></script>
        </div>
    );
}

export default MortgageMetricsComponent;
