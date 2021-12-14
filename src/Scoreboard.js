import './Scoreboard.css';

import { timeAgo } from './helpers';


function Scoreboard(props) {
  const sortedScores = props.scores.sort((a, b) => b.wpm - a.wpm);

  return (
    <div className="scoreboardContainer">
      <table>
        <thead>
          <tr>
            <th>
            </th>
            <th>
              Speed
            </th>
            <th>
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedScores.map((score, i) => {
            return (
              <tr key={score.time}>
                <td>{i + 1}</td>
                <td>{score.wpm} wpm</td>
                <td>{timeAgo(new Date(Date.now() - (Date.now() - score.time)))}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Scoreboard;
