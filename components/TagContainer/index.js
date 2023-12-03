import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ButtonNoStyle } from "../Button";
import useSWR from "swr";

export function TagContainer({ tags, onRemove, isEdit }) {
  const { data: products, isLoading, error } = useSWR("/api/products");
  // const currentProduct = products.map((product) => product._id === tag);
  if (isLoading) return <p>is laoding...</p>;
  if (error) return <p>failed loading data</p>;
  return (
    <StyledTagContainer>
      {tags.map((tag) =>
        products.map(
          (product) =>
            product._id === tag && (
              <Tag key={tag}>
                {product.name}
                {isEdit ? (
                  <ButtonNoStyle onClick={() => onRemove(tag.id)}>
                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                  </ButtonNoStyle>
                ) : (
                  <></>
                )}
              </Tag>
            )
        )
      )}
    </StyledTagContainer>
  );
}
const StyledTagContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const percent = "360";

const Tag = styled.li`
  /* border: 1px solid var(--primary-color); */
  border: 1px solid transparent;
  background: conic-gradient(var(--primary-bg-color), var(--primary-bg-color))
      padding-box,
    conic-gradient(
        from 90deg,
        var(--primary-color) ${percent}deg,
        var(--secondary-color) ${percent}deg 360deg
      )
      border-box;
  border-radius: 0.9rem;
  padding: 0.3rem 0.5rem;
`;
