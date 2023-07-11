import { styled } from "styled-components";

export const TodoList = () => {
  const CustomTable = styled.table`
    &&& {
      table,
      th,
      td {
        border: 1px solid black;
        border-collapse: collapse;
      }
      th,
      td,
      tr {
        padding: 5px;
      }
      th {
        text-align: left;
      }
      table {
        width: 50%;
      }
    }
  `;
  return (
    <>
      <table>
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th>Country</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>
      </table>
    </>
  );
};
