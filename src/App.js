import "./App.css";
import { useState } from "react";
import Navigation from "./components/Navigation/Navigation.js";
import Logo from "./components/Logo/Logo.js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js";
import Rank from "./components/Rank/Rank.js";
import ParticlesBg from "particles-bg";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js";
import Signin from "./components/Signin/Signin.js";
import Register from "./components/Register/Register.js";
import env from "react-dotenv";

// Your PAT (Personal Access Token) can be found in the Account's Security section
// const PAT = env.VITE_PAT;
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = "clarifai";
const APP_ID = "main";
// Change these to whatever model and image URL you want to use
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

function App() {
  const [input, setInput] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [boxCoordinates, setBoxCoordinates] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const initialUser = {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  };

  const [user, setUser] = useState(initialUser);

  const loadUser = (userData) => {
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      entries: userData.entries,
      joined: userData.joined,
    });
  };

  const handleRouteChange = (newRoute) => {
    if (newRoute === "signout") {
      setInput();
      setImageUrl("");
      setBoxCoordinates({});
      setRoute("signin");
      setIsSignedIn(false);
      setUser(initialUser);
    } else if (newRoute === "home") {
      setIsSignedIn(true);
    }
    setRoute(newRoute);
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("input-image");
    const width = Number(image.width);
    const height = Number(image.height);

    const box = {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };

    return box;
  };

  const displayFaceBox = (box) => {
    setBoxCoordinates(box);
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onImageSubmit = () => {
    if (input) {
      setImageUrl(input);
    } else {
      alert("Enter a url");
      return;
    }
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: input,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + env.PAT,
      },
      body: raw,
    };

    fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://frbserver.tushardevelops.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((res) => res.json())
            .then((count) => {
              setUser({
                ...user,
                entries: count,
              });
            });
        }

        const box = calculateFaceLocation(response);
        displayFaceBox(box);
      })
      .catch((error) => console.log("error", error));
  };

  const getScreen = (route) => {
    switch (route) {
      case "home":
        return (
          <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm
              onInputChange={onInputChange}
              onImageSubmit={onImageSubmit}
            />
            <FaceRecognition box={boxCoordinates} imageUrl={imageUrl} />
          </div>
        );

      case "signin":
        return (
          <Signin handleRouteChange={handleRouteChange} loadUser={loadUser} />
        );

      case "register":
        return (
          <Register handleRouteChange={handleRouteChange} loadUser={loadUser} />
        );

      default:
        return (
          <Signin handleRouteChange={handleRouteChange} loadUser={loadUser} />
        );
    }
  };

  return (
    <div className="App" style={{ paddingBottom: "100px" }}>
      <ParticlesBg
        color="#ffffff"
        type="cobweb"
        bg={true}
        className="particles-bg"
      />
      <Navigation
        handleRouteChange={handleRouteChange}
        isSignedIn={isSignedIn}
      />
      {getScreen(route)}
    </div>
  );
}

export default App;
