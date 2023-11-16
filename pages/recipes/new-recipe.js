import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styled from "styled-components";
import { uid } from "uid";
import { TagContainer } from "@/components/TagContainer";
import { useRouter } from "next/router";
import { CircleLink } from "@/components/Link";

import { kebabCase } from "@/utils";
import { addRecipe } from "@/utils/addRecipe";

export default function NewRecipe() {
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

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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
    setNewSpices([...newSpices, { name: currentSpice }]);
    setCurrentSpice("");
  }

  function handleAddSauce() {
    if (!currentSauce) return null;
    setNewSauces([...newSauces, { name: currentSauce }]);
    setCurrentSauce("");
  }
  // function handleAddSpice() {
  //   if (!currentSpice) return null;
  //   setNewSpices([...newSpices, { id: uid(), name: currentSpice }]);
  //   setCurrentSpice("");
  // }

  // function handleAddSauce() {
  //   if (!currentSauce) return null;
  //   setNewSauces([...newSauces, { id: uid(), name: currentSauce }]);
  //   setCurrentSauce("");
  // }

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

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const formElements = event.target.elements;
    const recipeName = formElements.recipeNameInput.value;

    //fetch and generate image form openAi
    const response = await fetch(`/api/image/${kebabCase(recipeName)}`);
    let aiImage = "";
    if (response.ok) {
      try {
        const data = await response.json();
        aiImage = data.data[0].url;
        console.log(data);
      } catch (error) {
        console.error(
          "Response was ok, but failed to generate an image.",
          error
        );
      }
    } else {
      console.error("Failed to generate image. Use default image now");
      aiImage =
        "https://biancazapatka.com/wp-content/uploads/2023/02/chocolate-chip-cookies-720x1008.jpg";
    }

    const newRecipe = {
      name: recipeName,
      image: aiImage,
      portions: Number(formElements.portionsInput.value),
      isFavorite: false,
      onList: false,
      products: newIngredients.map((ingredient) => {
        return {
          amount: Number(ingredient.amount),
          product: {
            name: ingredient.name,
            unit: ingredient.unit,
          },
        };
      }),
      spices: newSpices,
      sauces: newSauces,
      preparation: formElements.preparationInput.value,
    };

    addRecipe(newRecipe);
    setIsLoading(false);
    router.push("/recipes");
  }

  return (
    <main>
      {isLoading ? (
        <h1>loading</h1>
      ) : (
        <>
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
              <label htmlFor="preparationInput">Preparation</label>
              <textarea
                id="preparationInput"
                name="preparationInput"
              ></textarea>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
          <TagContainer tags={newSpices} onRemove={handleRemoveSpice} isEdit />
          <TagContainer tags={newSauces} onRemove={handleRemoveSauce} isEdit />
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
          </CircleLink>{" "}
        </>
      )}
    </main>
  );
}

const StyledTableBody = styled.tbody`
  display: flex;
  flex-direction: column-reverse;
`;
