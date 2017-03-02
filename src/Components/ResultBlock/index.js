import React, { Component } from "react"
import ChartWrapper from "./ChartWrapper"

export default class ResultBlock extends Component {
    componentDidMount() {
        //TODO initialize chart
        const { question, numOfAns, usersAns, possblAns, type, id } = this.props;
        let answers;
        if (type === "string") {
            return;
        } else {
            const chartType = (type === "check") ? "bar" : "pie";
            const data = possblAns.map((el) => {
                return usersAns[el] || 0;
            });
            const ctx = document.getElementById("myChart" + id);
            ChartWrapper(ctx, chartType, possblAns, data);
        }
    }
    render() {
        const { question, numOfAns, usersAns, possblAns, type, id } = this.props;
        let answer;
        let list;
        if (type !== "string") {
            answer = <canvas id={"myChart" + id} width="500" height="500"></canvas>;
        } else {
            list = usersAns.map((el, ind) => {
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
                    {question}{" "}
                    <span>Number of answers: {numOfAns}</span>
                </h1>
                {answer}
            </div>
        )
    }
}
ResultBlock.propTypes = {
    question: React.PropTypes.string.isRequired,
    numOfAns: React.PropTypes.number,
    usersAns: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.number))
    ]).isRequired,
    possblAns: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    type: React.PropTypes.oneOf(["radio", "string", "check"]).isRequired
} 