import React, { Component } from "react"
import ChartWrapper from "./ChartWrapper"

export default class ResultBlock extends Component {
    renderChart() {
        const { answers, type, id } = this.props;
        const chartType = (type === "check") ? "bar" : "pie";
        const labels = Object.keys(answers);
        const data = labels.map((el) => answers[el]);
        const ctx = document.getElementById("myChart" + id);
        ChartWrapper(ctx, chartType, labels, data);
    }
    componentDidMount() {        
        if(this.props.type !== "string")
            this.renderChart();
        
    }
    render() {
        const { questionText, numOfAns, answers, type, id } = this.props;
        let answer;
        let list;
        if (type !== "string") {
            answer = <canvas id={"myChart" + id} width="500" height="500"></canvas>;
        } else {
            list = answers.map((el, ind) => {
                return <li key={ind}>{el}</li>
            })
            answer = (
                <ul>
                    {list}
                </ul>
            )

        }
        return (
            <div className="ResultBlock">
                <h1>
                    {questionText}{" "}
                    <span>Number of answers: {numOfAns}</span>
                </h1>
                {answer}
            </div>
        )
    }
}
ResultBlock.propTypes = {
    questionText: React.PropTypes.string.isRequired,
    numOfAns: React.PropTypes.number,
    answers: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.objectOf(React.PropTypes.number)
    ]).isRequired,
    type: React.PropTypes.oneOf(["radio", "string", "check"]).isRequired
} 