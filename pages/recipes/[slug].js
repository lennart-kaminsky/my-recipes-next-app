import { useRouter } from "next/router";
import Image from "next/image";
import { TagContainer } from "@/components/TagContainer";
import { ChangeButton } from "@/components/Button";

import { useState } from "react";
import { CircleLink } from "@/components/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCartShopping,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

export default function RecipeDetails({ recipes }) {
  const [display, setDisplay] = useState(true);

  const router = useRouter();
  const { slug } = router.query;

  const recipe = recipes.find((recipe) => recipe.slug === slug);

  const [portions, setPortions] = useState(recipe.portions);

  function handleChangeDisplay() {
    setDisplay(!display);
  }

  function handleDecrementPortion() {
    setPortions(portions - 1);
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
          priority={true}
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
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span>{portions} portions</span>
              <button type="button" onClick={handleIncrementPortion}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button type="button">
                <FontAwesomeIcon icon={faCartShopping} />
              </button>
            </div>
            <h2>Groceries</h2>
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
            {recipe.spices.length > 0 && (
              <>
                <h2>Spices</h2>
                <TagContainer tag={recipe.spices} />
              </>
            )}
            {recipe.sauces.length > 0 && (
              <>
                <h2>Sauces</h2>
                <TagContainer tag={recipe.sauces} />
              </>
            )}
          </>
        ) : (
          <p>{recipe.preperation}</p>
        )}
        <CircleLink $isCancel href="/recipes">
          <FontAwesomeIcon icon={faTimes} />
        </CircleLink>
      </main>
    </>
  );
}
