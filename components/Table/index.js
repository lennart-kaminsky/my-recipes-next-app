import styled from "styled-components";

function checkDecimal(number) {
  if (number % 1 != 0) return number.toFixed(1);
  return number.toFixed(0);
}

export function TableIngredients({ recipe, portions }) {
  return (
    <StyledTable>
      <tbody>
        {recipe.ingredients.map((item) => (
          <StyledTableRow
            key={item.id}
            $paddingTop={recipe.ingredients.indexOf(item) === 0}
            $border={
              recipe.ingredients.indexOf(item) < recipe.ingredients.length - 1
            }
          >
            <td>{item.ingredient.name}</td>
            <RightTD>
              {checkDecimal(
                Number.parseFloat((portions * item.amount) / recipe.portions)
              ) + item.ingredient.unit}
            </RightTD>
          </StyledTableRow>
        ))}
      </tbody>
    </StyledTable>
  );
}

const StyledTable = styled.table`
  width: 100%;
  max-width: 700px;
`;

const StyledTableRow = styled.tr`
  display: flex;
  justify-content: space-between;
  padding-block-start: ${({ $paddingTop }) => ($paddingTop ? "0px" : "10px")};
  padding-block-end: ${({ $border }) => ($border ? "10px" : "0px")};
  border-bottom: ${({ $border }) =>
    $border ? "1px solid var(--primary-color)" : "none"};
`;

const RightTD = styled.td`
  text-align: right;
`;
