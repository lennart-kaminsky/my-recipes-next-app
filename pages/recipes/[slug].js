import { recipes } from "@/lib/data";
import { useRouter } from "next/router";
import Image from "next/image";
import { ChangeButton } from "@/components/Button";
import styled from "styled-components";
import { useState } from "react";
import { CircleLink } from "@/components/Link";

export default function RecipeDetails() {
  const [display, setDisplay] = useState(true);

  const router = useRouter();
  const { slug } = router.query;

  const recipe = recipes.find((recipe) => recipe.slug === slug);
  console.log(recipe);
  console.log(recipe.ingredients[0].ingredient.name);
  console.log("HALLO:", typeof recipe.ingredients[0].amount);
  const [portions, setPortions] = useState(recipe.portions);

  function handleChangeDisplay() {
    console.log("TEST");
    setDisplay(!display);
  }

  function handleDecrementPortion() {
    setPortions(portions - 1);
    console.log("ASDADSADS:", typeof recipe.portions, recipe.portions);
  }
  function handleIncrementPortion() {
    setPortions(portions + 1);
  }

  return (
    <>
      <main>
        <h1>{recipe.name}</h1>
        <Image
          src={recipe.image.src}
          alt={recipe.name}
          width={400}
          height={400}
        ></Image>
        <ChangeButton display={display} onChangeDisplay={handleChangeDisplay}>
          Ingredients
        </ChangeButton>
        <ChangeButton display={!display} onChangeDisplay={handleChangeDisplay}>
          Preperation
        </ChangeButton>
        {display ? (
          <>
            <div>
              <button
                type="button"
                onClick={handleDecrementPortion}
                disabled={portions <= 1}
              >
                -
              </button>
              <span>{portions} portions</span>
              <button type="button" onClick={handleIncrementPortion}>
                +
              </button>
            </div>
            <table>
              {recipe.ingredients.map((item) => (
                <tr key={item.id}>
                  <td>{item.ingredient.name}</td>
                  <td>
                    {(portions * item.amount) / recipe.portions +
                      item.ingredient.unit}
                  </td>
                </tr>
              ))}
            </table>
          </>
        ) : (
          <p>{recipe.preperation}</p>
        )}
        <CircleLink href="/recipes">x</CircleLink>
      </main>
    </>
  );
}
