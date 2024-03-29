import { Fragment } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { checkDecimal } from "@/utils";

export function TableIngredients({ recipe, portions }) {
  const { data: products, isLoading, error } = useSWR("/api/products");
  if (isLoading) return <h1>loading...</h1>;
  if (error) return <h1>failed loading data...</h1>;
  return (
    <StyledTable>
      <tbody>
        {recipe.products.map((product) => (
          <StyledTableRow
            key={product._id}
            $paddingTop={recipe.products.indexOf(product) === 0}
            $border={
              recipe.products.indexOf(product) < recipe.products.length - 1
            }
          >
            {products.map(
              (_product) =>
                _product._id === product.product && (
                  <Fragment key={_product._id}>
                    <td>{_product.name}</td>
                    <RightTD>
                      {checkDecimal(
                        Number.parseFloat(
                          (portions * product.amount) / recipe.portions
                        )
                      ) + _product.unit}
                    </RightTD>
                  </Fragment>
                )
            )}
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
