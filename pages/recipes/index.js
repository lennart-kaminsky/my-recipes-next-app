import { CircleLink, StyledLink } from "@/components/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import RecipeWrapper from "@/components/RecipeWrapper";

export default function RecipesOverview() {
  return (
    <main>
      <RecipeWrapper />
      <CircleLink $isAddRecipe href="/recipes/new-recipe">
        <FontAwesomeIcon icon={faPlus} />
      </CircleLink>
    </main>
  );
}
