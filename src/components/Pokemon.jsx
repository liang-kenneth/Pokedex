import React from "react";
import { Card, CardContent, CardMedia, Typography, Link } from "@mui/material";
import generateKey from "../generateKey.js";

// Modal card details when user selects a specific Pokemon
const Pokemon = React.forwardRef((props, ref) => {
  const { name, id, species, height, weight, types } = props.pokemonData;
  const fullImageUrl = `https://unpkg.com/pokeapi-sprites@2.0.4/sprites/pokemon/other/dream-world/${id}.svg`;

  // ------------------------------------------------------------
  // A simple function to capitalize the first letter of the Pokemon name
  const toFirstCharUppercase = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1);
  // ------------------------------------------------------------

  return (
    <Card key={id} sx={{ maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h3">
          {`${id}. ${toFirstCharUppercase(name)}`}
        </Typography>
      </CardContent>
      <CardMedia
        className="cardMedia"
        image={fullImageUrl}
        style={{ width: "200px", height: "200px" }}
      />
      <CardContent>
        <Typography>
          Species: <Link href={species.url}>{species.name}</Link>
        </Typography>
        <Typography>Height: {height}</Typography>
        <Typography>Weight: {weight}</Typography>
        <Typography variant="h5">Types: </Typography>
        {types.map((typeInfo, index) => {
          return (
            <Typography key={generateKey(index)}>
              {typeInfo.type.name}
            </Typography>
          );
        })}
      </CardContent>
    </Card>
  );
});

export default Pokemon;
