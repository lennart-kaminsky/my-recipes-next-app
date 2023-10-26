import { recipes } from "@/lib/data";
import { useRouter } from "next/router";
import Image from "next/image";

export default function RecipeDetails() {
  const router = useRouter();
  const { slug } = router.query;

  const recipe = recipes.find((recipe) => recipe.slug === slug);
  console.log(recipe);
  console.log(recipe.ingredients[0].ingredient.name);
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
        <h2>Ingredients</h2>
        <p>Portions: {recipe.portions}</p>
        <table>
          {recipe.ingredients.map((item) => (
            <tr key={item.id}>
              <td>{item.ingredient.name}</td>
              <td>{item.amount + item.ingredient.unit}</td>
            </tr>
          ))}
        </table>
      </main>
    </>
  );
}
