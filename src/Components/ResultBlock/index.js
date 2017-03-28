import React, { Component } from "react"
import ChartWrapper from "./ChartWrapper"
import "./ResultBlock.css"

export default class ResultBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEmpty: false
        }
    }
    
    renderChart() {
        const isZero = (el) => {
            return el === 0;
        }
        const { answers, type, id } = this.props;
        const chartType = (type === "check") ? "bar" : "pie";
        const labels = Object.keys(answers);
        const data = labels.map((el) => answers[el]);
        if (!data.every(isZero)) {
            const ctx = document.getElementById("myChart" + id);
            ChartWrapper(ctx, chartType, labels, data);
        } else this.setState({
            isEmpty: true
        });
    }
    componentDidMount() {
        if (this.props.type !== "string")
            this.renderChart();

    }
    render() {
        const { questionText, numOfAns, answers, type, id } = this.props;
        const {isEmpty} = this.state;
        let answer;
        let list;
        if (type !== "string") {
            answer = isEmpty ? <div className="info-message">Empty</div> : <canvas id={"myChart" + id} width="500" height="500"></canvas>;
        } else {
            list = answers.map((el, ind) => {
                return <li key={ind}>{el}</li>
            })
            answer = (
                <ul className="list-of-string-answers">
                   {list.length ? list : <div className="info-message">Empty</div> }
                </ul>
            )

        }
        return (
            <div className="ResultBlock">
                <h1>
                    {questionText}
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