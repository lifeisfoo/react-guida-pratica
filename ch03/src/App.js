function AppTitle() {
  return <h1>Todo app</h1>;
}

const defaultImage = "https://via.placeholder.com/32x32.png";

function getImageOrDefaultURL(imageUrl) {
  try {
    new URL(imageUrl);
    return imageUrl;
  } catch {
    return defaultImage;
  }
}

function AppMessage({ user: { id, name, image } }) {
  return (
    <p>
      Benvenuto {name} ({id})!
      <img src={getImageOrDefaultURL(image)} width="32" height="32" />
    </p>
  );
}

const user = {
  id: 1,
  name: "Alessandro",
  image: "https://github.com/lifeisfoo.png",
};

export default function App() {
  return (
    <div>
      <AppTitle />
      <AppMessage user={user} />
    </div>
  );
}
