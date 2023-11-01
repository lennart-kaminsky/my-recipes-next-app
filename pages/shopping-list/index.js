export default function ShoppingList({ shoppingList }) {
  return (
    <ul>
      {shoppingList.map((item) => (
        <li key={item.ingredient.id}>{item.ingredient.name}</li>
      ))}
    </ul>
  );
}
