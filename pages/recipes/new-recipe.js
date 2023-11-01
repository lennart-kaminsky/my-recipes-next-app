import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styled from "styled-components";
import { uid } from "uid";
import { TagContainer } from "@/components/TagContainer";
import { useRouter } from "next/router";
import { CircleLink } from "@/components/Link";

export default function NewRecipe({ recipes, handleAddRecipe }) {
  const [newIngredients, setNewIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState({
    amount: "",

    name: "",
    unit: "",
  });

  const [newSpices, setNewSpices] = useState([]);
  const [currentSpice, setCurrentSpice] = useState("");

  const [newSauces, setNewSauces] = useState([]);
  const [currentSauce, setCurrentSauce] = useState("");

  const router = useRouter();

  // function handleChangeIngredientAmount(event) {
  //   setCurrentIngredient({
  //     ...currentIngredient,
  //     amount: event.target.value,
  //   });
  // }

  function handleChangeIngredient(event, key) {
    setCurrentIngredient({
      ...currentIngredient,
      [key]: event.target.value,
    });
  }

  function handleChangeSpice(event) {
    setCurrentSpice(event.target.value);
  }

  function handleChangeSauce(event) {
    setCurrentSauce(event.target.value);
  }

  function handleAddIngredient() {
    if (!currentIngredient.name || !currentIngredient.amount) return null;
    setNewIngredients([...newIngredients, { id: uid(), ...currentIngredient }]);
    setCurrentIngredient({ amount: "", name: "", unit: "" });
    console.log(newIngredients);
  }

  function handleAddSpice() {
    if (!currentSpice) return null;
    setNewSpices([...newSpices, { id: uid(), name: currentSpice }]);
    setCurrentSpice("");
  }

  function handleAddSauce() {
    if (!currentSauce) return null;
    setNewSauces([...newSauces, { id: uid(), name: currentSauce }]);
    setCurrentSauce("");
  }

  function handleRemoveIngredient(id) {
    setNewIngredients(
      newIngredients.filter((ingredient) => ingredient.id !== id)
    );
  }

  function handleRemoveSpice(id) {
    setNewSpices(newSpices.filter((spice) => spice.id !== id));
  }

  function handleRemoveSauce(id) {
    setNewSauces(newSauces.filter((sauce) => sauce.id !== id));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formElements = event.target.elements;
    const recipeName = formElements.recipeNameInput.value;
    const newRecipe = {
      id: uid(),
      name: recipeName,
      slug: kebabCase(recipeName),
      image: {
        src: "/recources/images/default-recipe.jpeg",
      },
      portions: Number(formElements.portionsInput.value),
      ingredients: newIngredients.map((ingredient) => {
        return {
          amount: Number(ingredient.amount),
          ingredient: {
            id: ingredient.id,
            name: ingredient.name,
            unit: ingredient.unit,
          },
        };
      }),

      spices: newSpices,
      sauces: newSauces,
      preperation: formElements.preperationInput.value,
    };
    console.log("neues Rezept", newRecipe);
    console.log("neues Zutatetb", newIngredients);

    handleAddRecipe(newRecipe);

    router.push("/recipes");
  }
  function kebabCase(string) {
    return string
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .join("-")
      .toLowerCase();
  }

  return (
    <main>
      <h1>New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="recipeNameInput">Recipe name</label>
          <input
            id="recipeNameInput"
            name="recipeNameInput"
            type="text"
            required
          ></input>
          <label htmlFor="portionsInput">Portions</label>
          <input
            id="portionsInput"
            name="portionsInput"
            type="number"
            min="1"
            required
          ></input>
        </fieldset>
        <fieldset>
          <legend>Ingredients</legend>
          <label htmlFor="ingredientInput">Ingredient</label>
          <input
            id="ingredientInput"
            name="ingredientInput"
            type="text"
            min="1"
            value={currentIngredient.name}
            onChange={(event) => handleChangeIngredient(event, "name")}
          ></input>
          <label htmlFor="amountInput">Amount</label>
          <input
            id="amountInput"
            name="amountInput"
            type="number"
            step="0.5"
            min="0"
            value={currentIngredient.amount}
            onChange={(event) => handleChangeIngredient(event, "amount")}
          ></input>
          <label htmlFor="unitInput">Unit</label>
          <input
            id="unitInput"
            name="unitInput"
            type="text"
            min="1"
            value={currentIngredient.unit}
            onChange={(event) => handleChangeIngredient(event, "unit")}
          ></input>
          <button type="button" onClick={() => handleAddIngredient()}>
            Add
          </button>
        </fieldset>
        <fieldset>
          <label htmlFor="spicesInput">Spices</label>
          <input
            id="spicesInput"
            name="spicesInput"
            type="text"
            value={currentSpice}
            onChange={(event) => handleChangeSpice(event)}
          ></input>
          <button type="button" onClick={() => handleAddSpice()}>
            Add
          </button>
        </fieldset>
        <fieldset>
          <label htmlFor="saucesInput">Sauces</label>
          <input
            id="saucesInput"
            name="saucesInput"
            type="text"
            value={currentSauce}
            onChange={(event) => handleChangeSauce(event)}
          ></input>
          <button type="button" onClick={() => handleAddSauce()}>
            Add
          </button>
        </fieldset>
        <fieldset>
          <label htmlFor="preperationInput">Preperation</label>
          <textarea id="preperationInput" name="preperationInput"></textarea>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
      <TagContainer tag={newSpices} />
      <TagContainer tag={newSauces} />
      <table>
        <StyledTableBody>
          {newIngredients.map((ingredient) => (
            <tr key={ingredient.id}>
              <td>{ingredient.name}</td>
              <td>{ingredient.amount + ingredient.unit}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(ingredient.id)}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              </td>
            </tr>
          ))}
        </StyledTableBody>
      </table>
      <CircleLink $isCancel href="/recipes" $secondaryColor>
        <FontAwesomeIcon icon={faTimes} />
      </CircleLink>
    </main>
  );
}

const StyledTableBody = styled.tbody`
  display: flex;
  flex-direction: column-reverse;
`;
