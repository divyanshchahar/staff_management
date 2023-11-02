import electricianData from "../../files/electricianData.json";

function SumamryTable({ summarizedData }) {
  return (
    <>
      <h1>Summary</h1>

      <table>
        <tr>
          <th>Date</th>
          <th>Grievence Sites</th>
          <th>Normal Sites</th>
          <th>Total</th>
          <th>Solution</th>
        </tr>

        {summarizedData.map((item) => {
          return (
            <tr key={item.date}>
              <td>{item.date}</td>
              <td>{item.grievences.length}</td>
              <td>{item.normal.length}</td>
              <td>{item.grievences.length + item.normal.length}</td>
              <td>{item.solutionFeasible ? "yes" : "no"}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
}

export default SumamryTable;
